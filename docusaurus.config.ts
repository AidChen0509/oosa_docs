import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import path from 'path';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'OOSA',
  tagline: 'OOSA Documentation',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://your-docusaurus-site.example.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'AidChen0509', // Usually your GitHub org/user name.
  projectName: 'oosa_docs', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    // 內部發布說明插件
    [
      require.resolve('./src/plugins/changelog/index.ts'),
      {
        id: 'internal_changelog',
        blogTitle: '內部發布說明',
        blogDescription: '了解我們OOSA-APP的最新更新和改進 (內部版本)',
        blogSidebarCount: 'ALL',
        blogSidebarTitle: '所有版本',
        routeBasePath: '/internal-release-notes',
        archiveBasePath: null,
        authorsMapPath: 'authors.json',
        path: path.resolve(__dirname, './internal_changelog'),
        showReadingTime: false,
        postsPerPage: 20,
        feedOptions: {
          type: 'all',
          title: '內部發布說明',
          description: '了解我們OOSA-APP的內部版本更新和改進',
          copyright: `Copyright © ${new Date().getFullYear()} Arwork`,
          language: 'zh-Hant',
        },
        onInlineAuthors: 'warn',
      },
    ],
    
    // 公開發布說明插件
    [
      require.resolve('./src/plugins/changelog/index.ts'),
      {
        id: 'public_changelog',
        blogTitle: '產品更新記錄',
        blogDescription: '了解我們OOSA-APP的更新和改進',
        blogSidebarCount: 'ALL',
        blogSidebarTitle: '所有版本',
        routeBasePath: '/release-notes',
        archiveBasePath: null,
        authorsMapPath: 'authors.json',
        path: path.resolve(__dirname, './public_changelog'),
        showReadingTime: false,
        postsPerPage: 20,
        feedOptions: {
          type: 'all',
          title: '產品更新記錄',
          description: '了解我們產品的公開版本更新和改進',
          copyright: `Copyright © ${new Date().getFullYear()} Arwork`,
          language: 'zh-Hant',
        },
        onInlineAuthors: 'warn',
      },
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: 'OOSA',
      logo: {
        alt: 'OOSA Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Tutorial',
        },
        {to: '/blog', label: 'Blog', position: 'left'},
        {
          href: 'https://github.com/arwoosa',
          label: 'GitHub',
          position: 'right',
        },
        {
          to: '/internal-release-notes',
          label: '內部發布說明',
          position: 'left'
        },
        {
          to: '/release-notes',
          label: '產品更新記錄',
          position: 'left'
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Tutorial',
              to: '/docs/intro',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Stack Overflow',
              href: 'https://stackoverflow.com/questions/tagged/docusaurus',
            },
            {
              label: 'Discord',
              href: 'https://discordapp.com/invite/docusaurus',
            },
            {
              label: 'X',
              href: 'https://x.com/docusaurus',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              to: '/blog',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/arwoosa',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
