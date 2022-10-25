
import { useAppStore } from "@/store/app";
import { useCourseStore } from "@/store/course";
import { useTmpiniaStore } from "@/tmui/tool/lib/tmpinia";
import { GetStatus, GetUserInfo } from "./api";

const tmStore = useTmpiniaStore();

const appStore = useAppStore();

const courseStore = useCourseStore();

const { isAuth } = storeToRefs(appStore);

export const onChangeDark = () => {
    tmStore.setTmVuetifyDark(!tmStore.tmStore.dark);
    FixNavigationBarColor();
};


export const FixNavigationBarColor = () => {
    if (isDark()) {
        uni.setNavigationBarColor({
            backgroundColor: '#050505',
            frontColor: "#ffffff",
            animation: {
                duration: 400,
                timingFunc: 'easeIn'
            }

        });
    } else {
        uni.setNavigationBarColor({
            backgroundColor: '#ffffff',
            frontColor: "#000000",
            animation: {
                duration: 400,
                timingFunc: 'easeIn'
            }
        });
    }
};

export const isDark = () => {
    return tmStore.tmStore.dark;
};


export const UpdateBaseInfo = async (load = false) => {
    // 设置开学时间
    const { data: status } = await GetStatus();
    if (status) {
        courseStore.setStartDay(status.time);
    }

    if (isAuth.value) {
        // 更新用户认证信息
        const { data: authInfo } = await GetUserInfo(load);
        if (authInfo) {
            // 同步用户信息
            appStore.setUserInfo(authInfo);
        }
    }


}