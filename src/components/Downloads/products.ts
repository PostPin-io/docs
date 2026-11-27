import type {IconName} from './icons';

// Everything the download page offers. Asset names contain the version (see the main repo's
// release workflow and packages/desktop/electron-builder.yml), so each download is matched by a
// pattern against the assets of the releases. A download that no release has yet stays hidden, so
// platforms can be listed here before they ship.
//
// To add a plugin, add a product with its host's app icon (128×128 PNG in static/img/hosts/, the
// same files as packages/plugin-core/src/ui/logos/ in the main repo) and install guide.

export type Os = 'mac' | 'windows' | 'linux';

export interface Download {
  /** several for a file that works on all of them, e.g. Premiere's .ccx */
  os: Os | Os[];
  /** shown on the button, e.g. "Universal" or "x64"; empty for none */
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
  /** a monochrome icon in currentColor, or an image in static/ (host app icons) */
  icon: {name: IconName} | {src: string};
  /**
   * For an app that works with several hosts (PostPin Desktop): their app icons, one below the
   * other, instead of `icon`, and an install guide each instead of `guide`
   */
  hosts?: Host[];
  guide: string;
  downloads: Download[];
  /**
   * Instead of download buttons: one button to a docs page, for products that aren't installed
   * from a file, like the server. `release` finds the release whose version the row shows.
   */
  link?: {label: string; to: string; release: RegExp};
}

export interface Host {
  name: string;
  icon: string;
  guide: string;
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
        downloads: [
          {os: 'mac', arch: 'Universal', pattern: /^PostPin-Resolve-.+\.pkg$/},
          // one installer for both, it installs Resolve's native module for the machine's CPU
          {os: 'windows', arch: 'x64 & ARM64', pattern: /^PostPin-Resolve-.+\.exe$/},
        ],
      },
      {
        id: 'premiere',
        name: 'PostPin for Premiere Pro',
        description: 'Panel for Adobe Premiere Pro',
        icon: {src: '/img/hosts/premiere-pro.png'},
        guide: '/plugins/premiere',
        downloads: [
          // a UXP plugin: one .ccx for every platform Premiere runs on
          {os: ['mac', 'windows'], arch: '', pattern: /^PostPin-Premiere-.+\.ccx$/},
        ],
      },
      {
        id: 'desktop',
        name: 'PostPin Desktop',
        description: 'Standalone app for Avid Pro Tools, FilmCraft and REAPER',
        icon: {src: '/img/hosts/pro-tools.png'},
        guide: '/plugins/desktop',
        hosts: [
          {name: 'Pro Tools', icon: '/img/hosts/pro-tools.png', guide: '/plugins/desktop'},
          {name: 'FilmCraft', icon: '/img/hosts/filmcraft.png', guide: '/plugins/filmcraft'},
          {name: 'REAPER', icon: '/img/hosts/reaper.png', guide: '/plugins/reaper'},
        ],
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
        // the setup script downloads compose.yml and env.example itself
        downloads: [],
        link: {label: 'Installation guide', to: '/self-hosting/installation', release: /^compose\.yml$/},
      },
    ],
  },
];

export const OS_LABEL: Record<Os, string> = {mac: 'macOS', windows: 'Windows', linux: 'Docker'};
export const OS_ICON: Record<Os, IconName> = {mac: 'apple', windows: 'windows', linux: 'docker'};
