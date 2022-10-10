
import { useTmpiniaStore } from "@/tmui/tool/lib/tmpinia";

const tmStore = useTmpiniaStore();


export const onChangeDark = () => {
    tmStore.setTmVuetifyDark(!tmStore.tmStore.dark);
};

export const FixNavigationBar = () => {
    if (isDark()) {
        uni.setNavigationBarColor({
            backgroundColor: '#050505',
            frontColor: "#ffffff",
        });
    } else {
        uni.setNavigationBarColor({
            backgroundColor: '#ffffff',
            frontColor: "#000000",
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