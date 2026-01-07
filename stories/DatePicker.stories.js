/**
 * iOS Date Picker Stories
 */
import { createDatePicker, IOSDatePicker } from '../src/index.js';

export default {
  title: 'Components/DatePicker',
  parameters: {
    layout: 'centered',
  },
};

// 建立容器的輔助函式
const createContainer = (id = 'picker-container') => {
  const container = document.createElement('div');
  container.id = id;
  container.style.width = '375px';
  container.style.background = '#fff';
  container.style.borderRadius = '12px';
  container.style.overflow = 'hidden';
  container.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)';
  return container;
};

// 取得今日日期字串
const getTodayString = () => {
  const today = new Date();
  return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
};

// 取得未來日期
const getFutureDate = (days) => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
};

/**
 * 生日選擇器 - 最常見的使用情境
 */
export const Birthday = {
  render: () => {
    const container = createContainer('birthday-picker');

    setTimeout(() => {
      createDatePicker('birthday-picker', 'birthday', {
        imgPath: '',
        onConfirm: (date) => {
          console.log('選擇的生日:', date);
          alert(`選擇的生日: ${date}`);
        },
        onBack: () => {
          console.log('返回');
        },
      });
    }, 0);

    return container;
  },
  parameters: {
    docs: {
      description: {
        story: '生日選擇器，日期範圍從 1900 年至今日，預設日期為 2000-01-01。',
      },
    },
  },
};

/**
 * 會員建立時間
 */
export const MemberCreated = {
  render: () => {
    const container = createContainer('member-picker');

    setTimeout(() => {
      createDatePicker('member-picker', 'memberCreated', {
        imgPath: '',
        onConfirm: (date) => {
          console.log('會員建立時間:', date);
          alert(`會員建立時間: ${date}`);
        },
      });
    }, 0);

    return container;
  },
  parameters: {
    docs: {
      description: {
        story: '會員建立時間選擇器，日期範圍從 2015 年至今日。',
      },
    },
  },
};

/**
 * 帳務日期
 */
export const Accounting = {
  render: () => {
    const container = createContainer('accounting-picker');

    setTimeout(() => {
      createDatePicker('accounting-picker', 'accounting', {
        imgPath: '',
        onConfirm: (date) => {
          console.log('帳務日期:', date);
          alert(`帳務日期: ${date}`);
        },
      });
    }, 0);

    return container;
  },
  parameters: {
    docs: {
      description: {
        story: '帳務查詢用日期選擇器。',
      },
    },
  },
};

/**
 * 訂單日期
 */
export const OrderManagement = {
  render: () => {
    const container = createContainer('order-picker');

    setTimeout(() => {
      createDatePicker('order-picker', 'orderManagement', {
        imgPath: '',
        onConfirm: (date) => {
          console.log('訂單日期:', date);
          alert(`訂單日期: ${date}`);
        },
      });
    }, 0);

    return container;
  },
  parameters: {
    docs: {
      description: {
        story: '訂單管理用日期選擇器。',
      },
    },
  },
};

/**
 * 自訂設定
 */
export const CustomOptions = {
  render: () => {
    const container = createContainer('custom-picker');

    setTimeout(() => {
      new IOSDatePicker('custom-picker', {
        title: '選擇日期',
        defaultDate: '2024-06-15',
        minDate: '2024-01-01',
        maxDate: '2024-12-31',
        imgPath: '',
        onConfirm: (date) => {
          console.log('選擇的日期:', date);
          alert(`選擇的日期: ${date}`);
        },
        onDateChange: (date) => {
          console.log('日期變更:', date);
        },
      });
    }, 0);

    return container;
  },
  parameters: {
    docs: {
      description: {
        story: '使用自訂選項建立日期選擇器，限定 2024 年範圍。',
      },
    },
  },
};

/**
 * 日期範圍限制 - 只能選擇未來 30 天
 */
export const DateRangeRestriction = {
  render: () => {
    const container = createContainer('range-picker');
    const today = getTodayString();
    const maxDate = getFutureDate(30);

    setTimeout(() => {
      new IOSDatePicker('range-picker', {
        title: '預約日期',
        defaultDate: today,
        minDate: today,
        maxDate: maxDate,
        imgPath: '',
        onConfirm: (date) => {
          console.log('預約日期:', date);
          alert(`預約日期: ${date}`);
        },
      });
    }, 0);

    return container;
  },
  parameters: {
    docs: {
      description: {
        story: `限定日期範圍：只能選擇今日起未來 30 天內的日期。適用於預約、排程等情境。`,
      },
    },
  },
};

