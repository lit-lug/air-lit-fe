import { pinia } from '@/modules/pinia'
import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'


export const useAppStore = defineStore(
    'app',
    () => {
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
            isAuth,
            setUserInfo,
            setToken,
        }
    })

// Need to be used outside the setup
export function useAppStoreWidthOut() {
    return useAppStore(pinia)
}