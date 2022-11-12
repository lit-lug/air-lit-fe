<template>
  <view
    class="wly-tabnav bg-white dark:bg-dark z-10"
    :class="showShadow ? 'shadow-sm' : ''"
  >
    <!-- 导航 -->
    <view
      class="tabs"
      v-for="(item, indexNav) in tabnav"
      :key="item.name"
      :class="type === item.type ? 'tabss' : ''"
      @click="typefun(indexNav)"
    >
      <text
        class="text-28rpx transition-all"
        :class="type === item.type ? '' : 'text-gray-5 dark:text-gray-3'"
        >{{ item.name }}</text
      >
    </view>

    <!-- 进度 -->
    <view
      class="speed"
      :style="
        'left:' +
        index * (tabWidth / tabnav.length) +
        'px;width:' +
        tabWidth / tabnav.length +
        'px'
      "
    >
      <view
        class="speed-box bg-blue-5"
        :style="'width:' + (tabWidth / tabnav.length) * 0.5 + 'px;'"
      ></view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { NavItem } from "./types";

const props = defineProps({
  defaultIndex: {
    type: Number,
    default: 0,
  },
  tabWidth: {
    type: Number,
    default: 750,
  },
  showShadow: {
    type: Boolean,
    default: true,
  },
  // 线条宽度 单位px
  // lineW: {
  //   type: [Number, String],
  //   default: 20,
  // },
  // 默认选中值
  defaultType: {
    type: [String, Number],
    default: "",
  },
  // 菜单导航
  tabnav: {
    type: Array<NavItem>,
    default: [
      {
        type: "0", //状态值
        name: "余额查询",
      },
      {
        type: "1",
        name: "历史消费",
      },
      {
        type: "2",
        name: "充值记录",
      },
    ],
  },
});

const emits = defineEmits<{
  (e: "change", val: any): void;
}>();

const type = ref(props.defaultType);

const index = ref(props.defaultIndex);

const tabWidth = ref(props.tabWidth);

const typefun = (i: number) => {
  index.value = i;
  type.value = props.tabnav[i].type;
  emits("change", { i });
};

const info = uni
  .createSelectorQuery()
  .in(getCurrentInstance())
  .select(".wly-tabnav");

info
  .boundingClientRect((data: any) => {
    console.log(data);
    tabWidth.value = data.width;
  })
  .exec();
</script>

<style lang="scss">
.wly-tabnav {
  height: 80rpx;
  line-height: 80rpx;
  // background: #fff;
  position: -webkit-sticky;
  position: sticky;
  width: 750rpx;
  left: 0px;
  top: 0px;
  z-index: 1;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  justify-content: space-around;
  .speed {
    position: absolute;
    bottom: 0rpx;
    left: 0;
    width: 150rpx;
    transition: left 0.3s;

    align-items: center;
    justify-content: center;

    .speed-box {
      margin: auto;
      height: 6rpx;
      border-radius: 10px;
    }
  }

  .tabs {
    width: 150rpx;
    text-align: center;
  }
}
</style>
