
import { useTmpiniaStore } from "@/tmui/tool/lib/tmpinia";

const tmStore = useTmpiniaStore();


export const onChangeDark = () => {
    tmStore.setTmVuetifyDark(!tmStore.tmStore.dark);
};

export const isDark = () => {
    return tmStore.tmStore.dark;
};

export default {
    onChangeDark,
};