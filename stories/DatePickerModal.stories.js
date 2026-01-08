/**
 * iOS Date Picker Modal Stories
 * 彈窗模式（Bottom Sheet）
 */
import { DatePickerModal } from '../src/index.js';

// 生成唯一 ID 前綴（避免 Docs 模式下 ID 衝突）
const generateUniquePrefix = () => `modal-${Math.random().toString(36).slice(2, 9)}`;

// 共用樣式
const styles = {
  input: `
    width: 50px;
    border: none;
    background: transparent;
    text-align: center;
    font-size: 16px;
    cursor: pointer;
    font-family: -apple-system, sans-serif;
    outline: none;
  `,
  fieldContainer: `
    display: flex;
    align-items: center;
    gap: 4px;
    cursor: pointer;
    padding: 12px;
    background: #F9F9F9;
    border-radius: 8px;
    transition: background 0.2s;
  `,
};

/**
 * 從欄位取得日期字串
 */
const getDateFromFields = (wrapper, prefix, type = '') => {
  const suffix = type ? `-${type}` : '';
  const year = wrapper.querySelector(`#${prefix}${suffix}-year`)?.value;
  const month = wrapper.querySelector(`#${prefix}${suffix}-month`)?.value;
  const day = wrapper.querySelector(`#${prefix}${suffix}-day`)?.value;

  if (year && month && day) {
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
  }
  return null;
};

/**
 * 單一日期 Template
 */
const Template = (args) => {
  const prefix = generateUniquePrefix();
  const wrapper = document.createElement('div');
  wrapper.style.cssText = 'padding: 40px; min-height: 100vh; background: #F2F2F7; box-sizing: border-box;';

  wrapper.innerHTML = `
    <div style="max-width: 375px; margin: 0 auto;">
      <h3 style="margin: 0 0 20px; font-family: -apple-system, sans-serif; font-size: 17px; font-weight: 600;">
        ${args.title || '彈窗模式'}
      </h3>

      <div style="background: #fff; border-radius: 12px; padding: 16px;">
        <label style="display: block; font-size: 13px; color: #666; margin-bottom: 8px; font-family: -apple-system, sans-serif;">
          ${args.label || '選擇日期'}
        </label>
        <div id="${prefix}-trigger" style="${styles.fieldContainer}">
          <input type="text" id="${prefix}-year" placeholder="年" readonly style="${styles.input} width: 60px;">
          <span style="color: #999;">/</span>
          <input type="text" id="${prefix}-month" placeholder="月" readonly style="${styles.input} width: 40px;">
          <span style="color: #999;">/</span>
          <input type="text" id="${prefix}-day" placeholder="日" readonly style="${styles.input} width: 40px;">
        </div>
        <p style="margin: 12px 0 0; font-size: 12px; color: #999; font-family: -apple-system, sans-serif;">
          點擊上方欄位開啟日期選擇器
        </p>
      </div>

      <!-- 選擇結果顯示 -->
      <div id="${prefix}-result" style="margin-top: 16px; padding: 16px; background: #E3F2FD; border-radius: 12px; display: none;">
        <div style="font-size: 12px; color: #666; margin-bottom: 4px; font-family: -apple-system, sans-serif;">已選擇日期</div>
        <div id="${prefix}-result-text" style="font-size: 20px; font-weight: 600; color: #1976D2; font-family: -apple-system, sans-serif;"></div>
      </div>
    </div>

    <div class="overlay" id="${prefix}-overlay"></div>
    <div class="bottom-sheet" id="${prefix}-bottom-sheet">
      <div class="bottom-sheet__header">
        <div class="grabber"></div>
      </div>
      <div class="bottom-sheet__content">
        <div id="${prefix}-container"></div>
      </div>
    </div>
  `;

  requestAnimationFrame(() => {
    DatePickerModal.init({
      overlayId: `${prefix}-overlay`,
      bottomSheetId: `${prefix}-bottom-sheet`,
      containerId: `${prefix}-container`,
    });

    wrapper.querySelector(`#${prefix}-trigger`).addEventListener('click', () => {
      DatePickerModal.open({
        preset: args.preset || 'birthday',
        title: args.pickerTitle,
        fields: {
          year: wrapper.querySelector(`#${prefix}-year`),
          month: wrapper.querySelector(`#${prefix}-month`),
          day: wrapper.querySelector(`#${prefix}-day`),
        },
        imgPath: '',
        onConfirm: (date) => {
          const result = wrapper.querySelector(`#${prefix}-result`);
          const resultText = wrapper.querySelector(`#${prefix}-result-text`);
          result.style.display = 'block';
          resultText.textContent = date;
        },
      });
    });
  });

  return wrapper;
};

