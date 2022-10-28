import { pinia } from '~/modules/pinia'
import type { UNotifyOptions } from '~/components/UnoUI/UNotify/types'
import type { UToastOptions } from '~/components/UnoUI/UToast/types'

export const usePageStore = defineStore(
  'page',
  () => {
    const showBackAction = ref(false)
    const showCustomAction = ref(false)
    const pageTitle = ref('')
    const notifyRef = ref<{ handleShowNotify: (options: UNotifyOptions) => {} }>()
    const toastRef = ref<{ handleShowToast: (options: UToastOptions) => {} }>()

    // const setPageConfig = (config: PageConfig) => {
    //   const {
    //     showBackAction: _showBackAction = false,
    //     // showCustomAction: _showCustomAction = false, pageTitle: _pageTitle = '',
    //   } = config

    //   showBackAction.value = _showBackAction
    //   // showCustomAction.value = _showCustomAction
    //   // pageTitle.value = _pageTitle
    // }

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
