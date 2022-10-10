
import { useTmpiniaStore } from "@/tmui/tool/lib/tmpinia";

const tmStore = useTmpiniaStore();


export const onChangeDark = () => {
    tmStore.setTmVuetifyDark(!tmStore.tmStore.dark);
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
    // console.log("1", tmStore.tmStore.dark);
    return tmStore.tmStore.dark;
};

export default {
    onChangeDark,
};