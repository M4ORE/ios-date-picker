# iOS Date Picker

[![npm version](https://img.shields.io/npm/v/@m4ore/ios-date-picker.svg)](https://www.npmjs.com/package/@m4ore/ios-date-picker)
[![license](https://img.shields.io/npm/l/@m4ore/ios-date-picker.svg)](https://github.com/M4ORE/ios-date-picker/blob/main/LICENSE)

iOS 風格的日期選擇器元件，結合**滾輪式年月切換**與**日曆式日期選擇**，提供原生般的操作體驗。

**[Live Demo](https://m4ore.github.io/ios-date-picker/)** - 前往 Storybook 查看元件展示與互動文件

## 特色

- **iOS 原生風格** - 符合 iOS Human Interface Guidelines
- **雙模式整合** - 滾輪快速切換年月 + 日曆直覺選日期
- **零框架依賴** - 純 JavaScript，可整合至任何專案
- **觸控最佳化** - 44px 觸擊區域、CSS Scroll Snap 滑動吸附
- **兩種使用模式** - 全頁式嵌入 / 彈窗式呼叫
- **彈性配置** - 內建預設組態，支援自訂擴充

## 安裝

### NPM（推薦）

```bash
npm install @m4ore/ios-date-picker vanilla-calendar-pro@^2.9.0
```

```javascript
import { IOSDatePicker, createDatePicker, DatePickerModal } from '@m4ore/ios-date-picker';
import '@m4ore/ios-date-picker/css';

// 基本使用
const picker = createDatePicker('my-picker', 'birthday', {
    onConfirm: (date) => console.log(date)  // YYYY-MM-DD
});
```

### CDN

```html
<!-- 依賴：Vanilla Calendar Pro -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/vanilla-calendar-pro@2.9.10/build/vanilla-calendar.min.css">
<script src="https://cdn.jsdelivr.net/npm/vanilla-calendar-pro@2.9.10/build/vanilla-calendar.min.js"></script>

<!-- iOS Date Picker -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@m4ore/ios-date-picker@2/dist/ios-date-picker.min.css">
<script src="https://cdn.jsdelivr.net/npm/@m4ore/ios-date-picker@2/dist/ios-date-picker.min.js"></script>

<script>
const { IOSDatePicker, createDatePicker, DatePickerModal } = IOSDatePickerLib;

const picker = createDatePicker('my-picker', 'birthday', {
    onConfirm: (date) => console.log(date)
});
</script>
```

### 手動下載

從 [GitHub Releases](https://github.com/M4ORE/ios-date-picker/releases) 下載最新版本。

## 使用模式

| 比較項目 | 全頁式 | 彈窗式 |
|---------|--------|--------|
| **顯示方式** | 直接嵌入頁面 | 點擊後彈出 |
| **適用情境** | 表單主要就是選日期 | 日期是表單中的一個欄位 |
| **API** | `createDatePicker()` | `DatePickerModal.open()` |
| **關閉方式** | 不需關閉，常駐顯示 | 確認/返回/下滑關閉 |

## 全頁式模式

```html
<div id="my-picker"></div>

<script>
const picker = createDatePicker('my-picker', 'birthday', {
    imgPath: 'img',  // 圖示路徑
    onConfirm: (date) => {
        console.log('選擇的日期:', date);  // 2024-06-15
    }
});
</script>
```

## 彈窗式模式

### HTML 結構

放在 `</body>` 之前，**不要放在 `<form>` 裡面**：

```html
<!-- 日期欄位 -->
<div class="date-fields" onclick="openPicker()">
    <input type="text" id="birth-year" placeholder="年" readonly>
    <span>/</span>
    <input type="text" id="birth-month" placeholder="月" readonly>
    <span>/</span>
    <input type="text" id="birth-day" placeholder="日" readonly>
</div>

<!-- 彈窗結構 -->
<div class="overlay" id="date-picker-overlay"></div>
<div class="bottom-sheet" id="date-picker-bottom-sheet">
    <div class="bottom-sheet__header">
        <div class="grabber"></div>
    </div>
    <div class="bottom-sheet__content">
        <div id="date-picker-container"></div>
    </div>
</div>
```

### JavaScript

```javascript
// 初始化（只需執行一次）
DatePickerModal.init();

// 開啟日期選擇器
function openPicker() {
    DatePickerModal.open({
        preset: 'birthday',
        fields: {
            year: document.getElementById('birth-year'),
            month: document.getElementById('birth-month'),
            day: document.getElementById('birth-day')
        },
        imgPath: 'img'
    });
}
```

## 內建預設

| 預設類型 | 標題 | 預設日期 | 日期範圍 |
|---------|------|---------|---------|
| `birthday` | 生日 | 2000-01-01 | 1900-01-01 ~ 今日 |
| `memberCreated` | 會員建立時間 | 今日 | 2015 ~ 今日 |
| `accounting` | 帳務日期 | 今日 | 2015 ~ 今日 |
| `orderManagement` | 訂單日期 | 今日 | 2015 ~ 今日 |

## API

### createDatePicker()

```javascript
createDatePicker(containerId, presetType, options)
```

| 參數 | 類型 | 必填 | 說明 |
|------|------|------|------|
| `containerId` | string | ✓ | 容器元素 ID |
| `presetType` | string | ✓ | 預設類型 |
| `options` | object | - | 自訂選項 |

**options**

| 選項 | 類型 | 說明 |
|------|------|------|
| `title` | string | 導覽列標題 |
| `defaultDate` | string | 預設日期（`'YYYY-MM-DD'` 或 `'today'`） |
| `currentValue` | string | 欄位目前值 |
| `minDate` | string | 最小可選日期 |
| `maxDate` | string | 最大可選日期 |
| `imgPath` | string | 圖示資料夾路徑 |
| `onConfirm` | function | 確認 callback |
| `onBack` | function | 返回 callback |
| `onDateChange` | function | 日期變更 callback |

### DatePickerModal

```javascript
// 初始化
DatePickerModal.init(config)

// 開啟
DatePickerModal.open({
    preset: 'birthday',
    fields: { year, month, day },
    imgPath: 'img'
})

// 關閉
DatePickerModal.close()
```

## 樣式客製化

```css
.ios-date-picker {
    --picker-selected: #FF812A;      /* 選中狀態 */
    --picker-primary: #007AFF;       /* iOS 藍 */
    --picker-bg: #F2F2F7;            /* 背景 */
    --picker-body-height: 340px;     /* 日曆區高度 */
}
```

## 技術規格

| 項目 | 規格 |
|------|------|
| 依賴套件 | Vanilla Calendar Pro v2.9.x |
| 瀏覽器支援 | Chrome 80+, Safari 13+, Firefox 75+, Edge 80+ |
| 行動裝置 | iOS 13+, Android 8+ |
| 日期格式 | `YYYY-MM-DD` |

## 依賴套件

- [Vanilla Calendar Pro](https://vanilla-calendar.pro/) v2.9.x (MIT License)

## 授權

MIT License

© 2025 M4ORE Inc. All rights reserved.
