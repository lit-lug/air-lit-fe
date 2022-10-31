import { pinia } from '~/modules/pinia'
import type { UNotifyOptions } from '~/components/UnoUI/UNotify/types'
import type { UToastOptions } from '~/components/UnoUI/UToast/types'

export const usePageStore = defineStore(
  'page',
  () => {
    const notifyRef = ref<{ handleShowNotify: (options: UNotifyOptions) => {} }>()
    const toastRef = ref<{ handleShowToast: (options: UToastOptions) => {} }>()


    const showNotify = (options: UNotifyOptions) => notifyRef.value!.handleShowNotify(options)

    const showToast = (options: UToastOptions) => toastRef.value!.handleShowToast(options)

    return {
      notifyRef,
      toastRef,
      showNotify,
      showToast,
    }
  })

// Need to be used outside the setup
export function usePageStoreWidthOut() {
  return usePageStore(pinia)
}
