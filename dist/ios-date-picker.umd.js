/**
 * iOS Date Picker v2.0.0
 * Copyright (c) 2026-present M4ORE Inc.
 * Licensed under MIT License
 *
 * @requires vanilla-calendar-pro@^2.9.0
 */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.IOSDatePickerLib = {}));
})(this, (function (exports) { 'use strict';

    /**
     * iOS Date Picker
     * Copyright (c) 2026-present M4ORE Inc.
     * Licensed under MIT License
     *
     * @module @m4ore/ios-date-picker
     * @requires vanilla-calendar-pro@^2.9.0
     */

    class IOSDatePicker {
        constructor(containerId, options = {}) {
            this.container = document.getElementById(containerId);
            if (!this.container) {
                throw new Error(`找不到容器元素: ${containerId}`);
            }

            this.options = {
                title: '選擇日期',
                defaultDate: this._getTodayString(),
                currentValue: null,
                minYear: 1900,
                maxYear: new Date().getFullYear() + 10,
                maxDate: null,
                minDate: null,
                selectionMode: 'single',
                imgPath: '../img',
                onConfirm: null,
                onBack: null,
                onDateChange: null,
                ...options
            };

            if (this.options.maxDate === 'today') {
                this.options.maxDate = this._getTodayString();
            }

            this._initDate = this.options.currentValue || this.options.defaultDate;
            if (this._initDate === 'today') {
                this._initDate = this._getTodayString();
            }

            const parsed = this._parseDate(this._initDate);
            this.currentYear = parsed.year;
            this.currentMonth = parsed.month;
            this.selectedDate = this._initDate;

            this.calendar = null;
            this.picker = null;

            this._init();
        }

        _getTodayString() {
            const today = new Date();
            return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
        }

        _parseDate(dateStr) {
            const [year, month, day] = dateStr.split('-').map(Number);
            return { year, month, day };
        }

        _canNavigateTo(year, month) {
            if (this.options.minDate) {
                const min = this._parseDate(this.options.minDate);
                if (year < min.year) return false;
                if (year === min.year && month < min.month) return false;
            } else {
                if (year < this.options.minYear) return false;
                if (year === this.options.minYear && month < 1) return false;
            }

            if (this.options.maxDate) {
                const max = this._parseDate(this.options.maxDate);
                if (year > max.year) return false;
                if (year === max.year && month > max.month) return false;
            }

            return true;
        }

        _updateNavButtons() {
            const prevBtn = this.container.querySelector('.picker-prev-month');
            const nextBtn = this.container.querySelector('.picker-next-month');

            let prevYear = this.currentYear;
            let prevMonth = this.currentMonth - 1;
            if (prevMonth < 1) {
                prevMonth = 12;
                prevYear--;
            }

            if (this._canNavigateTo(prevYear, prevMonth)) {
                prevBtn.classList.remove('disabled');
            } else {
                prevBtn.classList.add('disabled');
            }

            let nextYear = this.currentYear;
            let nextMonth = this.currentMonth + 1;
            if (nextMonth > 12) {
                nextMonth = 1;
                nextYear++;
            }

            if (this._canNavigateTo(nextYear, nextMonth)) {
                nextBtn.classList.remove('disabled');
            } else {
                nextBtn.classList.add('disabled');
            }
        }

        _init() {
            this._renderHTML();
            this._initCalendar();
            this._initYearMonthPicker();
            this._bindEvents();
            this._updateYearMonthDisplay();
            this._updateNavButtons();
        }

        _renderHTML() {
            const uniqueId = `picker-${Date.now()}`;
            const imgPath = this.options.imgPath || '../img';

            this.container.innerHTML = `
            <div class="ios-date-picker">
                <div class="picker-nav">
                    <div class="picker-nav-back"><img src="${imgPath}/arrow_left.svg" alt="返回"></div>
                    <div class="picker-nav-title">${this.options.title}</div>
                    <div class="picker-nav-confirm">確認</div>
                </div>
                <div class="picker-header">
                    <div class="picker-year-month" data-trigger="year-month">
                        <span class="picker-year-month-text"></span>
                        <span class="picker-dropdown-arrow"><img src="${imgPath}/arrow_right.png" alt="展開"></span>
                    </div>
                    <div class="picker-month-nav">
                        <div class="picker-month-nav-btn picker-prev-month"><img src="${imgPath}/arrow_left_2.png" alt="上個月"></div>
                        <div class="picker-month-nav-btn picker-next-month"><img src="${imgPath}/arrow_right.png" alt="下個月"></div>
                    </div>
                </div>
                <div class="picker-wheel-container" id="${uniqueId}-wheel"></div>
                <div class="picker-calendar" id="${uniqueId}-calendar"></div>
                <div class="picker-anchor" id="${uniqueId}-anchor"></div>
            </div>
        `;

            this._calendarId = `${uniqueId}-calendar`;
            this._anchorId = `${uniqueId}-anchor`;
            this._wheelContainerId = `${uniqueId}-wheel`;
        }

        _initCalendar() {
            if (typeof VanillaCalendar === 'undefined') {
                throw new Error('請先載入 Vanilla Calendar Pro 套件 (npm install vanilla-calendar-pro@^2.9.0)');
            }

            this.calendar = new VanillaCalendar(`#${this._calendarId}`, {
                type: 'default',
                settings: {
                    lang: 'zh-TW',
                    iso8601: false,
                    selection: {
                        day: this.options.selectionMode === 'single' ? 'single' : 'multiple'
                    },
                    selected: {
                        dates: [this.selectedDate],
                        month: this.currentMonth - 1,
                        year: this.currentYear
                    },
                    visibility: {
                        theme: 'light',
                        daysOutside: false
                    },
                    range: {
                        disableGaps: false,
                        max: this.options.maxDate || undefined,
                        min: this.options.minDate || '1900-01-01'
                    }
                },
                date: {
                    min: this.options.minDate || '1900-01-01',
                    max: this.options.maxDate || '2470-12-31'
                },
                locale: {
                    weekday: ['週日', '週一', '週二', '週三', '週四', '週五', '週六']
                },
                actions: {
                    clickDay: (e, self) => {
                        let selectedDate = null;

                        if (e && e.target) {
                            const btn = e.target.closest('.vanilla-calendar-day__btn');
                            if (btn) {
                                selectedDate = btn.dataset.calendarDay;
                            }
                        }

                        if (!selectedDate && self.selectedDates && self.selectedDates.length > 0) {
                            selectedDate = self.selectedDates[self.selectedDates.length - 1];
                        }

                        if (selectedDate) {
                            this.selectedDate = selectedDate;
                            self.selectedDates = [selectedDate];
                            this.calendar.settings.selected.dates = [selectedDate];
                            if (typeof this.options.onDateChange === 'function') {
                                this.options.onDateChange(this.selectedDate);
                            }
                        }
                    }
                }
            });

            this.calendar.init();
        }

        _initYearMonthPicker() {
            const years = [];

            const minYear = this.options.minDate
                ? this._parseDate(this.options.minDate).year
                : this.options.minYear;

            const maxYear = this.options.maxDate
                ? this._parseDate(this.options.maxDate).year
                : this.options.maxYear;

            for (let i = minYear; i <= maxYear; i++) {
                years.push({ id: i, value: i + '年' });
            }

            const months = [];
            for (let i = 1; i <= 12; i++) {
                months.push({ id: i, value: i + '月' });
            }

            this._yearsData = years;
            this._monthsData = months;

            const wheelContainer = document.getElementById(this._wheelContainerId);
            wheelContainer.innerHTML = `
            <div class="picker-wheel-wrapper">
                <div class="picker-wheel-body">
                    <div class="picker-wheel-highlight"></div>
                    <div class="picker-wheel-column picker-wheel-year"></div>
                    <div class="picker-wheel-column picker-wheel-month"></div>
                </div>
            </div>
        `;

            this._renderWheelOptions();
            this._bindWheelEvents();
        }

        _renderWheelOptions() {
            const yearColumn = this.container.querySelector('.picker-wheel-year');
            const monthColumn = this.container.querySelector('.picker-wheel-month');

            yearColumn.innerHTML = this._yearsData.map(y =>
                `<div class="picker-wheel-item" data-id="${y.id}">${y.value}</div>`
            ).join('');

            monthColumn.innerHTML = this._monthsData.map(m =>
                `<div class="picker-wheel-item" data-id="${m.id}">${m.value}</div>`
            ).join('');

            this._scrollToSelected();
        }

        _scrollToSelected() {
            const yearColumn = this.container.querySelector('.picker-wheel-year');
            const monthColumn = this.container.querySelector('.picker-wheel-month');

            const yearIndex = this._yearsData.findIndex(y => y.id === this.currentYear);
            const monthIndex = this.currentMonth - 1;
            const itemHeight = 40;

            yearColumn.scrollTop = yearIndex * itemHeight;
            monthColumn.scrollTop = monthIndex * itemHeight;

            this._updateWheelSelection();
        }

        _updateWheelSelection() {
            const yearColumn = this.container.querySelector('.picker-wheel-year');
            const monthColumn = this.container.querySelector('.picker-wheel-month');

            const itemHeight = 40;
            const yearIndex = Math.round(yearColumn.scrollTop / itemHeight);
            const monthIndex = Math.round(monthColumn.scrollTop / itemHeight);

            yearColumn.querySelectorAll('.picker-wheel-item').forEach((item, i) => {
                item.classList.toggle('active', i === yearIndex);
            });
            monthColumn.querySelectorAll('.picker-wheel-item').forEach((item, i) => {
                item.classList.toggle('active', i === monthIndex);
            });

            this._tempYear = this._yearsData[yearIndex]?.id || this.currentYear;
            this._tempMonth = this._monthsData[monthIndex]?.id || this.currentMonth;
        }

        _bindWheelEvents() {
            const yearColumn = this.container.querySelector('.picker-wheel-year');
            const monthColumn = this.container.querySelector('.picker-wheel-month');

            let scrollTimeout;
            const handleScroll = () => {
                clearTimeout(scrollTimeout);
                scrollTimeout = setTimeout(() => {
                    this._updateWheelSelection();
                    this._snapToItem(yearColumn);
                    this._snapToItem(monthColumn);
                }, 100);
            };

            yearColumn.addEventListener('scroll', handleScroll);
            monthColumn.addEventListener('scroll', handleScroll);
        }

        _snapToItem(column) {
            const itemHeight = 40;
            const targetScroll = Math.round(column.scrollTop / itemHeight) * itemHeight;
            column.scrollTo({ top: targetScroll, behavior: 'smooth' });
        }

        _showWheelPicker() {
            const wheelContainer = document.getElementById(this._wheelContainerId);
            wheelContainer.classList.add('show');
            this._scrollToSelected();
        }

        _hideWheelPicker() {
            const wheelContainer = document.getElementById(this._wheelContainerId);
            wheelContainer.classList.remove('show');
            this.container.querySelector('.picker-year-month').classList.remove('active');
        }

        _bindEvents() {
            const picker = this.container.querySelector('.ios-date-picker');

            picker.querySelector('.picker-year-month').addEventListener('click', () => {
                const trigger = this.container.querySelector('.picker-year-month');
                trigger.classList.add('active');
                this._showWheelPicker();
            });

            picker.querySelector('.picker-prev-month').addEventListener('click', () => {
                this._navigateMonth(-1);
            });

            picker.querySelector('.picker-next-month').addEventListener('click', () => {
                this._navigateMonth(1);
            });

            picker.querySelector('.picker-nav-confirm').addEventListener('click', () => {
                if (this._isWheelVisible()) {
                    this._confirmWheelSelection();
                } else {
                    if (typeof this.options.onConfirm === 'function') {
                        this.options.onConfirm(this.selectedDate);
                    }
                }
            });

            picker.querySelector('.picker-nav-back').addEventListener('click', () => {
                if (this._isWheelVisible()) {
                    this._hideWheelPicker();
                } else {
                    if (typeof this.options.onBack === 'function') {
                        this.options.onBack();
                    }
                }
            });
        }

        _isWheelVisible() {
            const wheelContainer = document.getElementById(this._wheelContainerId);
            return wheelContainer && wheelContainer.classList.contains('show');
        }

        _confirmWheelSelection() {
            this._updateWheelSelection();

            this.currentYear = this._tempYear;
            this.currentMonth = this._tempMonth;

            this._updateCalendarView();
            this._updateYearMonthDisplay();
            this._updateNavButtons();
            this._hideWheelPicker();
        }

        _navigateMonth(delta) {
            let newMonth = this.currentMonth + delta;
            let newYear = this.currentYear;

            if (newMonth < 1) {
                newMonth = 12;
                newYear--;
            } else if (newMonth > 12) {
                newMonth = 1;
                newYear++;
            }

            if (!this._canNavigateTo(newYear, newMonth)) {
                return;
            }

            this.currentYear = newYear;
            this.currentMonth = newMonth;

            this._updateCalendarView();
            this._updateYearMonthDisplay();
            this._updateNavButtons();
        }

        _updateCalendar() {
            this.calendar.selectedMonth = this.currentMonth - 1;
            this.calendar.selectedYear = this.currentYear;
            this.calendar.settings.selected.month = this.currentMonth - 1;
            this.calendar.settings.selected.year = this.currentYear;
            this.calendar.settings.selected.dates = [this.selectedDate];
            this.calendar.init();
        }

        _updateCalendarView() {
            const currentSelectedDate = this.selectedDate;

            this.calendar.selectedMonth = this.currentMonth - 1;
            this.calendar.selectedYear = this.currentYear;
            this.calendar.settings.selected.month = this.currentMonth - 1;
            this.calendar.settings.selected.year = this.currentYear;
            this.calendar.settings.selected.dates = [currentSelectedDate];

            this.calendar.init();
            this.selectedDate = currentSelectedDate;
        }

        _updateYearMonthDisplay() {
            const textEl = this.container.querySelector('.picker-year-month-text');
            textEl.textContent = `${this.currentYear}年${this.currentMonth}月`;
        }

        getSelectedDate() {
            return this.selectedDate;
        }

        setSelectedDate(dateStr) {
            const parsed = this._parseDate(dateStr);
            this.currentYear = parsed.year;
            this.currentMonth = parsed.month;
            this.selectedDate = dateStr;

            this._updateCalendar();
            this._updateYearMonthDisplay();
            this._updateNavButtons();
        }

        destroy() {
            this.container.innerHTML = '';
        }
    }

    /**
     * iOS Date Picker
     * Copyright (c) 2026-present M4ORE Inc.
     * Licensed under MIT License
     *
     * @module @m4ore/ios-date-picker/presets
     */


    /**
     * 預設配置
     */
    const DatePickerPresets = {
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
    function createDatePicker(containerId, presetType, customOptions = {}) {
        if (!DatePickerPresets[presetType]) {
            console.warn(`未知的預設類型: ${presetType}，將使用空白配置`);
        }

        const options = {
            ...DatePickerPresets[presetType],
            ...customOptions
        };

        return new IOSDatePicker(containerId, options);
    }

    /**
     * iOS Date Picker
     * Copyright (c) 2026-present M4ORE Inc.
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
    function close() {
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
    function open(config) {
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
    function init(config) {
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
    const DatePickerModal = {
        init,
        open,
        close
    };

    /**
     * iOS Date Picker
     * Copyright (c) 2026-present M4ORE Inc.
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


    // 版本資訊
    const VERSION = '2.0.0';

    exports.DatePickerModal = DatePickerModal;
    exports.DatePickerPresets = DatePickerPresets;
    exports.IOSDatePicker = IOSDatePicker;
    exports.IOSDatePickerDefault = IOSDatePicker;
    exports.VERSION = VERSION;
    exports.close = close;
    exports.createDatePicker = createDatePicker;
    exports.init = init;
    exports.open = open;

}));
//# sourceMappingURL=ios-date-picker.umd.js.map
