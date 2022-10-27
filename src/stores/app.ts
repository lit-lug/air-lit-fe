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

    const NavBarColorReset = () => {
      if (darkMode.value) {
        uni.setNavigationBarColor({
          backgroundColor: "#050505",
          frontColor: "#ffffff",
          animation: {
            duration: 400,
            timingFunc: "easeIn",
          },
        });

        uni.setTabBarStyle({
          backgroundColor: "#000000",
          borderStyle: "black",
          color: "#ffffff",
          selectedColor: "#ffffff",
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

        uni
          .setTabBarStyle({
            backgroundColor: "#ffffff",
            borderStyle: "white",
            color: "#000000",
            selectedColor: "#000000",
          })
      }
    }

    const setDarkMode = (mode: boolean) => {
      darkMode.value = mode
      NavBarColorReset()
    }

    return {
      setDarkMode,
      darkMode,
      NavBarColorReset,
      statusBarHeight,
      customBarHeight,
      menuButtonBounding,
    }
  })

// Need to be used outside the setup
export function useAppStoreWidthOut() {
  return useAppStore(pinia)
}
