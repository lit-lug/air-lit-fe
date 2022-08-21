import { language } from './../tmui/tool/lib/language';
import { pinia } from '@/modules/pinia'
import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'


export const useAppStore = defineStore(
    'app',
    () => {

        // user
        const userInfo = ref<UserInfo>(uni.getStorageSync('user_info') as UserInfo)
        const token = ref<string>(uni.getStorageSync('token'))

        // tabBar
        const mineCountMsg = ref("");
        const mineCountColor = ref("red");

        // setting
        const languageType = ref<string>(uni.getStorageSync('language'))


        const setLanguageType = (lang: string) => {
            if (lang.startsWith('zh')) {
                languageType.value = 'zh-Hans'
            } else {
                languageType.value = 'en'
            }
            console.log("languageType", languageType.value);
            uni.setLocale(languageType.value)
            uni.setStorageSync('language', languageType.value)
        }

        const setUserInfo = (ui: UserInfo) => {
            userInfo.value = ui
            uni.setStorageSync('user_info', userInfo.value)

            // set tabBar mineCount
            if (!isAuth.value || (userInfo.value.is_bind_sec && !userInfo.value.is_need_update)) {
                mineCountMsg.value = "";
            }

            if (!userInfo.value.is_bind_sec) {
                mineCountMsg.value = language('mine.tab.needBind');
                mineCountColor.value = "red";
            }
            if (userInfo.value.is_need_update) {
                mineCountMsg.value = language('mine.tab.needUpdate');
                mineCountColor.value = "blue";
            }
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
            mineCountMsg,
            mineCountColor,
            languageType,
            setLanguageType,
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