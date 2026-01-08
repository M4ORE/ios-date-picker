import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';

const banner = `/**
 * iOS Date Picker v1.0.0
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
        external: ['vanilla-calendar-pro'],
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
            globals: {
                'vanilla-calendar-pro': 'VanillaCalendar'
            }
        },
        external: ['vanilla-calendar-pro'],
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
            globals: {
                'vanilla-calendar-pro': 'VanillaCalendar'
            }
        },
        external: ['vanilla-calendar-pro'],
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
