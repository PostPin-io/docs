import type {ReactNode} from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import ThemedImage from '@theme/ThemedImage';
import manifest from '@site/static/img/screenshots/web/manifest.json';
import styles from './styles.module.css';

// Host shown in the browser frame; the path comes from the screenshot run
const HOST = 'postpin.example.com';

type Info = {url: string; page: boolean};

/**
 * A web app screenshot from static/img/screenshots/web, in the variant matching the docs'
 * light/dark theme. Whole pages get a browser window frame with the page's URL; cutouts
 * like dialogs are shown as they are.
 *
 *   <Screenshot name="review" alt="The review screen" />
 */
export default function Screenshot({name, alt}: {name: string; alt: string}): ReactNode {
  const info = (manifest as Record<string, Info>)[name];
  if (!info) throw new Error(`Screenshot "${name}" is not in static/img/screenshots/web/manifest.json`);
  const light = useBaseUrl(`/img/screenshots/web/${name}.png`);
  const dark = useBaseUrl(`/img/screenshots/web/${name}-dark.png`);
  const image = <ThemedImage alt={alt} sources={{light, dark}} className={styles.image} />;

  if (!info.page) return <figure className={styles.cutout}>{image}</figure>;
  return (
    <figure className={styles.window}>
      <div className={styles.toolbar} aria-hidden="true">
        <span className={styles.dots}>
          <i />
          <i />
          <i />
        </span>
        <span className={styles.address}>
          <span className={styles.host}>{HOST}</span>
          {info.url}
        </span>
      </div>
      {image}
    </figure>
  );
}
