import { pinia } from '~/modules/pinia'
import pages from "~/pages.json";


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


    // const currentPage = computed(() => {
    //   const pages = getCurrentPages()

    //   console.log(pages)

    //   return pages.pop()?.route
    // })

    // watch(getCurrentPages(), (newPage) => {
    //   console.log(newPage)
    // })


    const NavBarColorReset = () => {

      // 获取当前页面
      const currentPage = getCurrentPages().pop();

      // 判断是否为tab
      const isTabPage = pages.tabBar.list.some((item) => item.pagePath === currentPage?.route);

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

      if (isTabPage) {

        if (darkMode.value) {
          uni.setTabBarStyle({
            backgroundColor: "#222222",
            borderStyle: "black",
            color: "#ffffff",
            selectedColor: "#ffffff",
          });
        } else {
          uni.setTabBarStyle({
            backgroundColor: "#ffffff",
            borderStyle: "white",
            color: "#222222",
            selectedColor: "#000000",
          });
        }
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
