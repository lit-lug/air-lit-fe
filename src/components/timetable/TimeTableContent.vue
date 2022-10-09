<script lang="ts" setup>
import { courseTimeList, colorArrayList } from "@/store/course";
import tmSheet from "@/tmui/components/tm-sheet/tm-sheet.vue";
import tmText from "@/tmui/components/tm-text/tm-text.vue";
import tmOverlay from "@/tmui/components/tm-overlay/tm-overlay.vue";
import { ref } from "vue";

const showBackButton = ref(false);

// 课程长度处理
const parserCourseTitle = (title: string) => {
  return title.length > 12 ? title.substring(0, 12) : title;
};

const showCourseCard = ref(false);

const ClickCourse = (course: any) => {
  // showCourseCard.value = true;
  showBackButton.value = !showBackButton.value;
};
</script>

<template>
  <view
    class="flex"
    :style="{
      width: '100%',
      height: `100vh`,
      backgroundSize: 'cover',
      backgroundPosition: 'top center',
    }"
  >
    <view
      class="flex flex-col flex-col-center"
      :style="{
        width: '9vw',
      }"
    >
      <!-- 课表时间 -->
      <template v-for="(courseTime, courseIndex) in courseTimeList" :key="courseIndex">
        <view
          class="flex flex-col"
          :style="{
            height: '7.25vh',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
          }"
        >
          <tm-text
            _class="font-weight-b"
            :font-size="20"
            :label="courseIndex + 1"
          ></tm-text>
          <tm-text _class="font-weight-s" color="grey-darken-1" :font-size="18">{{
            courseTime.s
          }}</tm-text>
          <tm-text _class="font-weight-s" color="grey-darken-1" :font-size="18">{{
            courseTime.e
          }}</tm-text>
        </view>
      </template>
    </view>
    <!-- 课表主体 -->
    <view
      class="flex"
      :style="{
        width: '91vw',
      }"
    >
      <!--- 循环七次 -->
      <template v-for="(_, dIndex) in [1, 2, 3, 4, 5]" :key="dIndex">
        <view>
          <template v-for="(_, tIndex) in [1, 2, 3, 4, 5, 6, 7]" :key="tIndex">
            <view
              class="absolute"
              :style="
                'width:13vw;' +
                'margin-left:' +
                tIndex * 13.0 +
                'vw;margin-top:' +
                dIndex * 14.5 +
                'vh;'
              "
            >
              <view
                @click="ClickCourse"
                class="flex ma-10"
                :style="{
                  backgroundColor:
                    colorArrayList[0][Math.floor(Math.random() * (7 - tIndex + 1) + 0)],
                  height: '14vh',
                  margin: '4rpx',
                  borderRadius: '10rpx',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                }"
              >
                <text
                  :style="{
                    color: '#ffffff',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                  }"
                >
                  <text style="font-size: 24rpx">
                    {{ parserCourseTitle("市场营销学") }}
                  </text>
                  <text
                    :style="{
                      fontSize: ('XC4213'.length >= 5 ? '20' : '22') + 'rpx',
                    }"
                  >
                    {{ `\n@XC4213` }}
                  </text>
                </text>
                <view
                  :style="{
                    width: '70rpx',
                    height: '8rpx',
                    margin: '0 auto',
                    backgroundColor: '#ffffff',
                    position: 'absolute',
                    bottom: '10rpx',
                    borderRadius: '5rpx',
                    opacity: 0.7,
                  }"
                ></view>
              </view>
            </view>
          </template>
        </view>
      </template>
    </view>
  </view>

  <view
    class="fixed zIndex-26 text-white right-0 flex flex-center"
    :style="{
      transitionProperty: 'all',
      transitionDuration: '250ms',
      transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      top: '40%',
      backgroundColor: '#3B5CF0',
      right: showBackButton ? '0rem' : '-10rem',
      borderTopLeftRadius: '9px',
      borderBottomLeftRadius: '9px',
    }"
  >
    <text class="text-size-l text-align-center ma-5 pa-5">返回本周</text>
  </view>

  <tm-overlay v-model:show="showCourseCard">
    <view @click.stop="">
      <tm-sheet>
        <tm-text label="todo: 课程卡片展示详情"></tm-text>
      </tm-sheet>
    </view>
  </tm-overlay>
</template>
