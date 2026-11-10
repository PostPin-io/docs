import {useEffect, useState, type ReactNode} from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import clsx from 'clsx';
import {Icon} from './icons';
import {GROUPS, OS_ICON, OS_LABEL, type Download, type Os, type Product} from './products';
import styles from './styles.module.css';

const REPO = 'PostPin-io/postpin';
const RELEASES = `https://github.com/${REPO}/releases`;

type Asset = {name: string; size: number; browser_download_url: string};
type Release = {tag_name: string; prerelease: boolean; draft: boolean; html_url: string; assets: Asset[]};
type Found = {release: Release; asset: Asset};

/** The newest stable release with a matching asset, or the newest pre-release if no stable one has it. */
function find(releases: Release[], pattern: RegExp): Found | null {
  const withAsset = releases
    .filter((r) => !r.draft)
    .map((release) => ({release, asset: release.assets.find((a) => pattern.test(a.name))}))
    .filter((f): f is Found => !!f.asset);
  return withAsset.find((f) => !f.release.prerelease) ?? withAsset[0] ?? null;
}

// GitHub allows 60 unauthenticated API requests per hour and IP, which a team behind one office
// IP can use up. A short per-browser cache keeps reloads from counting.
const CACHE_KEY = 'postpin-docs-releases';
const CACHE_MS = 10 * 60 * 1000;

function readCache(): Release[] | null {
  try {
    const entry = JSON.parse(localStorage.getItem(CACHE_KEY) ?? 'null');
    return entry && Date.now() - entry.at < CACHE_MS ? entry.releases : null;
  } catch {
    return null;
  }
}

function writeCache(releases: Release[]) {
  try {
    // only the fields the page uses, the full response is a few hundred KB
    const slim = releases.map(({tag_name, prerelease, draft, html_url, assets}) => ({
      tag_name,
      prerelease,
      draft,
      html_url,
      assets: assets.map(({name, size, browser_download_url}) => ({name, size, browser_download_url})),
    }));
    localStorage.setItem(CACHE_KEY, JSON.stringify({at: Date.now(), releases: slim}));
  } catch {
    // storage full or blocked: just don't cache
  }
}

type Platform = {os: Os | null; cpu: 'x64' | 'arm64' | null};

/** Best guess of the visitor's OS and CPU, to highlight the matching download. */
function detectPlatform(): Platform {
  const nav = navigator as Navigator & {userAgentData?: {platform?: string}};
  // the first source that says anything; mixing them lets a stale one win
  const text = (nav.userAgentData?.platform || navigator.userAgent || navigator.platform).toLowerCase();
  const os: Os | null = /mac/.test(text) ? 'mac' : /win/.test(text) ? 'windows' : /linux/.test(text) ? 'linux' : null;
  const cpu = /arm|aarch64/.test(text) ? 'arm64' : os === 'windows' ? 'x64' : null;
  return {os, cpu};
}

const isMine = (d: Download, p: Platform) => !d.label && d.os === p.os && (!d.cpu || !p.cpu || d.cpu === p.cpu);
const megabytes = (bytes: number) => (bytes < 1e6 ? `${Math.max(1, Math.round(bytes / 1e3))} KB` : `${Math.round(bytes / 1e6)} MB`);

function ProductIcon({product}: {product: Product}) {
  const src = useBaseUrl('src' in product.icon ? product.icon.src : '/');
  if ('src' in product.icon) return <img src={src} alt="" className={styles.productIcon} />;
  return <Icon name={product.icon.name} className={clsx(styles.productIcon, styles.mono)} />;
}

function ProductRow({product, releases, platform}: {product: Product; releases: Release[] | null; platform: Platform}) {
  const downloads = product.downloads
    .map((d) => ({d, found: releases ? find(releases, d.pattern) : null}))
    // until the releases are loaded, show every platform so the layout doesn't jump much
    .filter(({found}) => !releases || found);
  // all downloads of a product normally come from the same release
  const release = downloads.find((x) => x.found)?.found?.release;

  return (
    <div className={styles.product}>
      <div className={styles.info}>
        <ProductIcon product={product} />
        <div>
          <div className={styles.name}>{product.name}</div>
          <div className={styles.description}>{product.description}</div>
          <div className={styles.version}>
            {release ? (
              <>
                <a href={release.html_url}>{release.tag_name}</a>
                {release.prerelease && <span className={styles.badge}>Pre-release</span>}
              </>
            ) : releases ? (
              'Not released yet'
            ) : (
              ' '
            )}
            {' · '}
            <Link to={product.guide}>Install guide</Link>
          </div>
        </div>
      </div>
      <div className={styles.buttons}>
        {downloads.map(({d, found}) => (
          <a
            key={d.pattern.source}
            href={found?.asset.browser_download_url ?? RELEASES}
            className={clsx(styles.button, isMine(d, platform) && styles.mine, !found && styles.loading)}>
            <Icon name={OS_ICON[d.os]} className={styles.osIcon} />
            <span className={styles.buttonText}>
              <span className={styles.buttonLabel}>{d.label ?? `${OS_LABEL[d.os]} · ${d.arch}`}</span>
              <span className={styles.buttonMeta}>{found ? megabytes(found.asset.size) : ' '}</span>
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}

export default function Downloads(): ReactNode {
  const [releases, setReleases] = useState<Release[] | null>(null);
  const [failed, setFailed] = useState(false);
  const [platform, setPlatform] = useState<Platform>({os: null, cpu: null});

  useEffect(() => {
    setPlatform(detectPlatform());
    const cached = readCache();
    if (cached) {
      setReleases(cached);
      return;
    }
    fetch(`https://api.github.com/repos/${REPO}/releases?per_page=30`, {
      headers: {Accept: 'application/vnd.github+json'},
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error(String(res.status)))))
      .then((data: Release[]) => {
        writeCache(data);
        setReleases(data);
      })
      .catch(() => setFailed(true));
  }, []);

  if (failed) {
    return (
      <p>
        The download list couldn't be loaded from GitHub. Get the files from the{' '}
        <a href={RELEASES}>GitHub Releases page</a>.
      </p>
    );
  }

  return (
    <div className={styles.downloads}>
      {GROUPS.map((group) => (
        <section key={group.title}>
          <h2 className={styles.groupTitle}>{group.title}</h2>
          <div className={styles.list}>
            {group.products.map((product) => (
              <ProductRow key={product.id} product={product} releases={releases} platform={platform} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
