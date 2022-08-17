<script lang="ts" setup>
import tmTabbar from "@/tmui/components/tm-tabbar/tm-tabbar.vue";
import tmTabbarItem from "@/tmui/components/tm-tabbar-item/tm-tabbar-item.vue";

const props = defineProps<{
  // 当前激活的tabbarItem的index
  active: number;
}>();

const beforeClick = (index: number) => {
  return props.active !== index;
};
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
      :beforeClick="beforeClick"
      :data="0"
      blur
      :active="props.active === 0"
      transprent
      open-type="switchTab"
      url="/pages/index/index"
      text="时刻"
      icon="tmicon-wind-smile"
    ></tm-tabbar-item>
    <tm-tabbar-item
      url="/pages/schedule/schedule"
      text="课表"
      blur
      :beforeClick="beforeClick"
      :data="1"
      transprent
      open-type="switchTab"
      icon="tmicon-calendar-alt"
    ></tm-tabbar-item>
    <tm-tabbar-item
      url="/pages/mine/mine"
      :beforeClick="beforeClick"
      count="待更新"
      dotColor="blue"
      :data="2"
      blur
      transprent
      text="我的"
      open-type="switchTab"
      unicon="tmicon-account"
      icon="tmicon-account"
    ></tm-tabbar-item>
  </tm-tabbar>
</template>