/**
 * 未來日期選擇 - 預約/排程
 */
export const FutureDateOnly = {
  render: () => {
    const container = createContainer('future-picker');
    const tomorrow = getFutureDate(1);

    setTimeout(() => {
      new IOSDatePicker('future-picker', {
        title: '選擇預約時間',
        defaultDate: tomorrow,
        minDate: tomorrow,
        maxYear: new Date().getFullYear() + 1,
        imgPath: '',
        onConfirm: (date) => {
          console.log('預約時間:', date);
          alert(`預約時間: ${date}`);
        },
      });
    }, 0);

    return container;
  },
  parameters: {
    docs: {
      description: {
        story: '只能選擇明天之後的日期，適用於預約系統。',
      },
    },
  },
};

/**
 * 帶入現有值
 */
export const WithPrefilledValue = {
  render: () => {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = `
      <div style="margin-bottom: 16px; padding: 12px; background: #E8F5E9; border-radius: 8px; font-family: -apple-system, sans-serif; font-size: 14px;">
        <strong>已存在的日期：</strong> 1995-08-15
      </div>
    `;

    const container = createContainer('prefilled-picker');
    wrapper.appendChild(container);

    setTimeout(() => {
      new IOSDatePicker('prefilled-picker', {
        title: '修改生日',
        currentValue: '1995-08-15',
        minDate: '1900-01-01',
        maxDate: getTodayString(),
        imgPath: '',
        onConfirm: (date) => {
          console.log('更新後的生日:', date);
          alert(`更新後的生日: ${date}`);
        },
      });
    }, 0);

    return wrapper;
  },
  parameters: {
    docs: {
      description: {
        story: '使用 `currentValue` 帶入現有日期值，適用於編輯情境。',
      },
    },
  },
};

/**
 * 即時日期變更回調
 */
export const RealtimeDateChange = {
  render: () => {
    const wrapper = document.createElement('div');

    const display = document.createElement('div');
    display.id = 'realtime-display';
    display.style.cssText = 'margin-bottom: 16px; padding: 16px; background: #E3F2FD; border-radius: 8px; font-family: -apple-system, sans-serif; text-align: center;';
    display.innerHTML = `
      <div style="font-size: 12px; color: #666; margin-bottom: 4px;">目前選擇的日期</div>
      <div id="selected-date" style="font-size: 24px; font-weight: 600; color: #1976D2;">尚未選擇</div>
    `;
    wrapper.appendChild(display);

    const container = createContainer('realtime-picker');
    wrapper.appendChild(container);

    setTimeout(() => {
      new IOSDatePicker('realtime-picker', {
        title: '選擇日期',
        defaultDate: getTodayString(),
        imgPath: '',
        onDateChange: (date) => {
          document.getElementById('selected-date').textContent = date;
          console.log('日期即時變更:', date);
        },
        onConfirm: (date) => {
          alert(`確認選擇: ${date}`);
        },
      });
    }, 0);

    return wrapper;
  },
  parameters: {
    docs: {
      description: {
        story: '使用 `onDateChange` 回調即時監聽日期變更，可用於預覽或聯動其他元件。',
      },
    },
  },
};

/**
 * 自訂主題色
 */
export const CustomStyling = {
  render: () => {
    const wrapper = document.createElement('div');

    // 說明區塊
    const info = document.createElement('div');
    info.style.cssText = 'margin-bottom: 16px; padding: 12px; background: #FFF3E0; border-radius: 8px; font-family: -apple-system, sans-serif; font-size: 13px;';
    info.innerHTML = `
      <strong>自訂 CSS 變數：</strong><br>
      <code>--picker-selected: #E91E63</code><br>
      <code>--picker-primary: #9C27B0</code>
    `;
    wrapper.appendChild(info);

    const container = createContainer('styled-picker');
    wrapper.appendChild(container);

    // 注入自訂樣式
    const style = document.createElement('style');
    style.textContent = `
      #styled-picker .ios-date-picker {
        --picker-selected: #E91E63;
        --picker-primary: #9C27B0;
      }
    `;
    wrapper.appendChild(style);

    setTimeout(() => {
      new IOSDatePicker('styled-picker', {
        title: '自訂主題',
        defaultDate: getTodayString(),
        imgPath: '',
        onConfirm: (date) => {
          alert(`選擇的日期: ${date}`);
        },
      });
    }, 0);

    return wrapper;
  },
  parameters: {
    docs: {
      description: {
        story: '透過 CSS 變數自訂主題色彩，可覆寫 `--picker-selected`（選中色）和 `--picker-primary`（主色）。',
      },
    },
  },
};
