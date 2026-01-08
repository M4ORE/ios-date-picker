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
    // 元件在畫面上預設置中顯示
    layout: 'centered',

    // 自訂工具列中的背景顏色切換
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#F2F2F7' }, // iOS 淺色背景
        { name: 'white', value: '#FFFFFF' },
      ],
    },

    // Viewport 設定來模擬手機尺寸
  },
};

export default preview;