<script lang="ts" setup>
import tmTabbar from "@/tmui/components/tm-tabbar/tm-tabbar.vue";
import tmTabbarItem from "@/tmui/components/tm-tabbar-item/tm-tabbar-item.vue";

const props = defineProps<{
  // 当前激活的tabbarItem的index
  active: number;
}>();
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
      url="/pages/index/index"
      text="时刻"
      icon="tmicon-wind-smile"
    ></tm-tabbar-item>
    <tm-tabbar-item
      url="/pages/index/schedule"
      text="课表"
      blur
      :active="props.active === 1"
      transprent
      open-type="switchTab"
      icon="tmicon-calendar-alt"
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
      url="/pages/index/user"
      :active="props.active === 2"
      blur
      transprent
      text="我的"
      open-type="switchTab"
      unicon="tmicon-account"
      icon="tmicon-account"
    ></tm-tabbar-item>
  </tm-tabbar>
</template>
