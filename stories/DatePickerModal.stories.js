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

// 共用樣式
const inputStyle = `
  width: 50px;
  border: none;
  background: transparent;
  text-align: center;
  font-size: 16px;
  cursor: pointer;
  font-family: -apple-system, sans-serif;
  outline: none;
`;

const fieldContainerStyle = `
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  padding: 12px;
  background: #F9F9F9;
  border-radius: 8px;
  transition: background 0.2s;
`;

/**
 * 生日選擇彈窗
 */
export const BirthdayModal = {
  render: () => {
    const wrapper = document.createElement('div');
    wrapper.style.cssText = 'padding: 40px; min-height: 100vh; background: #F2F2F7; box-sizing: border-box;';

    wrapper.innerHTML = `
      <div style="max-width: 375px; margin: 0 auto;">
        <h3 style="margin: 0 0 20px; font-family: -apple-system, sans-serif; font-size: 17px; font-weight: 600;">
          彈窗模式範例
        </h3>

        <div style="background: #fff; border-radius: 12px; padding: 16px;">
          <label style="display: block; font-size: 13px; color: #666; margin-bottom: 8px; font-family: -apple-system, sans-serif;">
            生日
          </label>
          <div id="trigger-birthday" style="${fieldContainerStyle}">
            <input type="text" id="birth-year" placeholder="年" readonly style="${inputStyle} width: 60px;">
            <span style="color: #999;">/</span>
            <input type="text" id="birth-month" placeholder="月" readonly style="${inputStyle} width: 40px;">
            <span style="color: #999;">/</span>
            <input type="text" id="birth-day" placeholder="日" readonly style="${inputStyle} width: 40px;">
          </div>
          <p style="margin: 12px 0 0; font-size: 12px; color: #999; font-family: -apple-system, sans-serif;">
            點擊上方欄位開啟日期選擇器
          </p>
        </div>
      </div>

      <div class="overlay" id="date-picker-overlay"></div>
      <div class="bottom-sheet" id="date-picker-bottom-sheet">
        <div class="bottom-sheet__header">
          <div class="grabber"></div>
        </div>
        <div class="bottom-sheet__content">
          <div id="date-picker-container"></div>
        </div>
      </div>
    `;

    setTimeout(() => {
      DatePickerModal.init({
        overlayId: 'date-picker-overlay',
        bottomSheetId: 'date-picker-bottom-sheet',
        containerId: 'date-picker-container',
      });

      wrapper.querySelector('#trigger-birthday').addEventListener('click', () => {
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
    wrapper.style.cssText = 'padding: 40px; min-height: 100vh; background: #F2F2F7; box-sizing: border-box;';

    wrapper.innerHTML = `
      <div style="max-width: 375px; margin: 0 auto;">
        <h3 style="margin: 0 0 20px; font-family: -apple-system, sans-serif; font-size: 17px; font-weight: 600;">
          會員建立時間
        </h3>

        <div style="background: #fff; border-radius: 12px; padding: 16px;">
          <label style="display: block; font-size: 13px; color: #666; margin-bottom: 8px; font-family: -apple-system, sans-serif;">
            建立日期
          </label>
          <div id="trigger-member" style="${fieldContainerStyle}">
            <input type="text" id="member-year" placeholder="年" readonly style="${inputStyle} width: 60px;">
            <span style="color: #999;">/</span>
            <input type="text" id="member-month" placeholder="月" readonly style="${inputStyle} width: 40px;">
            <span style="color: #999;">/</span>
            <input type="text" id="member-day" placeholder="日" readonly style="${inputStyle} width: 40px;">
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

/**
 * 表單整合
 */
export const FormIntegration = {
  render: () => {
    const wrapper = document.createElement('div');
    wrapper.style.cssText = 'padding: 40px; min-height: 100vh; background: #F2F2F7; box-sizing: border-box;';

    wrapper.innerHTML = `
      <div style="max-width: 375px; margin: 0 auto;">
        <h3 style="margin: 0 0 20px; font-family: -apple-system, sans-serif; font-size: 17px; font-weight: 600;">
          會員註冊表單
        </h3>

        <form id="registration-form" style="background: #fff; border-radius: 12px; padding: 20px;">
          <!-- 姓名 -->
          <div style="margin-bottom: 20px;">
            <label style="display: block; font-size: 13px; color: #666; margin-bottom: 8px; font-family: -apple-system, sans-serif;">
              姓名 <span style="color: #E53935;">*</span>
            </label>
            <input type="text" id="form-name" placeholder="請輸入姓名"
              style="width: 100%; padding: 12px; border: 1px solid #E0E0E0; border-radius: 8px; font-size: 16px; box-sizing: border-box; font-family: -apple-system, sans-serif;">
          </div>

          <!-- 手機 -->
          <div style="margin-bottom: 20px;">
            <label style="display: block; font-size: 13px; color: #666; margin-bottom: 8px; font-family: -apple-system, sans-serif;">
              手機號碼 <span style="color: #E53935;">*</span>
            </label>
            <input type="tel" id="form-phone" placeholder="0912345678"
              style="width: 100%; padding: 12px; border: 1px solid #E0E0E0; border-radius: 8px; font-size: 16px; box-sizing: border-box; font-family: -apple-system, sans-serif;">
          </div>

          <!-- 生日 -->
          <div style="margin-bottom: 20px;">
            <label style="display: block; font-size: 13px; color: #666; margin-bottom: 8px; font-family: -apple-system, sans-serif;">
              生日 <span style="color: #E53935;">*</span>
            </label>
            <div id="trigger-form-birthday" style="${fieldContainerStyle} border: 1px solid #E0E0E0;">
              <input type="text" id="form-year" placeholder="年" readonly style="${inputStyle} width: 60px;">
              <span style="color: #999;">/</span>
              <input type="text" id="form-month" placeholder="月" readonly style="${inputStyle} width: 40px;">
              <span style="color: #999;">/</span>
              <input type="text" id="form-day" placeholder="日" readonly style="${inputStyle} width: 40px;">
            </div>
          </div>

          <!-- 送出按鈕 -->
          <button type="submit"
            style="width: 100%; padding: 14px; background: #FF812A; color: #fff; border: none; border-radius: 8px; font-size: 16px; font-weight: 600; cursor: pointer; font-family: -apple-system, sans-serif;">
            送出註冊
          </button>
        </form>
      </div>

      <div class="overlay" id="form-overlay"></div>
      <div class="bottom-sheet" id="form-bottom-sheet">
        <div class="bottom-sheet__header">
          <div class="grabber"></div>
        </div>
        <div class="bottom-sheet__content">
          <div id="form-container"></div>
        </div>
      </div>
    `;

    setTimeout(() => {
      DatePickerModal.init({
        overlayId: 'form-overlay',
        bottomSheetId: 'form-bottom-sheet',
        containerId: 'form-container',
      });

      wrapper.querySelector('#trigger-form-birthday').addEventListener('click', () => {
        DatePickerModal.open({
          preset: 'birthday',
          fields: {
            year: wrapper.querySelector('#form-year'),
            month: wrapper.querySelector('#form-month'),
            day: wrapper.querySelector('#form-day'),
          },
          imgPath: '',
        });
      });

      wrapper.querySelector('#registration-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const name = wrapper.querySelector('#form-name').value;
        const phone = wrapper.querySelector('#form-phone').value;
        const year = wrapper.querySelector('#form-year').value;
        const month = wrapper.querySelector('#form-month').value;
        const day = wrapper.querySelector('#form-day').value;

        if (!name || !phone || !year || !month || !day) {
          alert('請填寫所有必填欄位');
          return;
        }

        alert(`註冊成功！\n姓名：${name}\n手機：${phone}\n生日：${year}-${month}-${day}`);
      });
    }, 100);

    return wrapper;
  },
  parameters: {
    docs: {
      description: {
        story: '完整的表單整合範例，展示日期選擇器如何與其他表單欄位配合使用。',
      },
    },
  },
};

/**
 * 多個日期欄位（開始/結束日期）
 */
export const MultiplePickers = {
  render: () => {
    const wrapper = document.createElement('div');
    wrapper.style.cssText = 'padding: 40px; min-height: 100vh; background: #F2F2F7; box-sizing: border-box;';

    wrapper.innerHTML = `
      <div style="max-width: 375px; margin: 0 auto;">
        <h3 style="margin: 0 0 20px; font-family: -apple-system, sans-serif; font-size: 17px; font-weight: 600;">
          日期區間查詢
        </h3>

        <div style="background: #fff; border-radius: 12px; padding: 16px;">
          <!-- 開始日期 -->
          <div style="margin-bottom: 16px;">
            <label style="display: block; font-size: 13px; color: #666; margin-bottom: 8px; font-family: -apple-system, sans-serif;">
              開始日期
            </label>
            <div id="trigger-start" style="${fieldContainerStyle}">
              <input type="text" id="start-year" placeholder="年" readonly style="${inputStyle} width: 60px;">
              <span style="color: #999;">/</span>
              <input type="text" id="start-month" placeholder="月" readonly style="${inputStyle} width: 40px;">
              <span style="color: #999;">/</span>
              <input type="text" id="start-day" placeholder="日" readonly style="${inputStyle} width: 40px;">
            </div>
          </div>

          <!-- 結束日期 -->
          <div style="margin-bottom: 16px;">
            <label style="display: block; font-size: 13px; color: #666; margin-bottom: 8px; font-family: -apple-system, sans-serif;">
              結束日期
            </label>
            <div id="trigger-end" style="${fieldContainerStyle}">
              <input type="text" id="end-year" placeholder="年" readonly style="${inputStyle} width: 60px;">
              <span style="color: #999;">/</span>
              <input type="text" id="end-month" placeholder="月" readonly style="${inputStyle} width: 40px;">
              <span style="color: #999;">/</span>
              <input type="text" id="end-day" placeholder="日" readonly style="${inputStyle} width: 40px;">
            </div>
          </div>

          <!-- 查詢按鈕 -->
          <button id="search-btn" type="button"
            style="width: 100%; padding: 12px; background: #007AFF; color: #fff; border: none; border-radius: 8px; font-size: 15px; font-weight: 600; cursor: pointer; font-family: -apple-system, sans-serif;">
            查詢
          </button>
        </div>

        <!-- 結果顯示 -->
        <div id="result-display" style="margin-top: 16px; padding: 16px; background: #fff; border-radius: 12px; display: none;">
          <div style="font-size: 13px; color: #666; margin-bottom: 4px; font-family: -apple-system, sans-serif;">查詢區間</div>
          <div id="result-text" style="font-size: 16px; font-weight: 600; font-family: -apple-system, sans-serif;"></div>
        </div>
      </div>

      <div class="overlay" id="multi-overlay"></div>
      <div class="bottom-sheet" id="multi-bottom-sheet">
        <div class="bottom-sheet__header">
          <div class="grabber"></div>
        </div>
        <div class="bottom-sheet__content">
          <div id="multi-container"></div>
        </div>
      </div>
    `;

    setTimeout(() => {
      DatePickerModal.init({
        overlayId: 'multi-overlay',
        bottomSheetId: 'multi-bottom-sheet',
        containerId: 'multi-container',
      });

      // 開始日期
      wrapper.querySelector('#trigger-start').addEventListener('click', () => {
        DatePickerModal.open({
          preset: 'accounting',
          title: '開始日期',
          fields: {
            year: wrapper.querySelector('#start-year'),
            month: wrapper.querySelector('#start-month'),
            day: wrapper.querySelector('#start-day'),
          },
          imgPath: '',
        });
      });

      // 結束日期
      wrapper.querySelector('#trigger-end').addEventListener('click', () => {
        DatePickerModal.open({
          preset: 'accounting',
          title: '結束日期',
          fields: {
            year: wrapper.querySelector('#end-year'),
            month: wrapper.querySelector('#end-month'),
            day: wrapper.querySelector('#end-day'),
          },
          imgPath: '',
        });
      });

      // 查詢按鈕
      wrapper.querySelector('#search-btn').addEventListener('click', () => {
        const startYear = wrapper.querySelector('#start-year').value;
        const startMonth = wrapper.querySelector('#start-month').value;
        const startDay = wrapper.querySelector('#start-day').value;
        const endYear = wrapper.querySelector('#end-year').value;
        const endMonth = wrapper.querySelector('#end-month').value;
        const endDay = wrapper.querySelector('#end-day').value;

        if (!startYear || !endYear) {
          alert('請選擇開始和結束日期');
          return;
        }

        const startDate = `${startYear}-${startMonth}-${startDay}`;
        const endDate = `${endYear}-${endMonth}-${endDay}`;

        const resultDisplay = wrapper.querySelector('#result-display');
        const resultText = wrapper.querySelector('#result-text');

        resultDisplay.style.display = 'block';
        resultText.textContent = `${startDate} 至 ${endDate}`;
      });
    }, 100);

    return wrapper;
  },
  parameters: {
    docs: {
      description: {
        story: '多個日期欄位範例，適用於日期區間查詢（開始日期、結束日期）。',
      },
    },
  },
};
