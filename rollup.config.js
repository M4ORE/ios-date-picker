import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';

const banner = `/**
 * iOS Date Picker v2.0.0
 * Copyright (c) 2025-present M4ORE Inc.
 * Licensed under MIT License
 *
 * @requires vanilla-calendar-pro@^2.9.0
 */`;

export default [
    // ESM build
    {
        input: 'src/index.js',
        output: {
            file: 'dist/ios-date-picker.esm.js',
            format: 'es',
            banner,
            sourcemap: true
        },
        plugins: [resolve()]
    },
    // UMD build (for browsers and CDN)
    {
        input: 'src/index.js',
        output: {
            file: 'dist/ios-date-picker.umd.js',
            format: 'umd',
            name: 'IOSDatePickerLib',
            banner,
            sourcemap: true,
            globals: {}
        },
        plugins: [resolve()]
    },
    // Minified UMD build (for CDN)
    {
        input: 'src/index.js',
        output: {
            file: 'dist/ios-date-picker.min.js',
            format: 'umd',
            name: 'IOSDatePickerLib',
            banner,
            sourcemap: true,
            globals: {}
        },
        plugins: [
            resolve(),
            terser({
                format: {
                    comments: /^!/
                }
            })
        ]
    }
];
