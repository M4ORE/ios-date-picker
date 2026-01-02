/**
 * iOS Date Picker
 * Copyright (c) 2025-present M4ORE Inc.
 * Licensed under MIT License
 *
 * @module @m4ore/ios-date-picker/presets
 */

import { IOSDatePicker } from './ios-date-picker.js';

/**
 * 預設配置
 */
export const DatePickerPresets = {
    // 生日：1900 ~ 今日，預設 2000/01/01
    birthday: {
        title: '生日',
        defaultDate: '2000-01-01',
        minYear: 1900,
        minDate: '1900-01-01',
        maxDate: 'today'
    },

    // 會員建立時間：2015 ~ 今日
    memberCreated: {
        title: '會員建立時間',
        defaultDate: 'today',
        minYear: 2015,
        maxDate: 'today'
    },

    // 帳務查詢
    accounting: {
        title: '帳務日期',
        defaultDate: 'today',
        minYear: 2015,
        maxDate: 'today',
        selectionMode: 'single'
    },

    // 訂單管理
    orderManagement: {
        title: '訂單日期',
        defaultDate: 'today',
        minYear: 2015,
        maxDate: 'today',
        selectionMode: 'single'
    }
};

/**
 * 建立日期選擇器
 * @param {string} containerId - 容器元素 ID
 * @param {string} presetType - 預設類型：'birthday', 'memberCreated', 'accounting', 'orderManagement'
 * @param {Object} customOptions - 自訂選項（會覆蓋預設值）
 * @returns {IOSDatePicker} 日期選擇器實例
 */
export function createDatePicker(containerId, presetType, customOptions = {}) {
    if (!DatePickerPresets[presetType]) {
        console.warn(`未知的預設類型: ${presetType}，將使用空白配置`);
    }

    const options = {
        ...DatePickerPresets[presetType],
        ...customOptions
    };

    return new IOSDatePicker(containerId, options);
}

export default {
    DatePickerPresets,
    createDatePicker
};
