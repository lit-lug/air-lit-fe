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

const emits = defineEmits(["click"]);

const enjoySwiper = ref(0);

const swiperChange = (e: CustomEvent) => {
  enjoySwiper.value = e.detail.current;
};
</script>

<template>
  <div class="content-top">
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
          class="content"
        >
          <image :src="item.img" mode="aspectFill" class="swiper-img"></image>
          <view class="mask"></view>
          <view class="written">
            <text
              class="Text-initialization overflow"
              :style="{ fontSize: titleFontSize + 'rpx', color: titleColor }"
              :class="[index === enjoySwiper ? 'title' : '']"
            >
              {{ item.title }}
            </text>
            <text
              v-if="item.subTitle"
              class="Text-initialization overflow"
              :style="{
                fontSize: subTitleFontSize + 'rpx',
                color: subTitleColor,
              }"
              :class="[index === enjoySwiper ? 'subTitle' : '']"
            >
              {{ item.subTitle }}
            </text>
            <view
              v-if="item.url"
              @click="() => emits('click', item)"
              class="Text-initialization"
              :class="[index === enjoySwiper ? 'bt' : '']"
            >
              <text class="bt-ico"> 查看详情 ➜ </text>
            </view>
          </view>
        </view>
      </swiper-item>
    </swiper>

    <view>
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
.content-top {
  margin-top: 30rpx;
  position: relative;
}
.content {
  overflow: hidden !important;
  position: relative;
}
.mask {
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0rpx;
  background: linear-gradient(to right, rgba(0, 0, 0, 0.5) 0%, rgba(67, 72, 92, 0) 100%);
  z-index: 1;
}
.swiper-img {
  width: 100%;
  object-fit: cover;
}
.written {
  display: flex;
  flex-direction: column;
  width: 100%;
  position: absolute;
  top: 25%;
  left: 30rpx;
  z-index: 2;
}
.Text-initialization {
  opacity: 0;
}
.title {
  font-weight: bold;
  width: 60%;
  animation: textAnimation 0.8s 0.3s forwards;
}
.subTitle {
  width: 70%;
  animation: textAnimation 0.8s 0.5s forwards;
}
.overflow {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.bt {
  margin-top: 20rpx;
  animation: textAnimation 0.8s 0.7s forwards;
}
.bt-ico {
  color: #ffffff;
  border: #ffffff solid 1px;
  border-radius: 10rpx;
  font-size: 24rpx;
  padding: 4rpx 10rpx;
  background-color: rgb(0, 0, 0, 0.3);
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
.dot {
  position: absolute;
  display: flex;
}
.Select {
  height: 6rpx;
  width: 10rpx;
  border-radius: 10rpx;
  margin-left: 10rpx;
  animation: Select 1s 0s 1 forwards;
}
.Unchecked {
  height: 6rpx;
  width: 10rpx;
  margin-left: 10rpx;
  border-radius: 10rpx;
}
@keyframes Select {
  to {
    height: 6rpx;
    width: 60rpx;
  }
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
</style>