/**
 * 日期區間 Template（含防呆邏輯）
 */
const DateRangeTemplate = (args) => {
  const prefix = generateUniquePrefix();
  const wrapper = document.createElement('div');
  wrapper.style.cssText = 'padding: 40px; min-height: 100vh; background: #F2F2F7; box-sizing: border-box;';

  wrapper.innerHTML = `
    <div style="max-width: 375px; margin: 0 auto;">
      <h3 style="margin: 0 0 20px; font-family: -apple-system, sans-serif; font-size: 17px; font-weight: 600;">
        ${args.title || '日期區間'}
      </h3>

      <div style="background: #fff; border-radius: 12px; padding: 16px;">
        <!-- 開始日期 -->
        <div style="margin-bottom: 16px;">
          <label style="display: block; font-size: 13px; color: #666; margin-bottom: 8px; font-family: -apple-system, sans-serif;">
            ${args.startLabel || '開始日期'}
          </label>
          <div id="${prefix}-trigger-start" style="${styles.fieldContainer}">
            <input type="text" id="${prefix}-start-year" placeholder="年" readonly style="${styles.input} width: 60px;">
            <span style="color: #999;">/</span>
            <input type="text" id="${prefix}-start-month" placeholder="月" readonly style="${styles.input} width: 40px;">
            <span style="color: #999;">/</span>
            <input type="text" id="${prefix}-start-day" placeholder="日" readonly style="${styles.input} width: 40px;">
          </div>
        </div>

        <!-- 結束日期 -->
        <div>
          <label style="display: block; font-size: 13px; color: #666; margin-bottom: 8px; font-family: -apple-system, sans-serif;">
            ${args.endLabel || '結束日期'}
          </label>
          <div id="${prefix}-trigger-end" style="${styles.fieldContainer}">
            <input type="text" id="${prefix}-end-year" placeholder="年" readonly style="${styles.input} width: 60px;">
            <span style="color: #999;">/</span>
            <input type="text" id="${prefix}-end-month" placeholder="月" readonly style="${styles.input} width: 40px;">
            <span style="color: #999;">/</span>
            <input type="text" id="${prefix}-end-day" placeholder="日" readonly style="${styles.input} width: 40px;">
          </div>
        </div>
      </div>

      <!-- 區間結果顯示 -->
      <div id="${prefix}-result" style="margin-top: 16px; padding: 16px; background: #E3F2FD; border-radius: 12px; display: none;">
        <div style="font-size: 12px; color: #666; margin-bottom: 4px; font-family: -apple-system, sans-serif;">已選擇區間</div>
        <div id="${prefix}-result-text" style="font-size: 18px; font-weight: 600; color: #1976D2; font-family: -apple-system, sans-serif;"></div>
      </div>
    </div>

    <div class="overlay" id="${prefix}-overlay"></div>
    <div class="bottom-sheet" id="${prefix}-bottom-sheet">
      <div class="bottom-sheet__header">
        <div class="grabber"></div>
      </div>
      <div class="bottom-sheet__content">
        <div id="${prefix}-container"></div>
      </div>
    </div>
  `;

  const updateResult = () => {
    const startDate = getDateFromFields(wrapper, prefix, 'start');
    const endDate = getDateFromFields(wrapper, prefix, 'end');

    if (startDate && endDate) {
      const result = wrapper.querySelector(`#${prefix}-result`);
      const resultText = wrapper.querySelector(`#${prefix}-result-text`);
      result.style.display = 'block';
      resultText.textContent = `${startDate} ~ ${endDate}`;
    }
  };

  requestAnimationFrame(() => {
    DatePickerModal.init({
      overlayId: `${prefix}-overlay`,
      bottomSheetId: `${prefix}-bottom-sheet`,
      containerId: `${prefix}-container`,
    });

    // 開始日期：maxDate 限制為已選的結束日期
    wrapper.querySelector(`#${prefix}-trigger-start`).addEventListener('click', () => {
      const endDate = getDateFromFields(wrapper, prefix, 'end');

      DatePickerModal.open({
        preset: args.preset || 'accounting',
        title: args.startLabel || '開始日期',
        fields: {
          year: wrapper.querySelector(`#${prefix}-start-year`),
          month: wrapper.querySelector(`#${prefix}-start-month`),
          day: wrapper.querySelector(`#${prefix}-start-day`),
        },
        imgPath: '',
        maxDate: endDate || 'today',  // 不能超過結束日期
        onConfirm: (date) => {
          updateResult();
        },
      });
    });

    // 結束日期：minDate 限制為已選的開始日期
    wrapper.querySelector(`#${prefix}-trigger-end`).addEventListener('click', () => {
      const startDate = getDateFromFields(wrapper, prefix, 'start');

      DatePickerModal.open({
        preset: args.preset || 'accounting',
        title: args.endLabel || '結束日期',
        fields: {
          year: wrapper.querySelector(`#${prefix}-end-year`),
          month: wrapper.querySelector(`#${prefix}-end-month`),
          day: wrapper.querySelector(`#${prefix}-end-day`),
        },
        imgPath: '',
        minDate: startDate || undefined,  // 不能早於開始日期
        maxDate: 'today',
        onConfirm: (date) => {
          updateResult();
        },
      });
    });
  });

  return wrapper;
};

