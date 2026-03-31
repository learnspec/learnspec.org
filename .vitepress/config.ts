import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'LearnSpec',
  description: 'Open standards for structured learning content in the AI era',

  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }],
  ],

  themeConfig: {
    logo: '/logo.svg',

    nav: [
      { text: 'Home', link: '/' },
      { text: 'LearnMD', link: '/learnmd/' },
      { text: 'QuizMD', link: '/quizmd/' },
      { text: 'GitHub', link: 'https://github.com/learnspec' },
    ],

    sidebar: {
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
