import type {ReactNode} from 'react';
import useIsBrowser from '@docusaurus/useIsBrowser';

// The full address never appears in the built HTML, only after hydration
const USER = 'kontakt';
const DOMAIN = 'rueger.events';

/**
 * The contact address. The static HTML shows "kontakt(ät)rueger.events" as plain text, so
 * scrapers that don't run JavaScript find no address; in the browser it becomes a mailto link.
 *
 *   <Email />
 */
export default function Email(): ReactNode {
  const isBrowser = useIsBrowser();
  if (!isBrowser) return <span>{`${USER}(ät)${DOMAIN}`}</span>;
  const address = [USER, DOMAIN].join('@');
  return <a href={`mailto:${address}`}>{address}</a>;
}
