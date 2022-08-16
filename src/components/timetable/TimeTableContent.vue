<script lang="ts" setup>
import { courseTimeList, colorArrayList } from "@/store/course";
import tmText from "@/tmui/components/tm-text/tm-text.vue";
import tmTranslate from "@/tmui/components/tm-translate/tm-translate.vue";
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
                  class="flex ma-10"
                  :style="{
                    backgroundColor:
                      colorArrayList[0][Math.floor(Math.random() * (7 - tIndex + 1) + 0)],
                    height: '14vh',
                    marginLeft: '0.5vw',
                    marginRight: '0.5vw',
                    borderRadius: '10rpx',
                    position: 'relative',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                  }"
                >
                  <tm-text
                    color="white"
                    _class="pa-5 ma-5 flex font-weight-b"
                    :_style="{
                      alignItems: 'center',
                      justifyContent: 'center',
                      textAlign: 'center',
                    }"
                    :font-size="24"
                    label="课程名称一一一一一@教室二二二"
                  ></tm-text>
                </view>
              </tm-translate>
            </view>
          </template>
        </view>
      </template>
    </view>
  </view>
</template>
view
