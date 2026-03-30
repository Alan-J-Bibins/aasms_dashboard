// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
    vite: {
        plugins: [tailwindcss()]
    },
    fonts: [{
        provider: fontProviders.local(),
        name: "Satoshi",
        cssVariable: "--font-satoshi",
        options: {
            variants: [
                {
                    weight: 300,
                    style: "normal",
                    src: ["./public/fonts/Satoshi/Satoshi-Light.otf"]
                },
                {
                    weight: 300,
                    style: "italic",
                    src: ["./public/fonts/Satoshi/Satoshi-LightItalic.otf"]
                },
                {
                    weight: 400,
                    style: "normal",
                    src: ["./public/fonts/Satoshi/Satoshi-Regular.otf"]
                },
                {
                    weight: 400,
                    style: "italic",
                    src: ["./public/fonts/Satoshi/Satoshi-Italic.otf"]
                },
                {
                    weight: 500,
                    style: "normal",
                    src: ["./public/fonts/Satoshi/Satoshi-Medium.otf"]
                },
                {
                    weight: 500,
                    style: "italic",
                    src: ["./public/fonts/Satoshi/Satoshi-MediumItalic.otf"]
                },
                {
                    weight: 700,
                    style: "normal",
                    src: ["./public/fonts/Satoshi/Satoshi-Bold.otf"]
                },
                {
                    weight: 700,
                    style: "italic",
                    src: ["./public/fonts/Satoshi/Satoshi-BoldItalic.otf"]
                },
                {
                    weight: 900,
                    style: "normal",
                    src: ["./public/fonts/Satoshi/Satoshi-Black.otf"]
                },
                {
                    weight: 900,
                    style: "italic",
                    src: ["./public/fonts/Satoshi/Satoshi-BlackItalic.otf"]
                },
            ]
        }
    }]
});
