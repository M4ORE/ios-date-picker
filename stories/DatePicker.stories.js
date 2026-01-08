/**
 * iOS Date Picker Stories
 * 使用 Template 模式與 Controls 動態調整
 */
import { createDatePicker, IOSDatePicker } from '../src/index.js';

// 取得今日日期字串
const getTodayString = () => {
  const today = new Date();
  return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
};

/**
 * Template 工廠函式（參考文件 4.4）
 * 封裝 DOM 建立邏輯，避免重複程式碼
 */
const Template = (args) => {
  const wrapper = document.createElement('div');
  const uniqueId = `picker-${Math.random().toString(36).slice(2, 9)}`;

  // 即時顯示面板
  const display = document.createElement('div');
  display.style.cssText = 'margin-bottom: 16px; padding: 16px; background: #E3F2FD; border-radius: 8px; font-family: -apple-system, sans-serif; text-align: center;';
  display.innerHTML = `
    <div style="font-size: 12px; color: #666; margin-bottom: 4px;">目前選擇的日期</div>
    <div id="${uniqueId}-display" style="font-size: 24px; font-weight: 600; color: #1976D2;">尚未選擇</div>
  `;
  wrapper.appendChild(display);

  // 建立容器
  const container = document.createElement('div');
  container.id = uniqueId;
  container.style.width = args.width || '375px';
  container.style.background = '#fff';
  container.style.borderRadius = '12px';
  container.style.overflow = 'hidden';
  container.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)';

  // 注入自訂樣式（參考文件 4.5）
  if (args.confirmAndSelectedColor || args.navigationColor || args.pickerBackground) {
    const styleTag = document.createElement('style');
    styleTag.textContent = `
      #${uniqueId} .ios-date-picker {
        ${args.confirmAndSelectedColor ? `--picker-selected: ${args.confirmAndSelectedColor};` : ''}
        ${args.navigationColor ? `--picker-primary: ${args.navigationColor};` : ''}
        ${args.pickerBackground ? `--picker-bg: ${args.pickerBackground};` : ''}
      }
    `;
    wrapper.appendChild(styleTag);
  }

  wrapper.appendChild(container);

  // 使用 requestAnimationFrame 確保 DOM 已掛載
  requestAnimationFrame(() => {
    // 共用選項
    const commonOptions = {
      imgPath: '',
      title: args.title,
      defaultDate: args.defaultDate,
      currentValue: args.currentValue,
      minDate: args.minDate,
      maxDate: args.maxDate,
      onConfirm: (date) => {
        console.log('選擇的日期:', date);
        alert(`確認選擇: ${date}`);
      },
      onDateChange: (date) => {
        // 即時更新顯示面板
        const displayEl = document.getElementById(`${uniqueId}-display`);
        if (displayEl) {
          displayEl.textContent = date;
        }
        console.log('日期變更:', date);
      },
    };

    if (args.preset) {
      // 使用預設模式（傳入自訂選項覆蓋預設值）
      createDatePicker(uniqueId, args.preset, commonOptions);
    } else {
      // 使用自訂選項
      new IOSDatePicker(uniqueId, {
        ...commonOptions,
        title: args.title || '選擇日期',
        defaultDate: args.defaultDate || getTodayString(),
      });
    }
  });

  return wrapper;
};

// Story 設定（參考文件 4.6）
export default {
  title: 'Components/DatePicker',
  parameters: {
    layout: 'centered',
  },
  // 定義 Controls 介面
  argTypes: {
    preset: {
      control: 'select',
      options: [null, 'birthday', 'memberCreated', 'accounting', 'orderManagement'],
      description: '預設模式（選擇空值可使用完全自訂模式）',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'birthday' },
      },
    },
    title: {
      control: 'text',
      description: '標題文字',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '選擇日期' },
      },
    },
    width: {
      control: 'text',
      description: '容器寬度',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '375px' },
      },
    },
    confirmAndSelectedColor: {
      control: 'color',
      description: '「確認」按鈕文字、選中日期圓圈背景',
      table: {
        category: 'Theme',
        type: { summary: '--picker-selected' },
        defaultValue: { summary: '#FF812A' },
      },
    },
    navigationColor: {
      control: 'color',
      description: '月份切換箭頭 < >、年月下拉、今日文字',
      table: {
        category: 'Theme',
        type: { summary: '--picker-primary' },
        defaultValue: { summary: '#007AFF' },
      },
    },
    pickerBackground: {
      control: 'color',
      description: '選擇器整體背景',
      table: {
        category: 'Theme',
        type: { summary: '--picker-bg' },
        defaultValue: { summary: '#F2F2F7' },
      },
    },
    defaultDate: {
      control: 'text',
      description: '預設選中日期（初始化時使用）',
      table: {
        category: 'Date',
        type: { summary: 'YYYY-MM-DD' },
      },
    },
    currentValue: {
      control: 'text',
      description: '帶入現有值（編輯模式，優先於 defaultDate）',
      table: {
        category: 'Date',
        type: { summary: 'YYYY-MM-DD' },
      },
    },
    minDate: {
      control: 'text',
      description: '最小可選日期',
      table: {
        category: 'Date',
        type: { summary: 'YYYY-MM-DD' },
      },
    },
    maxDate: {
      control: 'text',
      description: '最大可選日期',
      table: {
        category: 'Date',
        type: { summary: 'YYYY-MM-DD' },
      },
    },
  },
};

/**
 * 日期選擇器完整展示
 * 透過右側 Controls 面板動態調整所有參數
 */
export const Playground = {
  args: {
    preset: 'birthday',
    title: '選擇日期',
    width: '375px',
    defaultDate: '2000-06-15',
    minDate: '1900-01-01',
    maxDate: getTodayString(),
  },
  render: (args) => Template(args),
  parameters: {
    docs: {
      description: {
        story: `完整的日期選擇器展示，使用右側 Controls 面板動態調整：

### 基本設定
- **preset**: 切換預設模式（birthday、memberCreated、accounting、orderManagement），選擇空值可完全自訂
- **title**: 自訂標題文字
- **width**: 調整容器寬度

### 日期設定（格式：YYYY-MM-DD）
- **defaultDate**: 預設選中日期
- **currentValue**: 帶入現有值（編輯情境）
- **minDate / maxDate**: 限制可選範圍

### 主題色彩
- **confirmAndSelectedColor**: 「確認」按鈕、選中日期圓圈
- **navigationColor**: 導航箭頭、今日文字
- **pickerBackground**: 整體背景

---
上方藍色面板會即時顯示 \`onDateChange\` 回調的日期變更。`,
      },
    },
  },
};
