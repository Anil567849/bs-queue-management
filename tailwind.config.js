"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const theme_1 = require("@nextui-org/theme");
const config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
        "./node_modules/@nextui-org/theme/dist/components/(date-picker|dropdown|button|ripple|spinner|calendar|date-input|popover|menu|divider).js"
    ],
    theme: {
        extend: {
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
        },
    },
    plugins: [(0, theme_1.nextui)()],
};
exports.default = config;