// Story 設定
export default {
  title: 'Components/DatePickerModal',
  parameters: {
    layout: 'fullscreen',
  },
};

/**
 * 彈窗模式完整展示
 */
export const Playground = {
  args: {
    preset: 'birthday',
    title: '彈窗模式',
    label: '生日',
    pickerTitle: '選擇生日',
  },
  argTypes: {
    preset: {
      control: 'select',
      options: ['birthday', 'memberCreated', 'accounting', 'orderManagement'],
      description: '預設模式',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'birthday' },
      },
    },
    title: {
      control: 'text',
      description: '卡片標題',
    },
    label: {
      control: 'text',
      description: '欄位標籤',
    },
    pickerTitle: {
      control: 'text',
      description: '選擇器標題（彈窗內）',
    },
  },
  render: (args) => Template(args),
  parameters: {
    docs: {
      description: {
        story: `彈窗式日期選擇器，點擊欄位開啟 Bottom Sheet。

### 功能特色
- 支援下滑關閉手勢
- 自動填入年/月/日欄位
- 選擇後顯示結果

### Controls
- **preset**: 切換預設模式
- **title**: 卡片標題
- **label**: 欄位標籤
- **pickerTitle**: 彈窗內的選擇器標題`,
      },
    },
  },
};

/**
 * 日期區間選擇（含防呆）
 */
export const DateRange = {
  args: {
    preset: 'accounting',
    title: '日期區間查詢',
    startLabel: '開始日期',
    endLabel: '結束日期',
  },
  argTypes: {
    preset: {
      control: 'select',
      options: ['birthday', 'memberCreated', 'accounting', 'orderManagement'],
      description: '預設模式',
    },
    title: {
      control: 'text',
      description: '卡片標題',
    },
    startLabel: {
      control: 'text',
      description: '開始日期標籤',
    },
    endLabel: {
      control: 'text',
      description: '結束日期標籤',
    },
  },
  render: (args) => DateRangeTemplate(args),
  parameters: {
    docs: {
      description: {
        story: `日期區間選擇，適用於查詢、篩選等情境。

### 防呆機制
- **開始日期**: 不能選擇超過已選的結束日期（maxDate 限制）
- **結束日期**: 不能選擇早於已選的開始日期（minDate 限制）

### 使用場景
- 帳務查詢
- 訂單篩選
- 報表匯出

選擇開始和結束日期後，上方會顯示選擇的區間。`,
      },
    },
  },
};
