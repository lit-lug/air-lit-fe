<script lang="ts" setup>
import tmTabbar from "@/tmui/components/tm-tabbar/tm-tabbar.vue";
import tmTabbarItem from "@/tmui/components/tm-tabbar-item/tm-tabbar-item.vue";
import { language } from "@/tmui/tool/lib/language";
import { useAppStore } from "@/store/app";
// import { storeToRefs } from "pinia";

const appStore = useAppStore();

const { mineCountMsg, mineCountColor } = storeToRefs(appStore);

const props = defineProps<{
  // 当前激活的tabbarItem的index
  active: number;
}>();

const beforeClick = (index: number) => {
  return props.active !== index;
};

onMounted(() => {
  // uni.showNavigationBarLoading();
});
</script>

<template>
  <tm-tabbar
    blur
    :bottom="0"
    :round="16"
    :auto-select="false"
    :active="props.active"
    :shadow="8"
  >
    <tm-tabbar-item
      activeColor="primary"
      :beforeClick="beforeClick"
      :data="0"
      blur
      :active="props.active === 0"
      open-type="switchTab"
      url="/pages/index/index"
      :text="language('index.nav.title')"
      icon="tmicon-lightbulb"
    ></tm-tabbar-item>
    <tm-tabbar-item
      url="/pages/schedule/schedule"
      :text="language('schedule.nav.title')"
      blur
      :beforeClick="beforeClick"
      :data="1"
      open-type="switchTab"
      icon="tmicon-calendar-alt"
    ></tm-tabbar-item>
    <tm-tabbar-item
      url="/pages/mine/mine"
      :text="language('mine.nav.title')"
      :beforeClick="beforeClick"
      :count="mineCountMsg"
      :dotColor="mineCountColor"
      :data="2"
      blur
      open-type="switchTab"
      icon="tmicon-account"
    ></tm-tabbar-item>
  </tm-tabbar>
</template>
