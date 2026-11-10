import type {IconName} from './icons';

// Everything the download page offers. Asset names contain the version (see the main repo's
// release workflow and packages/desktop/electron-builder.yml), so each download is matched by a
// pattern against the assets of the releases. A download that no release has yet stays hidden, so
// platforms can be listed here before they ship.
//
// To add a plugin (e.g. Premiere Pro), add a product with its host icon and install guide.

export type Os = 'mac' | 'windows' | 'linux';

export interface Download {
  os: Os;
  /** shown on the button, e.g. "Universal" or "x64" */
  arch: string;
  pattern: RegExp;
  /** replaces "<OS> · <arch>" on the button, e.g. for files that aren't platform specific */
  label?: string;
  /** CPU architecture for highlighting the visitor's platform, if the download is specific */
  cpu?: 'x64' | 'arm64';
}

export interface Product {
  id: string;
  name: string;
  /** what it's for, one line */
  description: string;
  /** a host icon in currentColor, or an image in static/ */
  icon: {name: IconName} | {src: string};
  guide: string;
  downloads: Download[];
}

export interface Group {
  title: string;
  products: Product[];
}

export const GROUPS: Group[] = [
  {
    title: 'Editor plugins',
    products: [
      {
        id: 'resolve',
        name: 'PostPin for DaVinci Resolve',
        description: 'Workflow integration plugin for DaVinci Resolve Studio',
        icon: {src: '/img/hosts/davinci-resolve.png'},
        guide: '/plugins/resolve',
        downloads: [{os: 'mac', arch: 'Universal', pattern: /^PostPin-Resolve-.+\.pkg$/}],
      },
      {
        id: 'desktop',
        name: 'PostPin Desktop',
        description: 'Standalone app for Avid Pro Tools',
        icon: {name: 'protools'},
        guide: '/plugins/desktop',
        downloads: [
          {os: 'mac', arch: 'Universal', pattern: /^PostPin-Desktop-.+-universal\.dmg$/},
          {os: 'windows', arch: 'x64', cpu: 'x64', pattern: /^PostPin-Desktop-.+-x64\.exe$/},
          {os: 'windows', arch: 'ARM64', cpu: 'arm64', pattern: /^PostPin-Desktop-.+-arm64\.exe$/},
        ],
      },
    ],
  },
  {
    title: 'Server',
    products: [
      {
        id: 'server',
        name: 'PostPin Server',
        description: 'Docker Compose setup for running PostPin yourself',
        icon: {name: 'docker'},
        guide: '/self-hosting/installation',
        downloads: [
          {os: 'linux', arch: '', label: 'compose.yml', pattern: /^compose\.yml$/},
          {os: 'linux', arch: '', label: 'env.example', pattern: /^env\.example$/},
        ],
      },
    ],
  },
];

export const OS_LABEL: Record<Os, string> = {mac: 'macOS', windows: 'Windows', linux: 'Docker'};
export const OS_ICON: Record<Os, IconName> = {mac: 'apple', windows: 'windows', linux: 'docker'};
