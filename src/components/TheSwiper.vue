<template>
  <div class="content-top">
    <swiper
      @change="swiperChange"
      :style="{ height: height + 'rpx' }"
      circular="true"
      autoplay="true"
      interval="8000"
      :previous-margin="previousMargin"
      :next-margin="nextMargin"
    >
      <swiper-item v-for="(item, index) in swiperItems" :key="index">
        <div
          class="content"
          :style="{
            height: height + 'rpx',
            marginLeft: margin + 'rpx',
            marginRight: margin + 'rpx',
            borderRadius: borderRadius + 'rpx',
          }"
        >
          <image :src="item.img" mode="aspectFill" class="swiper-img"></image>
          <div class="mask"></div>
          <div class="written">
            <text
              v-if="item.title"
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
            <div
              class="Text-initialization"
              v-if="button"
              @click="onButClick"
              :class="[index === enjoySwiper ? 'bt' : '']"
            >
              <text class="bt-ico">查看详情 ➜</text>
            </div>
          </div>
        </div>
      </swiper-item>
    </swiper>
    <div v-if="DotPosition === 1">
      <div
        class="dot"
        :style="{
          top: height - 30 - dotHeight + 'rpx',
          left: margin + 30 + dotMargin + 'rpx',
        }"
      >
        <div
          v-for="(_, index) in swiperItems"
          :key="index"
          :style="{ backgroundColor: SelectBG }"
          :class="[index === enjoySwiper ? 'Select ' : 'Unchecked']"
        ></div>
      </div>
      <div
        class="dot"
        :style="{
          top: height - 30 - dotHeight + 'rpx',
          left: margin + 30 + dotMargin + 'rpx',
        }"
      >
        <div
          v-for="(_, index) in swiperItems"
          :key="index"
          :style="{ backgroundColor: UncheckedBG }"
          :class="[index === enjoySwiper ? 'Select1 ' : 'Unchecked1']"
        ></div>
      </div>
    </div>
    <div v-if="DotPosition === 2">
      <div
        class="dot"
        :style="{
          top: height - 30 - dotHeight + 'rpx',
          right: margin + 30 + dotMargin + 'rpx',
        }"
      >
        <div
          v-for="(_, index) in swiperItems"
          :key="index"
          :style="{ backgroundColor: SelectBG }"
          :class="[index === enjoySwiper ? 'Select ' : 'Unchecked']"
        ></div>
      </div>
      <div
        class="dot"
        :style="{
          top: height - 30 - dotHeight + 'rpx',
          right: margin + 30 + dotMargin + 'rpx',
        }"
      >
        <div
          v-for="(_, index) in swiperItems"
          :key="index"
          :style="{ backgroundColor: UncheckedBG }"
          :class="[index === enjoySwiper ? 'Select1 ' : 'Unchecked1']"
        ></div>
      </div>
    </div>
    <div v-if="DotPosition === 3">
      <div class="dot-c" :style="{ top: height - 30 - dotHeight + 'rpx' }">
        <div
          v-for="(_, index) in swiperItems"
          :key="index"
          :style="{ backgroundColor: SelectBG }"
          :class="[index === enjoySwiper ? 'Select ' : 'Unchecked']"
        ></div>
      </div>
      <div class="dot-c" :style="{ top: height - 30 - dotHeight + 'rpx' }">
        <div
          v-for="(_, index) in swiperItems"
          :key="index"
          :style="{ backgroundColor: UncheckedBG }"
          :class="[index === enjoySwiper ? 'Select1 ' : 'Unchecked1']"
        ></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { defineEmits, PropType } from "@vue/runtime-core";

export interface SwiperItem {
  img: string;
  title: string;
  subTitle?: string;
  tip?: string;
  url?: string;
}

export type SwiperItems = Array<SwiperItem>;

defineProps({
  previousMargin: { type: String, default: "0" },
  nextMargin: { type: String, default: "0" },
  height: { type: Number, default: 320 },
  swiperItems: { type: Array as PropType<SwiperItems>, required: true },
  margin: { type: Number, default: 10 },
  borderRadius: { type: Number, default: 20 },
  titleFontSize: { type: Number, default: 36 },
  titleColor: { type: String, default: "#ffffff" },
  subTitleFontSize: { type: Number, default: 24 },
  subTitleColor: { type: String, default: "#ffffff" },
  dotHeight: { type: Number, default: 0 },
  dotMargin: { type: Number, default: 0 },
  SelectBG: { type: String, default: "rgba(255, 255, 255, 0.5)" },
  UncheckedBG: { type: String, default: "rgba(255, 255, 255, 1)" },
  DotPosition: { type: Number, default: 1 },
  button: { type: Boolean, default: true },
});

const emit = defineEmits(["onButClick"]);
const enjoySwiper = ref(0);
const onButClick = () => {
  console.log(enjoySwiper.value);
  emit("onButClick", enjoySwiper.value);
};
const swiperChange = (e: CustomEvent): void => {
  enjoySwiper.value = e.detail.current;
};
</script>

<style scoped>
.content-top {
  /* margin-top: 30rpx; */
  position: relative;
  margin-bottom: 30rpx;
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
.dot-c {
  position: absolute;
  width: 100%;
  flex: 1;
  display: flex;
  justify-content: center;
}
</style>
