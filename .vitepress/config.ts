import { defineConfig } from 'vitepress'

const formatSidebar = (label: string, slug: string) => [
  {
    text: label,
    items: [
      { text: 'Overview', link: `/${slug}/` },
      { text: 'Specification', link: `/${slug}/spec` },
    ],
  },
]

export default defineConfig({
  title: 'LearnSpec',
  description: 'Open standards for structured learning content in the AI era',

  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }],
    ['link', { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    ['link', { rel: 'apple-touch-icon', href: '/logo-192.png' }],
  ],

  themeConfig: {
    logo: '/logo.svg',

    nav: [
      { text: 'Home', link: '/' },
      { text: 'Suite', link: '/suite/' },
      { text: 'Charter', link: '/charter/' },
      {
        text: 'Formats',
        items: [
          { text: 'LearnMD — instruction', link: '/learnmd/' },
          { text: 'QuizMD — assessment', link: '/quizmd/' },
          { text: 'TrackMD — learning paths', link: '/trackmd/' },
          { text: 'FlashMD — flashcards', link: '/flashmd/' },
          { text: 'DiagramMD — diagrams', link: '/diagrammd/' },
          { text: 'MediaMD — media catalogue', link: '/mediamd/' },
          { text: 'GlossaryMD — glossary', link: '/glossarymd/' },
          { text: 'BadgeMD — micro-credentials', link: '/badgemd/' },
          { text: 'CertMD — macro-credentials', link: '/certmd/' },
        ],
      },
      { text: 'GitHub', link: 'https://github.com/learnspec' },
    ],

    sidebar: {
      '/suite/': [
        {
          text: 'Suite',
          items: [
            { text: 'Overview', link: '/suite/' },
          ],
        },
        {
          text: 'Stable formats',
          items: [
            { text: 'LearnMD', link: '/learnmd/' },
            { text: 'QuizMD', link: '/quizmd/' },
          ],
        },
        {
          text: 'Upcoming formats',
          items: [
            { text: 'TrackMD', link: '/trackmd/' },
            { text: 'FlashMD', link: '/flashmd/' },
            { text: 'DiagramMD', link: '/diagrammd/' },
            { text: 'MediaMD', link: '/mediamd/' },
            { text: 'GlossaryMD', link: '/glossarymd/' },
            { text: 'BadgeMD', link: '/badgemd/' },
            { text: 'CertMD', link: '/certmd/' },
          ],
        },
      ],
      '/charter/': [
        {
          text: 'Architecture Charter',
          items: [
            { text: 'Overview', link: '/charter/#overview' },
            { text: 'Suite formats', link: '/charter/#suite-formats' },
            { text: 'Founding principles', link: '/charter/#founding-principles' },
            { text: 'Level system', link: '/charter/#level-system' },
            { text: 'Universal frontmatter', link: '/charter/#universal-frontmatter' },
            { text: 'Cross-format directives', link: '/charter/#cross-format-directives' },
            { text: 'Interoperability matrix', link: '/charter/#interoperability-matrix' },
            { text: 'Validation', link: '/charter/#validation' },
            { text: 'Versioning', link: '/charter/#versioning' },
            { text: 'AI-nativeness', link: '/charter/#ai-nativeness' },
          ],
        },
      ],
      '/learnmd/': [
        {
          text: 'LearnMD',
          items: [
            { text: 'Overview', link: '/learnmd/' },
            { text: 'Specification', link: '/learnmd/spec' },
            { text: 'Getting Started', link: '/learnmd/getting-started' },
            { text: 'Examples', link: '/learnmd/examples' },
          ],
        },
      ],
      '/quizmd/': [
        {
          text: 'QuizMD',
          items: [
            { text: 'Overview', link: '/quizmd/' },
            { text: 'Specification', link: '/quizmd/spec' },
            { text: 'Getting Started', link: '/quizmd/getting-started' },
            { text: 'Examples', link: '/quizmd/examples' },
          ],
        },
      ],
      '/trackmd/': formatSidebar('TrackMD', 'trackmd'),
      '/flashmd/': formatSidebar('FlashMD', 'flashmd'),
      '/diagrammd/': formatSidebar('DiagramMD', 'diagrammd'),
      '/mediamd/': formatSidebar('MediaMD', 'mediamd'),
      '/glossarymd/': formatSidebar('GlossaryMD', 'glossarymd'),
      '/badgemd/': formatSidebar('BadgeMD', 'badgemd'),
      '/certmd/': formatSidebar('CertMD', 'certmd'),
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/learnspec' },
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2024-present LearnSpec Contributors',
    },

    search: {
      provider: 'local',
    },
  },
})
