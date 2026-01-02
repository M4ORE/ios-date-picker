/**
 * iOS Date Picker
 * Copyright (c) 2025-present M4ORE Inc.
 * Licensed under MIT License
 *
 * @module @m4ore/ios-date-picker/modal
 *
 * 整合 Bottom Sheet + Header 拖曳 + iOS Date Picker
 *
 * @example
 * import { DatePickerModal } from '@m4ore/ios-date-picker';
 *
 * // 初始化（頁面載入時執行一次）
 * DatePickerModal.init({
 *   overlayId: 'date-picker-overlay',
 *   bottomSheetId: 'date-picker-bottom-sheet',
 *   containerId: 'date-picker-container'
 * });
 *
 * // 開啟日期選擇器
 * DatePickerModal.open({
 *   preset: 'birthday',
 *   fields: { year: yearInput, month: monthInput, day: dayInput }
 * });
 */

import { createDatePicker } from './date-picker-presets.js';

// 元素參照
let overlay = null;
let bottomSheet = null;
let header = null;
let containerId = null;

// Picker 狀態
let activePicker = null;

// Header 拖曳狀態
let startY = 0;
let currentY = 0;
let isDragging = false;

// ===== Header 拖曳功能 =====
function handleTouchStart(e) {
    isDragging = true;
    startY = e.touches[0].clientY;
    currentY = startY;
    bottomSheet.style.transition = 'none';
}

function handleTouchMove(e) {
    if (!isDragging) return;
    currentY = e.touches[0].clientY;
    const diff = currentY - startY;
    if (diff > 0) {
        bottomSheet.style.transform = 'translateX(-50%) translateY(' + diff + 'px)';
        overlay.style.opacity = Math.max(0, 1 - (diff / 300));
    }
}

function handleTouchEnd() {
    if (!isDragging) return;
    isDragging = false;
    const diff = currentY - startY;

    if (diff > 50) {
        slideClose();
    } else {
        snapBack();
    }
    startY = 0;
    currentY = 0;
}

function handleMouseDown(e) {
    isDragging = true;
    startY = e.clientY;
    currentY = startY;
    bottomSheet.style.transition = 'none';
    e.preventDefault();
}

function handleMouseMove(e) {
    if (!isDragging) return;
    currentY = e.clientY;
    const diff = currentY - startY;
    if (diff > 0) {
        bottomSheet.style.transform = 'translateX(-50%) translateY(' + diff + 'px)';
        overlay.style.opacity = Math.max(0, 1 - (diff / 300));
    }
}

function handleMouseUp() {
    if (!isDragging) return;
    isDragging = false;
    const diff = currentY - startY;

    if (diff > 50) {
        slideClose();
    } else {
        snapBack();
    }
    startY = 0;
    currentY = 0;
}

// 滑動關閉
function slideClose() {
    bottomSheet.style.transition = 'transform 0.3s ease-out';
    bottomSheet.style.transform = 'translateX(-50%) translateY(100%)';
    overlay.style.transition = 'opacity 0.3s ease-out';
    overlay.style.opacity = '0';

    setTimeout(function() {
        overlay.classList.remove('is-visible');
        bottomSheet.classList.remove('is-visible');
        bottomSheet.style.transform = '';
        bottomSheet.style.transition = '';
        overlay.style.opacity = '';
        overlay.style.transition = '';
        destroyPicker();
        document.body.style.overflow = '';
    }, 300);
}

// 回彈
function snapBack() {
    bottomSheet.style.transition = 'transform 0.2s ease-out';
    bottomSheet.style.transform = '';
    overlay.style.transition = 'opacity 0.2s ease-out';
    overlay.style.opacity = '';
    setTimeout(function() {
        bottomSheet.style.transition = '';
        overlay.style.transition = '';
    }, 200);
}

// 銷毀 picker
function destroyPicker() {
    if (activePicker) {
        activePicker.destroy();
        activePicker = null;
    }
}

/**
 * 關閉日期選擇器彈窗（帶動畫）
 */
export function close() {
    if (!bottomSheet || !overlay) return;

    overlay.classList.add('is-closing');
    bottomSheet.classList.add('is-closing');

    setTimeout(function() {
        overlay.classList.remove('is-visible', 'is-closing');
        bottomSheet.classList.remove('is-visible', 'is-closing');
        bottomSheet.style.transform = '';
        destroyPicker();
        document.body.style.overflow = '';
    }, 300);
}

