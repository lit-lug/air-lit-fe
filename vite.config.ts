import { defineConfig } from "vite";
import uni from "@dcloudio/vite-plugin-uni";
import WindiCSS from 'vite-plugin-windicss';
import MiniProgramTailwind from '@dcasia/mini-program-tailwind-webpack-plugin/rollup';
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
    root: process.cwd(),
    resolve: {
        alias: {
            '@/': `${path.resolve(__dirname, 'src')}/`,
            '#/': `${path.resolve(__dirname, 'types')}/`,
        },
    },
    plugins: [
        uni(),
        WindiCSS(),
        MiniProgramTailwind(),
    ]
});
