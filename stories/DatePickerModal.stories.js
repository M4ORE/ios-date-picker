/**
 * iOS Date Picker Modal Stories
 * 彈窗模式（Bottom Sheet）
 */
import { DatePickerModal } from '../src/index.js';

export default {
  title: 'Components/DatePickerModal',
  parameters: {
    layout: 'fullscreen',
  },
};

/**
 * 建立完整的 Modal 結構
 */
const createModalStructure = () => {
  const wrapper = document.createElement('div');
  wrapper.style.padding = '40px';
  wrapper.style.minHeight = '100vh';
  wrapper.style.background = '#F2F2F7';
  wrapper.style.boxSizing = 'border-box';

  wrapper.innerHTML = `
    <div style="max-width: 375px; margin: 0 auto;">
      <h3 style="margin: 0 0 20px; font-family: -apple-system, sans-serif; font-size: 17px; font-weight: 600;">
        彈窗模式範例
      </h3>

      <div style="background: #fff; border-radius: 12px; padding: 16px;">
        <label style="display: block; font-size: 13px; color: #666; margin-bottom: 8px; font-family: -apple-system, sans-serif;">
          生日
        </label>
        <div class="date-fields" id="trigger-modal" style="display: flex; align-items: center; gap: 4px; cursor: pointer; padding: 12px; background: #F9F9F9; border-radius: 8px;">
          <input type="text" id="birth-year" placeholder="年" readonly
            style="width: 60px; border: none; background: transparent; text-align: center; font-size: 16px; cursor: pointer; font-family: -apple-system, sans-serif;">
          <span style="color: #999;">/</span>
          <input type="text" id="birth-month" placeholder="月" readonly
            style="width: 40px; border: none; background: transparent; text-align: center; font-size: 16px; cursor: pointer; font-family: -apple-system, sans-serif;">
          <span style="color: #999;">/</span>
          <input type="text" id="birth-day" placeholder="日" readonly
            style="width: 40px; border: none; background: transparent; text-align: center; font-size: 16px; cursor: pointer; font-family: -apple-system, sans-serif;">
        </div>
        <p style="margin: 12px 0 0; font-size: 12px; color: #999; font-family: -apple-system, sans-serif;">
          點擊上方欄位開啟日期選擇器
        </p>
      </div>
    </div>

    <!-- Overlay -->
    <div class="overlay" id="date-picker-overlay"></div>

    <!-- Bottom Sheet -->
    <div class="bottom-sheet" id="date-picker-bottom-sheet">
      <div class="bottom-sheet__header">
        <div class="grabber"></div>
      </div>
      <div class="bottom-sheet__content">
        <div id="date-picker-container"></div>
      </div>
    </div>
  `;

  return wrapper;
};

/**
 * 生日選擇彈窗
 */
export const BirthdayModal = {
  render: () => {
    const wrapper = createModalStructure();

    setTimeout(() => {
      // 初始化 Modal
      DatePickerModal.init({
        overlayId: 'date-picker-overlay',
        bottomSheetId: 'date-picker-bottom-sheet',
        containerId: 'date-picker-container',
      });

      // 綁定點擊事件
      const trigger = wrapper.querySelector('#trigger-modal');
      trigger.addEventListener('click', () => {
        DatePickerModal.open({
          preset: 'birthday',
          fields: {
            year: wrapper.querySelector('#birth-year'),
            month: wrapper.querySelector('#birth-month'),
            day: wrapper.querySelector('#birth-day'),
          },
          imgPath: '',
        });
      });
    }, 100);

    return wrapper;
  },
  parameters: {
    docs: {
      description: {
        story: '點擊日期欄位開啟 Bottom Sheet 彈窗選擇生日。支援下滑關閉。',
      },
    },
  },
};

/**
 * 會員建立時間彈窗
 */
export const MemberCreatedModal = {
  render: () => {
    const wrapper = document.createElement('div');
    wrapper.style.padding = '40px';
    wrapper.style.minHeight = '100vh';
    wrapper.style.background = '#F2F2F7';
    wrapper.style.boxSizing = 'border-box';

    wrapper.innerHTML = `
      <div style="max-width: 375px; margin: 0 auto;">
        <h3 style="margin: 0 0 20px; font-family: -apple-system, sans-serif; font-size: 17px; font-weight: 600;">
          會員建立時間
        </h3>

        <div style="background: #fff; border-radius: 12px; padding: 16px;">
          <label style="display: block; font-size: 13px; color: #666; margin-bottom: 8px; font-family: -apple-system, sans-serif;">
            建立日期
          </label>
          <div id="trigger-member" style="display: flex; align-items: center; gap: 4px; cursor: pointer; padding: 12px; background: #F9F9F9; border-radius: 8px;">
            <input type="text" id="member-year" placeholder="年" readonly
              style="width: 60px; border: none; background: transparent; text-align: center; font-size: 16px; cursor: pointer; font-family: -apple-system, sans-serif;">
            <span style="color: #999;">/</span>
            <input type="text" id="member-month" placeholder="月" readonly
              style="width: 40px; border: none; background: transparent; text-align: center; font-size: 16px; cursor: pointer; font-family: -apple-system, sans-serif;">
            <span style="color: #999;">/</span>
            <input type="text" id="member-day" placeholder="日" readonly
              style="width: 40px; border: none; background: transparent; text-align: center; font-size: 16px; cursor: pointer; font-family: -apple-system, sans-serif;">
          </div>
        </div>
      </div>

      <div class="overlay" id="member-overlay"></div>
      <div class="bottom-sheet" id="member-bottom-sheet">
        <div class="bottom-sheet__header">
          <div class="grabber"></div>
        </div>
        <div class="bottom-sheet__content">
          <div id="member-container"></div>
        </div>
      </div>
    `;

    setTimeout(() => {
      DatePickerModal.init({
        overlayId: 'member-overlay',
        bottomSheetId: 'member-bottom-sheet',
        containerId: 'member-container',
      });

      wrapper.querySelector('#trigger-member').addEventListener('click', () => {
        DatePickerModal.open({
          preset: 'memberCreated',
          fields: {
            year: wrapper.querySelector('#member-year'),
            month: wrapper.querySelector('#member-month'),
            day: wrapper.querySelector('#member-day'),
          },
          imgPath: '',
        });
      });
    }, 100);

    return wrapper;
  },
  parameters: {
    docs: {
      description: {
        story: '會員建立時間選擇，日期範圍從 2015 年至今日。',
      },
    },
  },
};
