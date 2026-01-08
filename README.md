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

---

## 快速開始

### 方式一：Vite / Webpack / 現代打包工具

**安裝**

```bash
npm install @m4ore/ios-date-picker vanilla-calendar-pro@^2.9.0
```

**main.js**

```javascript
import { createDatePicker, DatePickerModal } from "@m4ore/ios-date-picker";
import "@m4ore/ios-date-picker/css";
import "vanilla-calendar-pro/build/vanilla-calendar.min.css";

document.addEventListener("DOMContentLoaded", () => {
  // 全頁式
  createDatePicker("my-picker", "birthday", {
    onConfirm: (date) => console.log("選擇的日期:", date),
  });

  // 彈窗式（如需使用）
  DatePickerModal.init();
  document.querySelector(".date-fields").addEventListener("click", () => {
    DatePickerModal.open({
      preset: "birthday",
      fields: {
        year: document.getElementById("birth-year"),
        month: document.getElementById("birth-month"),
        day: document.getElementById("birth-day"),
      },
    });
  });
});
```

**index.html**

```html
<!DOCTYPE html>
<html lang="zh-TW">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Date Picker Demo</title>
  </head>
  <body>
    <!-- 全頁式容器 -->
    <div id="my-picker"></div>

    <!-- 彈窗式欄位（如需使用） -->
    <div class="date-fields">
      <input type="text" id="birth-year" placeholder="年" readonly />
      <span>/</span>
      <input type="text" id="birth-month" placeholder="月" readonly />
      <span>/</span>
      <input type="text" id="birth-day" placeholder="日" readonly />
    </div>

    <!-- 彈窗結構（如需使用） -->
    <div class="overlay" id="date-picker-overlay"></div>
    <div class="bottom-sheet" id="date-picker-bottom-sheet">
      <div class="bottom-sheet__header">
        <div class="grabber"></div>
      </div>
      <div class="bottom-sheet__content">
        <div id="date-picker-container"></div>
      </div>
    </div>

    <script type="module" src="/src/main.js"></script>
  </body>
</html>
```

---

### 方式二：CDN（純 HTML，無打包工具）

將以下程式碼貼入 HTML 檔案即可運作：

```html
<!DOCTYPE html>
<html lang="zh-TW">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Date Picker Demo</title>
    <!-- CSS -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/vanilla-calendar-pro@2.9.10/build/vanilla-calendar.min.css" />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@m4ore/ios-date-picker@1/dist/ios-date-picker.css" />
  </head>
  <body>
    <div id="my-picker"></div>

    <!-- JS -->
    <script src="https://cdn.jsdelivr.net/npm/vanilla-calendar-pro@2.9.10/build/vanilla-calendar.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@m4ore/ios-date-picker@1/dist/ios-date-picker.min.js"></script>
    <script>
      const { createDatePicker } = IOSDatePickerLib;

      createDatePicker("my-picker", "birthday", {
        imgPath: "https://cdn.jsdelivr.net/npm/@m4ore/ios-date-picker@1/img",
        onConfirm: (date) => console.log("選擇的日期:", date),
      });
    </script>
  </body>
</html>
```

---

## 使用模式

| 比較項目 | 全頁式 | 彈窗式 |
|---------|--------|--------|
| **顯示方式** | 直接嵌入頁面 | 點擊後彈出 |
| **適用情境** | 表單主要就是選日期 | 日期是表單中的一個欄位 |
| **API** | `createDatePicker()` | `DatePickerModal.open()` |
| **關閉方式** | 不需關閉，常駐顯示 | 確認/返回/下滑關閉 |

## 全頁式模式

```javascript
const picker = createDatePicker('my-picker', 'birthday', {
    onConfirm: (date) => {
        console.log('選擇的日期:', date);  // 2024-06-15
    }
});
```

## 彈窗式模式

### HTML 結構

放在 `</body>` 之前，**不要放在 `<form>` 裡面**：

