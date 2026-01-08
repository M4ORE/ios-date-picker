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
  staticDirs: ['../img']
};
export default config;