/**
 * 開啟日期選擇器彈窗
 * @param {Object} config - 設定物件
 * @param {string} config.preset - 預設類型：'birthday', 'memberCreated', 'accounting', 'orderManagement'
 * @param {Object} config.fields - 欄位物件，包含 year, month, day 三個 input 元素
 * @param {string} [config.imgPath='../img'] - 圖示路徑
 * @param {string} [config.title] - 標題
 * @param {string} [config.currentValue] - 初始值 (YYYY-MM-DD)
 * @param {string} [config.defaultDate] - 預設日期 (YYYY-MM-DD 或 'today')
 * @param {string} [config.minDate] - 最小日期 (YYYY-MM-DD)
 * @param {string} [config.maxDate] - 最大日期 (YYYY-MM-DD 或 'today')
 * @param {number} [config.minYear] - 最小年份
 * @param {number} [config.maxYear] - 最大年份
 */
export function open(config) {
    if (!bottomSheet || !overlay || !containerId) {
        console.error('DatePickerModal: 請先呼叫 init() 初始化');
        return;
    }

    const preset = config.preset;
    const fields = config.fields;
    const imgPath = config.imgPath || '../img';

    // 取得目前欄位值
    let currentValue = config.currentValue || null;
    if (!currentValue && fields.year.value && fields.month.value && fields.day.value) {
        currentValue = fields.year.value + '-' +
                       fields.month.value.padStart(2, '0') + '-' +
                       fields.day.value.padStart(2, '0');
    }

    // 建立 picker options
    const pickerOptions = {
        imgPath: imgPath,
        currentValue: currentValue,
        onConfirm: function(date) {
            if (date) {
                const parts = date.split('-');
                fields.year.value = parts[0];
                fields.month.value = parts[1];
                fields.day.value = parts[2];
                fields.year.classList.add('filled');
                fields.month.classList.add('filled');
                fields.day.classList.add('filled');
            }
            close();
        },
        onBack: function() {
            close();
        }
    };

    // 傳遞額外選項
    if (config.title) pickerOptions.title = config.title;
    if (config.defaultDate) pickerOptions.defaultDate = config.defaultDate;
    if (config.minDate) pickerOptions.minDate = config.minDate;
    if (config.maxDate) pickerOptions.maxDate = config.maxDate;
    if (config.minYear) pickerOptions.minYear = config.minYear;
    if (config.maxYear) pickerOptions.maxYear = config.maxYear;

    // 建立 picker
    activePicker = createDatePicker(containerId, preset, pickerOptions);

    // 禁止頁面滾動
    document.body.style.overflow = 'hidden';

    // 顯示 bottom sheet
    bottomSheet.style.transform = '';
    overlay.classList.add('is-visible');
    bottomSheet.classList.add('is-visible');
}

/**
 * 初始化 DatePickerModal
 * @param {Object} [config] - 設定物件
 * @param {string} [config.overlayId='date-picker-overlay'] - 遮罩層元素 ID
 * @param {string} [config.bottomSheetId='date-picker-bottom-sheet'] - Bottom Sheet 元素 ID
 * @param {string} [config.containerId='date-picker-container'] - Picker 容器元素 ID
 * @returns {Object|null} 返回 { open, close } 方法，失敗時返回 null
 */
export function init(config) {
    const settings = config || {};
    const overlayId = settings.overlayId || 'date-picker-overlay';
    const bottomSheetId = settings.bottomSheetId || 'date-picker-bottom-sheet';
    const cid = settings.containerId || 'date-picker-container';

    overlay = document.getElementById(overlayId);
    bottomSheet = document.getElementById(bottomSheetId);
    containerId = cid;

    if (!overlay) {
        console.error('DatePickerModal: 找不到 overlay 元素 #' + overlayId);
        return null;
    }

    if (!bottomSheet) {
        console.error('DatePickerModal: 找不到 bottomSheet 元素 #' + bottomSheetId);
        return null;
    }

    header = bottomSheet.querySelector('.bottom-sheet__header');

    if (!header) {
        console.error('DatePickerModal: 找不到 .bottom-sheet__header 元素');
        return null;
    }

    // 綁定 Header 拖曳事件
    header.addEventListener('touchstart', handleTouchStart);
    header.addEventListener('touchmove', handleTouchMove);
    header.addEventListener('touchend', handleTouchEnd);
    header.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    // 點擊遮罩關閉
    overlay.addEventListener('click', close);

    return {
        open: open,
        close: close
    };
}

/**
 * DatePickerModal 物件
 */
export const DatePickerModal = {
    init,
    open,
    close
};

export default DatePickerModal;
