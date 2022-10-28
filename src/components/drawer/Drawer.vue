<script setup lang="ts">
const props = defineProps<{ showCourseAction: boolean }>();

const page = ref(0);

const DrawerWidth = ref(300);

const DraWidth = ref(60);

const Open = ref(false);

// openDrawer() {
//       if (!this.Open) return;
//       this.DrawerWidth = 100 - this.DraWidth;
//       this.Page = this.DraWidth - 15;
//       this.$emit("IsOpen", true);
//     },
//     CloseDrawer() {
//       this.DrawerWidth = 100;
//       this.Page = 0;
//       this.$emit("IsOpen", false);
//     },

const openDrawer = () => {
  //   if (!Open.value) return;
  DrawerWidth.value = 100 - DraWidth.value;
  page.value = DraWidth.value - 15;
  //   emit("IsOpen", true);
};

const CloseDrawer = () => {
  DrawerWidth.value = 100;
  page.value = 0;
  //   emit("IsOpen", false);
};
</script>

<template>
  <UBasePage :showNavBar="false">
    <div class="w-full h-full">
      <view class="relative top-0 w-full h-full overflow-hidden transition">
        <view :style="'right:' + DrawerWidth + '%; width:' + DraWidth + '%;'">
          <slot name="drawer"> text </slot>
        </view>
        <view
          class="absolute top-0 left-0 w-full h-full z-999 transition"
          :style="
            'left :' +
            page +
            '%;transform: translate(' +
            page / 2 +
            'rpx);border-radius:' +
            page +
            'rpx;'
          "
        >
          <slot name="content"> text </slot>

          <button @click="openDrawer">Open</button>
          <button @click="CloseDrawer">Close</button>
        </view>
      </view>
    </div>
  </UBasePage>
</template>
