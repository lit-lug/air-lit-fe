import { createSSRApp } from "vue";
import App from "./App.vue";
// modules
import { setupPinia } from '@/modules/pinia'

import tmui from "./tmui"

export function createApp() {
  const app = createSSRApp(App);
  setupPinia(app)
  app.use(tmui)
  return {
    app,
  };
}
