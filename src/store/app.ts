import { pinia } from '@/modules/pinia'
import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'


// interface MenuButtonBoundingClientRect {
//     width: number
//     height: number
//     top: number
//     left: number
//     right: number
//     bottom: number
// }

export const useAppStore = defineStore(
    'app',
    () => {
        const userInfo = ref<UserInfo>(uni.getStorageSync('userInfo') as UserInfo)
        const token = ref<string>(uni.getStorageSync('token') as string)

        const setUserInfo = (ui: UserInfo) => {
            uni.setStorageSync('userInfo', userInfo.value)
            userInfo.value = ui
        }

        // const getUserInfo = computed(() => {
        //     return userInfo.value
        // })

        const setToken = (tk: string) => {
            uni.setStorageSync('token', token.value)
            token.value = tk
        }


        // watch(
        //     () => userInfo.value,
        //     () => token.value
        // )

        // const getToken = computed(() => {
        //     return token.value
        // })

        return {
            userInfo,
            token,
            setUserInfo,
            setToken,
        }
    })

// Need to be used outside the setup
export function useAppStoreWidthOut() {
    return useAppStore(pinia)
}