```html
<!-- 日期欄位 -->
<div class="date-fields">
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

// 綁定點擊事件
document.querySelector('.date-fields').addEventListener('click', () => {
    DatePickerModal.open({
        preset: 'birthday',
        fields: {
            year: document.getElementById('birth-year'),
            month: document.getElementById('birth-month'),
            day: document.getElementById('birth-day')
        }
    });
});
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

| 選項 | 類型 | 預設值 | 說明 |
|------|------|--------|------|
| `title` | string | `'選擇日期'` | 導覽列標題 |
| `defaultDate` | string | 今日日期 | 初始顯示日期 |
| `currentValue` | string | `null` | 欄位目前已選值，優先於 defaultDate |
| `minDate` | string | `'1900-01-01'` | 最小可選日期 |
| `maxDate` | string | `null` | 最大可選日期，可設為 `'today'` |
| `minYear` | number | `1900` | 年份滾輪最小年份 |
| `maxYear` | number | 今年 + 10 | 年份滾輪最大年份 |
| `imgPath` | string | `'../img'` | 圖示資料夾路徑 |
| `onConfirm` | function | `null` | 點擊確認時觸發 |
| `onBack` | function | `null` | 點擊返回時觸發 |
| `onDateChange` | function | `null` | 選擇日期變更時觸發 |

**日期格式說明**

所有日期參數皆使用 `YYYY-MM-DD` 格式（ISO 8601）：

```javascript
{
    defaultDate: '2000-01-01',     // 固定日期
    defaultDate: 'today',          // 特殊值：今日

    minDate: '2020-01-01',         // 最早可選 2020-01-01
    maxDate: '2025-12-31',         // 最晚可選 2025-12-31
    maxDate: 'today',              // 特殊值：最晚可選今日

    currentValue: '2024-06-15',    // 欄位已有值時傳入
}
```

**imgPath 設定**

```javascript
// Vite/Webpack：通常不需設定，使用預設即可

// CDN：必須設定完整路徑
imgPath: 'https://cdn.jsdelivr.net/npm/@m4ore/ios-date-picker@1/img'
```

**Callback 函式**

```javascript
{
    onConfirm: (date) => {
        console.log(date);  // '2024-06-15'
    },
    onBack: () => {
        console.log('使用者點擊返回');
    },
    onDateChange: (date) => {
        console.log('日期變更為:', date);  // 每次點擊日期都會觸發
    }
}
```

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

---

## Q&A 常見問題

### Q: 為什麼在 `<script>` 標籤中使用 import 會報錯？

**錯誤訊息：** `Uncaught SyntaxError: Cannot use import statement outside a module`

**原因：** `import` 是 ES Module 語法，只能在以下情況使用：
1. 打包工具環境（Vite/Webpack）的 `.js` 檔案中
2. `<script type="module">` 中，但只能 import URL，不能 import 套件名稱

**解決方式：**
- 使用 Vite/Webpack：所有 import 都寫在 `.js` 檔案中
- 純 HTML：使用 CDN 方式，用 `<script src="...">` 載入

---

### Q: 為什麼圖示（箭頭）會破圖？

**原因：** 打包工具環境下，預設的 `imgPath` 相對路徑可能找不到圖片。

**解決方式：** 設定 `imgPath` 為 CDN 路徑：

```javascript
createDatePicker('my-picker', 'birthday', {
    imgPath: 'https://cdn.jsdelivr.net/npm/@m4ore/ios-date-picker@1/img',
    onConfirm: (date) => console.log(date)
});
```

---

### Q: 需要手動 import VanillaCalendar 嗎？

**不需要。** 套件內部已經處理好依賴，你只需要：

```javascript
import { createDatePicker } from "@m4ore/ios-date-picker";
import "@m4ore/ios-date-picker/css";
import "vanilla-calendar-pro/build/vanilla-calendar.min.css";

// 直接使用，不需要 import VanillaCalendar
createDatePicker("my-picker", "birthday", {...});
```

---

### Q: Vite/Webpack 和 CDN 有什麼差別？

| 項目 | Vite/Webpack | CDN |
|------|-------------|-----|
| **安裝方式** | `npm install` | 無需安裝 |
| **引入方式** | `import` 在 .js 檔案中 | `<script src="...">` 在 HTML 中 |
| **適用情境** | 現代前端專案 | 簡單網頁、快速原型 |
| **套件物件** | 直接 import 使用 | 從 `IOSDatePickerLib` 取得 |

---

## 授權

MIT License

© 2025 M4ORE Inc. All rights reserved.
