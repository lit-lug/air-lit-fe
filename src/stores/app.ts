import { pinia } from '~/modules/pinia'

interface MenuButtonBoundingClientRect {
  width: number
  height: number
  top: number
  left: number
  right: number
  bottom: number
}

export const useAppStore = defineStore(
  'app',
  () => {
    const darkMode = ref(false)

    const statusBarHeight = ref(0)
    const menuButtonBounding = ref<MenuButtonBoundingClientRect>()
    const customBarHeight = computed(
      () => !menuButtonBounding.value
        ? 0
        : menuButtonBounding.value.bottom + menuButtonBounding.value.top - statusBarHeight.value)

    const resetNavBarColor = () => {
      if (darkMode.value) {
        uni.setNavigationBarColor({
          backgroundColor: "#050505",
          frontColor: "#ffffff",
          animation: {
            duration: 400,
            timingFunc: "easeIn",
          },
        });
      } else {
        uni.setNavigationBarColor({
          backgroundColor: "#ffffff",
          frontColor: "#000000",
          animation: {
            duration: 400,
            timingFunc: "easeIn",
          },
        });
      }
    }

    const setDarkMode = (mode: boolean) => {
      darkMode.value = mode
      resetNavBarColor()
    }

    return {
      setDarkMode,
      darkMode,
      resetNavBarColor,
      statusBarHeight,
      customBarHeight,
      menuButtonBounding,
    }
  })

// Need to be used outside the setup
export function useAppStoreWidthOut() {
  return useAppStore(pinia)
}
