/**
 * iOS Date Picker Stories
 */
import { createDatePicker, IOSDatePicker } from '../src/index.js';

export default {
  title: 'Components/DatePicker',
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    preset: {
      control: 'select',
      options: ['birthday', 'memberCreated', 'accounting', 'orderManagement'],
      description: '預設類型',
    },
    title: {
      control: 'text',
      description: '標題',
    },
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
