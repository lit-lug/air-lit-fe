import { resolve } from 'path'
import { defineConfig } from 'vite'

import Uni from '@dcloudio/vite-plugin-uni'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import mdLoader from 'vite-plugin-md-loader';
// import { VitePWA } from 'vite-plugin-pwa'
import Components from '@uni-helper/vite-plugin-uni-components'
import { AnoResolver } from 'ano-ui'



// https://vitejs.dev/config/
export default defineConfig({
  root: process.cwd(),
  resolve: {
    alias: {
      '~/': `${resolve(__dirname, 'src')}/`,
    },
  },
  plugins: [
    Uni(),
    mdLoader(),
    Components({
      resolvers: [AnoResolver()],
    }),
    // https://github.com/antfu/unocss
    // see unocss.config.ts for config
    UnoCSS(),
    // https://github.com/antfu/unplugin-auto-import
    AutoImport({
      imports: [
        'vue',
        'pinia',
        'uni-app',
      ],
      dts: 'src/auto-imports.d.ts',
      dirs: [
        'src/components',
        'src/stores',
      ],
      vueTemplate: true,
    })
  ],
})
