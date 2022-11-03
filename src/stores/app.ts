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

    // user
    const userInfo = ref<UserInfo>(uni.getStorageSync('user_info') as UserInfo)
    const token = ref<string>(uni.getStorageSync('token'))

    const setUserInfo = (ui: UserInfo) => {
      userInfo.value = ui
      uni.setStorageSync('user_info', userInfo.value)
    }


    const isAuth = computed(() => {
      return !!token.value
    })

    const setToken = (tk: string) => {
      token.value = tk
      uni.setStorageSync('token', token.value)
    }


    const statusBarHeight = ref(0)
    const menuButtonBounding = ref<MenuButtonBoundingClientRect>()
    const customBarHeight = computed(
      () => !menuButtonBounding.value
        ? 0
        : menuButtonBounding.value.bottom + menuButtonBounding.value.top - statusBarHeight.value)



    const NavBarColorReset = () => {

      // ifdef MP-WEIXIN

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
            backgroundColor: "#151515",
            borderStyle: "white",
            color: "#999999",
            selectedColor: "#3B82F6",
          });
        } else {
          uni.setTabBarStyle({
            backgroundColor: "#ffffff",
            borderStyle: "black",
            color: "#999999",
            selectedColor: "#3B82F6",
          });
        }
      }

      // endif

    }

    const setDarkMode = (mode: boolean) => {
      darkMode.value = mode
      NavBarColorReset()
    }

    return {
      setDarkMode,
      setUserInfo,
      userInfo,
      isAuth,
      setToken,
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
