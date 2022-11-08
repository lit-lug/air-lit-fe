import { createSSRApp } from 'vue'
import App from './App.vue'

import { setupPinia } from '~/modules/pinia'

import 'uno.css'

// #ifdef H5
import { registerSW } from 'virtual:pwa-register'

registerSW({
  // 每小时检查一次
  onRegistered: r => r && setInterval(async () => await r.update(), 3600000),
  // 注册失败则报错到 console
  onRegisterError: error => console.error(error)
})
// #endif

export function createApp() {
  const app = createSSRApp(App)

  // Configure store
  // https://pinia.vuejs.org/
  setupPinia(app)

  return { app }
}
