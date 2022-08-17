
import { useTmpiniaStore } from "@/tmui/tool/lib/tmpinia";

const tmStore = useTmpiniaStore();


export const onChangeDark = () => {
    tmStore.setTmVuetifyDark(!tmStore.tmStore.dark);
};

export const IsDark = () => {
    return tmStore.tmStore.dark;
};

export default {
    onChangeDark,
};