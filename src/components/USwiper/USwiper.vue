<script setup lang="ts">
import { USwiperItem } from "./types";

withDefaults(
  defineProps<{
    margin?: number;
    height?: number;
    nextMargin?: number;
    borderRadius?: number;
    subTitleFontSize?: number;
    subTitleColor?: string;
    titleFontSize?: number;
    titleColor?: string;
    swiperItems: Array<USwiperItem>;
  }>(),
  {
    margin: 30,
    height: 320,
    nextMargin: 0,
    borderRadius: 20,
    subTitleFontSize: 24,
    subTitleColor: "#fff",
    titleFontSize: 36,
    titleColor: "#fff",
  }
);

const enjoySwiper = ref(0);

const swiperChange = (e: CustomEvent) => {
  enjoySwiper.value = e.detail.current;
  console.log(e.detail.current);
};
</script>

<template>
  <div class="mt-3 relative">
    <swiper
      @change="swiperChange"
      :style="{ height: height + 'rpx' }"
      circular="true"
      autoplay="true"
      interval="8000"
    >
      <swiper-item v-for="(item, index) in swiperItems" :key="index">
        <view
          :style="{
            height: height + 'rpx',
            marginLeft: margin + 'rpx',
            marginRight: margin + 'rpx',
            borderRadius: borderRadius + 'rpx',
          }"
          class="overflow-hidden relative"
        >
          <image :src="item.img" mode="aspectFill" class="object-fill w-full"></image>
          <view
            class="z-1 w-full h-full absolute top-0 left-0"
            :style="{
              background:
                'linear-gradient(to right, rgba(0, 0, 0, 0.5) 0%, rgba(67, 72, 92, 0) 100%)',
            }"
          ></view>
          <view class="flex flex-col w-full absolute top-8 left-4 z-2">
            <text
              class="overflow-hidden font-bold relative"
              :class="enjoySwiper === index ? 'animation' : ''"
              :style="{
                fontSize: titleFontSize + 'rpx',
                color: titleColor,
                width: '70%',
              }"
            >
              {{ item.title }}
            </text>
            <text
              v-if="item.subTitle"
              class="overflow-hidden relative pt-2"
              :class="enjoySwiper === index ? 'animation' : ''"
              :style="{
                fontSize: subTitleFontSize + 'rpx',
                color: subTitleColor,
                width: '60%',
              }"
            >
              {{ item.subTitle }}
            </text>
            <view
              class="overflow-hidden relative pt-2 w-19"
              :class="enjoySwiper === index ? 'mt-2 animation' : ''"
              :style="{
                fontSize: subTitleFontSize + 'rpx',
                color: subTitleColor,
              }"
            >
              <view
                class="justify-center items-center"
                :style="{
                  color: '#ffffff',
                  border: '#ffffff solid 1px',
                  borderRadius: '10rpx',
                  fontSize: '24rpx',
                  padding: '4rpx 10rpx',
                  backgroundColor: 'rgb(0, 0, 0, 0.3)',
                }"
              >
                <text>查看详情</text>
                <div class="i-carbon-chevron-right text-xs"></div>
              </view>
            </view>
          </view>
        </view>
      </swiper-item>
    </swiper>

    <view class="pt-2 ml-2">
      <view
        class="dot"
        :style="{
          top: height - 30 + 'rpx',
          left: margin + 30 + 'rpx',
        }"
      >
        <view
          v-for="(_, index) in swiperItems"
          :key="index"
          :style="{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }"
          :class="[index === enjoySwiper ? 'Select ' : 'Unchecked']"
        ></view>
      </view>
      <view
        class="dot"
        :style="{
          top: height - 30 + 'rpx',
          left: margin + 30 + 'rpx',
        }"
      >
        <view
          v-for="(_, index) in swiperItems"
          :key="index"
          :style="{ backgroundColor: 'rgba(255, 255, 255, 1)' }"
          :class="[index === enjoySwiper ? 'Select1 ' : 'Unchecked1']"
        ></view>
      </view>
    </view>
  </div>
</template>

<style>
.Select {
  height: 6rpx;
  width: 10rpx;
  border-radius: 10rpx;
  margin-left: 8rpx;
  animation: Select 1s 0s 1 forwards;
}

.Unchecked {
  height: 6rpx;
  width: 10rpx;
  margin-left: 8rpx;
  border-radius: 10rpx;
}

.Select1 {
  height: 6rpx;
  width: 10rpx;
  border-radius: 10rpx;
  margin-left: 10rpx;
  animation: Select1 7s 0s 1 forwards;
  background-color: rgba(255, 255, 255, 1);
}
.Unchecked1 {
  height: 6rpx;
  width: 10rpx;
  margin-left: 10rpx;
  border-radius: 10rpx;
  background-color: rgba(255, 255, 255, 0) !important;
}

.dot {
  position: absolute;
  display: flex;
}

.animation {
  animation: textAnimation 0.8s 0.3s forwards;
}

@keyframes Select {
  to {
    height: 6rpx;
    width: 60rpx;
  }
}

@keyframes Select1 {
  from {
    height: 6rpx;
    width: 10rpx;
  }
  to {
    height: 6rpx;
    width: 60rpx;
  }
}

@keyframes textAnimation {
  0% {
    opacity: 0;
    transform: translateX(-80rpx);
  }
  100% {
    opacity: 1;
  }
}
</style>
