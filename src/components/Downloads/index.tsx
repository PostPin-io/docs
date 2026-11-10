import {useEffect, useState, type ReactNode} from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

const REPO = 'PostPin-io/postpin';
const RELEASES = `https://github.com/${REPO}/releases`;

// Asset names contain the version (see the main repo's release workflow and
// packages/desktop/electron-builder.yml), so they're matched by pattern instead of linked via
// releases/latest/download/<name>.
const PRODUCTS = [
  {
    id: 'desktop-mac',
    title: 'PostPin Desktop for macOS',
    detail: 'For Pro Tools · Apple silicon and Intel',
    pattern: /^PostPin-Desktop-.+-universal\.dmg$/,
    guide: '/plugins/desktop',
  },
  {
    id: 'desktop-win',
    title: 'PostPin Desktop for Windows',
    detail: 'For Pro Tools · x64',
    pattern: /^PostPin-Desktop-.+-x64\.exe$/,
    guide: '/plugins/desktop',
  },
  {
    id: 'resolve',
    title: 'PostPin for DaVinci Resolve',
    detail: 'Installer for macOS',
    pattern: /^PostPin-Resolve-.+\.pkg$/,
    guide: '/plugins/resolve',
  },
];

type Asset = {name: string; size: number; browser_download_url: string};
type Release = {tag_name: string; prerelease: boolean; draft: boolean; html_url: string; published_at: string; assets: Asset[]};
type Found = {release: Release; asset: Asset};

/** The newest stable release with a matching asset, or the newest pre-release if no stable one has it. */
function pick(releases: Release[], pattern: RegExp): Found | null {
  const withAsset = releases
    .filter((r) => !r.draft)
    .map((release) => ({release, asset: release.assets.find((a) => pattern.test(a.name))}))
    .filter((f): f is Found => !!f.asset);
  return withAsset.find((f) => !f.release.prerelease) ?? withAsset[0] ?? null;
}

const megabytes = (bytes: number) => `${Math.round(bytes / 1e6)} MB`;

export default function Downloads(): ReactNode {
  const [releases, setReleases] = useState<Release[] | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    fetch(`https://api.github.com/repos/${REPO}/releases?per_page=30`, {
      headers: {Accept: 'application/vnd.github+json'},
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error(String(res.status)))))
      .then(setReleases)
      .catch(() => setFailed(true));
  }, []);

  return (
    <div className={styles.grid}>
      {PRODUCTS.map((product) => {
        const found = releases ? pick(releases, product.pattern) : null;
        return (
          <div key={product.id} className={styles.card}>
            <div className={styles.title}>{product.title}</div>
            <div className={styles.detail}>{product.detail}</div>
            {found ? (
              <>
                <a className="button button--primary" href={found.asset.browser_download_url}>
                  Download {found.release.tag_name}
                </a>
                <div className={styles.meta}>
                  {megabytes(found.asset.size)}
                  {found.release.prerelease && (
                    <>
                      {' · '}
                      <a href={found.release.html_url} className={styles.pre}>
                        pre-release
                      </a>
                    </>
                  )}
                </div>
              </>
            ) : (
              <>
                <a className="button button--secondary" href={RELEASES}>
                  {releases || failed ? 'See all releases' : 'Loading…'}
                </a>
                <div className={styles.meta}>
                  {releases ? 'Not in a release yet' : failed ? 'Couldn’t reach GitHub' : ' '}
                </div>
              </>
            )}
            <Link to={product.guide} className={styles.guide}>
              Install guide
            </Link>
          </div>
        );
      })}
    </div>
  );
}
