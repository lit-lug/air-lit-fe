<script lang="ts" setup>
import { useStore } from "@/store";
import { computed } from "vue";

import tmTabbar from "@/tmui/components/tm-tabbar/tm-tabbar.vue";
import tmTabbarItem from "@/tmui/components/tm-tabbar-item/tm-tabbar-item.vue";
import { onShow } from "@dcloudio/uni-app";

const store = useStore();

const props = defineProps<{
  // 当前激活的tabbarItem的index
  active: number;
}>();

const tabBarIndex = computed(() => {
  return store.tabBarIndex || props.active;
});

const isNowIndex = async (index: number): Promise<boolean> => {
  return index === props.active;
};

onShow(async () => {
  console.log(props.active);
});
</script>

<template>
  <tm-tabbar
    transprent
    blur
    :bottom="0"
    :round="16"
    :auto-select="false"
    :active="props.active"
    :shadow="8"
  >
    <tm-tabbar-item
      activeColor="primary"
      count="HOT"
      blur
      :active="props.active === 0"
      transprent
      open-type="switchTab"
      url="/pages/index/home"
      text="时刻"
      icon="tmicon-collection-fill"
    ></tm-tabbar-item>
    <tm-tabbar-item
      activeColor="orange"
      url="/pages/index/schedule"
      text="课表"
      blur
      :active="props.active === 1"
      transprent
      open-type="switchTab"
      icon="tmicon-cog-fill"
    ></tm-tabbar-item>
    <!-- <tm-tabbar-item
        :shadow="2"
        :data="'中间项'"
        btn-top
        fontColor="white"
        activeColor="white"
        linear="top"
        linearDeep="accent"
        color="yellow"
        icon="tmicon-plus"
      ></tm-tabbar-item> -->
    <!-- <tm-tabbar-item
        activeColor="orange"
        url="/pages/fankui/index"
        text="反馈分类"
        unicon="tmicon-like"
        icon="tmicon-heart-fill"
      ></tm-tabbar-item> -->
    <tm-tabbar-item
      activeColor="orange"
      :count="8"
      url="/pages/index/user"
      :active="props.active === 2"
      blur
      transprent
      text="图表中心"
      open-type="switchTab"
      unicon="tmicon-account"
      icon="tmicon-userplus-fill"
    ></tm-tabbar-item>
  </tm-tabbar>
</template>
