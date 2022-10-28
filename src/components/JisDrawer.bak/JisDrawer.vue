<template>
  <view class="panel">
    <view class="Content" :style="'background:' + BkColor + ';'">
      <view class="drawer" :style="'right:' + DrawerWidth + '%; width:' + DraWidth + '%;'"
        ><slot name="drawer"></slot
      ></view>
      <view
        @touchmove="handletouchmove"
        @touchstart.stop="handletouchstart"
        @touchend.stop="handletouchend"
        class="Page"
        :style="
          'left :' +
          Page +
          '%;transform: translate(' +
          Page / 2 +
          'rpx);border-radius:' +
          Page +
          'rpx;'
        "
        id="PageRef"
        ref="PageRef"
      >
        <u-navbar
          :is-fixed="false"
          :is-back="false"
          :border-bottom="false"
          title="剑未配妥，出门已是江湖"
        >
          <slot name="right">
            <view @click="openDrawer" class="RightIcon" style="padding: 0 30rpx"
              ><u-icon name="list" size="50"></u-icon
            ></view>
          </slot>
        </u-navbar>
        <slot name="Content"></slot>
        <u-tabbar v-model="current" :list="list" :mid-button="true"></u-tabbar>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      latePage: 0,
      DrawerWidth: 100,
      Page: 0,
      flag: 0, //1向左滑动,2向右滑动,3向上滑动 4向下滑动
      lastX: 0,
      lastY: 0,
      currentX: 0,
      list: [
        {
          iconPath: "home",
          selectedIconPath: "home-fill",
          text: "首页",
          count: 2,
          isDot: true,
          customIcon: false,
        },
        {
          iconPath: "photo",
          selectedIconPath: "photo-fill",
          text: "放映厅",
          customIcon: false,
        },
        {
          iconPath: "https://cdn.uviewui.com/uview/common/min_button.png",
          selectedIconPath: "https://cdn.uviewui.com/uview/common/min_button_select.png",
          text: "发布",
          midButton: true,
          customIcon: false,
        },
        {
          iconPath: "play-right",
          selectedIconPath: "play-right-fill",
          text: "直播",
          customIcon: false,
        },
        {
          iconPath: "account",
          selectedIconPath: "account-fill",
          text: "我的",
          count: 23,
          isDot: false,
          customIcon: false,
        },
      ],
      current: 0,
    };
  },
  props: {
    DraWidth: {
      type: Number,
      default: 60,
    },
    BkColor: {
      type: String,
      default: "#424242",
    },
  },
  computed: {
    Open() {
      if (this.DrawerWidth <= 100 - this.DraWidth) return true;
      return false;
    },
  },
  created() {},
  onReady() {},
  methods: {
    handletouchmove(event) {
      var currentX = Math.floor(event.changedTouches[0].clientX - this.lastX);
      if (currentX > 40 && currentX % 2 == 0) {
        if (this.DrawerWidth > 100 - this.DraWidth) {
          this.DrawerWidth = this.DrawerWidth - 5;
          this.Page = this.Page + 4;
        }
      }
      if (currentX < 40 && currentX % 2 == 0) {
        if (this.DrawerWidth <= 100 - this.DraWidth) {
          this.DrawerWidth = this.DrawerWidth + 40;
          this.Page = this.Page - 40;
        }
      }
    },
    handletouchstart: function (event) {
      this.lastX = event.changedTouches[0].clientX;
      this.lastY = event.changedTouches[0].clientY;
    },
    handletouchend(event) {
      var currentX = Math.floor(event.changedTouches[0].clientX - this.lastX);
      if (this.Open && currentX == 0) return this.CloseDrawer();
      if (currentX > 0) {
        if (this.DrawerWidth < 90) {
          this.DrawerWidth = 100 - this.DraWidth;
          this.Page = this.DraWidth - 15;
          this.$emit("IsOpen", true);
        } else {
          this.DrawerWidth = 100;
          this.Page = 0;
        }
      }
      if (currentX < 0) {
        if (this.DrawerWidth == 100) return;
        if (this.DrawerWidth > 80) {
          this.DrawerWidth = 100 - this.DraWidth;
          this.Page = this.DraWidth - 15;
        } else {
          this.DrawerWidth = 100;
          this.Page = 0;
          this.$emit("IsOpen", false);
        }
      }
    },
    openDrawer() {
      if (!this.Open) return;
      this.DrawerWidth = 100 - this.DraWidth;
      this.Page = this.DraWidth - 15;
      this.$emit("IsOpen", true);
    },
    CloseDrawer() {
      this.DrawerWidth = 100;
      this.Page = 0;
      this.$emit("IsOpen", false);
    },
  },
};
</script>

<style lang="less" scoped>
.panel {
  width: 100%;
  height: 100%;

  .Content {
    position: relative;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    transition: all 0.3s;

    .drawer {
      transition: all 0.3s;
      position: absolute;
      right: 100%;
      top: 0;
      background-color: #162d56;
      width: 60%;
      height: 100%;
      z-index: 99;
      padding-top: 100rpx;
      padding-right: 15%;
    }
    .Page {
      transition: all 0.3s;
      position: absolute;
      z-index: 999;
      right: 0%;
      top: 0;
      overflow: hidden;
      width: 100%;
      height: 100%;
    }
  }
}
</style>
