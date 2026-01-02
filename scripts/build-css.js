/**
 * CSS 建置腳本
 * 合併所有 CSS 檔案為單一輸出檔
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

// CSS 檔案清單（依序合併）
const cssFiles = [
    'src/ios-date-picker.css',
    'src/bottom-sheet.css'
];

// 確保 dist 目錄存在
const distDir = join(rootDir, 'dist');
if (!existsSync(distDir)) {
    mkdirSync(distDir, { recursive: true });
}

// 讀取並合併 CSS
const banner = `/**
 * iOS Date Picker v2.0.0
 * Copyright (c) 2025-present M4ORE Inc.
 * Licensed under MIT License
 *
 * @requires vanilla-calendar-pro@^2.9.0
 */

`;

let combinedCSS = banner;

for (const file of cssFiles) {
    const filePath = join(rootDir, file);
    try {
        const content = readFileSync(filePath, 'utf-8');
        combinedCSS += `/* ===== ${file} ===== */\n`;
        combinedCSS += content;
        combinedCSS += '\n\n';
        console.log(`✓ 已讀取: ${file}`);
    } catch (err) {
        console.error(`✗ 讀取失敗: ${file}`, err.message);
        process.exit(1);
    }
}

// 寫入合併後的 CSS
const outputPath = join(distDir, 'ios-date-picker.css');
writeFileSync(outputPath, combinedCSS, 'utf-8');
console.log(`\n✓ CSS 已輸出至: dist/ios-date-picker.css`);

// 建立壓縮版（簡易壓縮：移除註解和多餘空白）
const minifiedCSS = banner + combinedCSS
    .replace(banner, '')
    .replace(/\/\*[\s\S]*?\*\//g, '') // 移除多行註解
    .replace(/\s+/g, ' ')              // 合併空白
    .replace(/\s*{\s*/g, '{')          // 移除 { 前後空白
    .replace(/\s*}\s*/g, '}')          // 移除 } 前後空白
    .replace(/\s*;\s*/g, ';')          // 移除 ; 前後空白
    .replace(/\s*:\s*/g, ':')          // 移除 : 前後空白
    .replace(/\s*,\s*/g, ',')          // 移除 , 前後空白
    .trim();

const minOutputPath = join(distDir, 'ios-date-picker.min.css');
writeFileSync(minOutputPath, minifiedCSS, 'utf-8');
console.log(`✓ CSS 壓縮版已輸出至: dist/ios-date-picker.min.css`);