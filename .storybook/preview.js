// 載入樣式
import 'vanilla-calendar-pro/build/vanilla-calendar.min.css';
import '../src/ios-date-picker.css';
import '../src/bottom-sheet.css';

// 載入 VanillaCalendar 到全域
import VanillaCalendar from 'vanilla-calendar-pro';
window.VanillaCalendar = VanillaCalendar;

/** @type { import('@storybook/html-vite').Preview } */
const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: 'centered',
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#F2F2F7' },
        { name: 'white', value: '#FFFFFF' },
      ],
    },
  },
};

export default preview;