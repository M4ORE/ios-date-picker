/**
 * iOS Date Picker
 * Copyright (c) 2025-present M4ORE Inc.
 * Licensed under MIT License
 *
 * @module @m4ore/ios-date-picker
 * @requires vanilla-calendar-pro@^2.9.0
 *
 * @example
 * // ES Module
 * import { IOSDatePicker, createDatePicker, DatePickerModal } from '@m4ore/ios-date-picker';
 * import '@m4ore/ios-date-picker/css';
 *
 * // 基本使用
 * const picker = new IOSDatePicker('container-id', { title: '選擇日期' });
 *
 * // 使用預設配置
 * const picker = createDatePicker('container-id', 'birthday', {
 *   onConfirm: (date) => console.log(date)
 * });
 *
 * // 彈窗模式
 * DatePickerModal.init();
 * DatePickerModal.open({ preset: 'birthday', fields: { year, month, day } });
 */

// 核心元件
export { IOSDatePicker, default as IOSDatePickerDefault } from './ios-date-picker.js';

// 預設配置
export { DatePickerPresets, createDatePicker } from './date-picker-presets.js';

// 彈窗模式
export { DatePickerModal, init, open, close } from './date-picker-modal.js';

// 版本資訊
export const VERSION = '1.0.0';
