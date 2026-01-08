/** @type { import('@storybook/html-vite').StorybookConfig } */
const config = {
  stories: [
    '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)'
  ],
  addons: ["@storybook/addon-essentials", "@storybook/addon-a11y"],
  framework: {
    name: '@storybook/html-vite',
    options: {},
  },
  staticDirs: ['../img'],

  // GitHub Pages 部署設定
  viteFinal: async (config) => {
    // 生產環境設定 base path
    if (process.env.NODE_ENV === 'production') {
      config.base = '/ios-date-picker/';
    }
    return config;
  },
};
export default config;
