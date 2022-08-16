<script lang="ts" setup>
import { courseTimeList, colorArrayList } from "@/store/course";
import tmText from "@/tmui/components/tm-text/tm-text.vue";
import tmTranslate from "@/tmui/components/tm-translate/tm-translate.vue";
import tmOverlay from "@/tmui/components/tm-overlay/tm-overlay.vue";
import { ref } from "vue";

// 课程长度处理
const parserCourseTitle = (title: string) => {
  return title.length > 12 ? title.substring(0, 12) : title;
};

const showCourseCard = ref(false);

const ClickCourse = (course: any) => {
  showCourseCard.value = true;
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
              <tm-translate name="fade" autoPlay :duration="500">
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
              </tm-translate>
            </view>
          </template>
        </view>
      </template>
    </view>
  </view>
  <tm-overlay v-model:show="showCourseCard">
    <view @click.stop="" :duration="100">
      <tm-sheet>
        <tm-text label="todo: 课程卡片展示详情"></tm-text>
      </tm-sheet>
    </view>
  </tm-overlay>
</template>
view
