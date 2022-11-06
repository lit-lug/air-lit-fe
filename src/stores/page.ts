import { pinia } from '~/modules/pinia'
import type { UNotifyOptions } from '~/components/UnoUI/UNotify/types'
import type { UToastOptions } from '~/components/UnoUI/UToast/types'
import type { UMsgOptions } from '~/components/UnoUI/UMsg/types'

export const usePageStore = defineStore(
  'page',
  () => {

    const deviceType = ref('')

    const setDeviceType = (dt: string) => {
      deviceType.value = dt
    }

    const notifyRef = ref<{ handleShowNotify: (options: UNotifyOptions) => {} }>()
    const toastRef = ref<{ handleShowToast: (options: UToastOptions) => {} }>()
    const msgRef = ref<{ handleShowMsg: (options: UMsgOptions) => {} }>()

    const showNotify = (options: UNotifyOptions) => notifyRef.value!.handleShowNotify(options)

    const showToast = (options: UToastOptions) => toastRef.value!.handleShowToast(options)

    const showMsg = (options: UMsgOptions) => msgRef.value!.handleShowMsg(options)

    return {
      notifyRef,
      toastRef,
      msgRef,
      deviceType,
      showNotify,
      showToast,
      showMsg,
      setDeviceType
    }
  })

// Need to be used outside the setup
export function usePageStoreWidthOut() {
  return usePageStore(pinia)
}
