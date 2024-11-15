import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                primary: {
                    DEFAULT: '#3853A3', // اللون الرئيسي
                    70: '#5C7AB3',      // اللون بنسبة 70%
                    50: '#879ECB',      // اللون بنسبة 50%
                    20: '#D0D7EB',      // اللون بنسبة 20%
                },
                secondary: {
                    DEFAULT: '#657452', // اللون الرئيسي الثاني
                    70: '#8A9473',      // اللون بنسبة 70%
                    50: '#A9B596',      // اللون بنسبة 50%
                    20: '#E0E4D8',      // اللون بنسبة 20%
                },
                accent: {
                    DEFAULT: '#F0A122', // لون الإبراز
                    70: '#F3B84E',      // اللون بنسبة 70%
                    50: '#F6CD7A',      // اللون بنسبة 50%
                    20: '#FCE9CC',      // اللون بنسبة 20%
                },
                danger: {
                    DEFAULT: '#8D1828', // اللون الأحمر (للتحذيرات)
                    70: '#A94452',      // اللون بنسبة 70%
                    50: '#C07882',      // اللون بنسبة 50%
                    20: '#E9D3D6',      // اللون بنسبة 20%
                },
            },
        },
    },

    plugins: [forms],
};
