import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import type * as OpenApiPlugin from 'docusaurus-plugin-openapi-docs';

const config: Config = {
  title: 'PostPin Docs',
  tagline: 'Media review for post-production teams',
  favicon: 'img/favicon.svg',

  future: {
    v4: true,
  },

  url: 'https://docs.postpin.io',
  baseUrl: '/',

  organizationName: 'PostPin-io',
  projectName: 'docs',
  trailingSlash: false,

  onBrokenLinks: 'throw',
  markdown: {
    hooks: {onBrokenMarkdownLinks: 'throw'},
  },

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          routeBasePath: '/',
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/PostPin-io/docs/edit/main/',
          docItemComponent: '@theme/ApiItem',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    [
      'docusaurus-plugin-openapi-docs',
      {
        id: 'api',
        docsPluginId: 'classic',
        config: {
          postpin: {
            specPath: 'openapi/swagger.json',
            outputDir: 'docs/api/reference',
            sidebarOptions: {
              groupPathsBy: 'tag',
              categoryLinkSource: 'tag',
            },
          } satisfies OpenApiPlugin.Options,
        },
      },
    ],
  ],

  themes: [
    'docusaurus-theme-openapi-docs',
    [
      '@easyops-cn/docusaurus-search-local',
      {
        hashed: true,
        docsRouteBasePath: '/',
        indexBlog: false,
        highlightSearchTermsOnTargetPage: true,
      },
    ],
  ],

  themeConfig: {
    image: 'img/social.png',
    languageTabs: [
      {highlight: 'bash', language: 'curl', logoClass: 'curl'},
      {highlight: 'python', language: 'python', logoClass: 'python'},
      {highlight: 'javascript', language: 'nodejs', logoClass: 'nodejs'},
      {highlight: 'go', language: 'go', logoClass: 'go'},
    ],
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'PostPin',
      logo: {
        alt: 'PostPin',
        src: 'img/logo.svg',
        srcDark: 'img/logo-dark.svg',
      },
      items: [
        {type: 'docSidebar', sidebarId: 'guide', position: 'left', label: 'Guide'},
        {type: 'docSidebar', sidebarId: 'plugins', position: 'left', label: 'Plugins'},
        {type: 'docSidebar', sidebarId: 'selfHosting', position: 'left', label: 'Self-Hosting'},
        {type: 'docSidebar', sidebarId: 'api', position: 'left', label: 'API'},
        {to: '/downloads', label: 'Downloads', position: 'right'},
        {
          href: 'https://github.com/PostPin-io/postpin',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {label: 'Guide', to: '/'},
            {label: 'Plugins', to: '/plugins'},
            {label: 'Self-Hosting', to: '/self-hosting'},
            {label: 'API', to: '/api'},
          ],
        },
        {
          title: 'Project',
          items: [
            {label: 'GitHub', href: 'https://github.com/PostPin-io/postpin'},
            {label: 'Releases', href: 'https://github.com/PostPin-io/postpin/releases'},
            {label: 'Issues', href: 'https://github.com/PostPin-io/postpin/issues'},
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} PostPin`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['bash', 'json', 'yaml', 'nginx', 'ini'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
