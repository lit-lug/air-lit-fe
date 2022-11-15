<script setup lang="ts">
const { customBarHeight } = storeToRefs(useAppStore());

const props = withDefaults(
  defineProps<{
    filterData: Array<FilterDataItem>;
    maxHeight?: number;
    tabsHeight?: number;
    isSticky?: boolean;
    isFixed?: boolean;
    stickyTop?: string;
  }>(),
  {
    maxHeight: 400,
    tabsHeight: 80,
    isSticky: false,
    isFixed: false,
    stickyTop: "0rpx",
  }
);

const emits = defineEmits(["change"]);

const tableData = ref(Array<FilterDataItem>());

watch(
  () => props.filterData,
  (val) => {
    tableData.value = val;
  },
  {
    immediate: true,
  }
);

const getTitleName = computed(() => {
  return function (item) {
    const info = item.submenu[item.select];
    if (info) {
      return info.label;
    }
    return item.label;
  };
});

const tabsHei = computed(() => {
  return `${props.tabsHeight}rpx`;
});

const mainsHeight = computed(() => {
  return `${props.maxHeight - props.tabsHeight}rpx`;
});

const show = ref(false);
const curren = ref(0);
const child = ref<FilterDataItem>();

const maxHei = computed(() => {
  return `${props.maxHeight}rpx`;
});

const maskVisibility = ref(false);

const handClose = () => {
  show.value = false;
  maskVisibility.value = false;
};
let loading = false;
const handEnum = (index: number) => {
  if (loading) return;
  loading = true;
  setTimeout(() => {
    loading = false;
  }, 500);
  if (show.value && curren.value === index) {
    show.value = false;
    setTimeout(() => {
      maskVisibility.value = false;
    }, 200);
    return;
  }
  curren.value = index;
  child.value = tableData.value[index];
  maskVisibility.value = true;
  nextTick(() => {
    show.value = true;
  });
};

const handSelect = (
  // item: {
  //   label: string;
  //   value: any;
  // },
  index: number
) => {
  const arr = tableData.value;
  arr[curren.value].select = index;
  show.value = false;
  setTimeout(() => {
    maskVisibility.value = false;
  }, 200);

  const select = toRaw(arr).map((el) => {
    return {
      labelKey: el.key,
      ...el.submenu[el.select],
    };
  });
  emits("change", select as FilterChangeData[]);
};
</script>

<template>
  <div
    class="yang-dropdown shadow-sm"
    :class="{ isSticky: isSticky, isFixed: isFixed, overHidden: !show }"
    :style="{ top: isSticky || isFixed ? stickyTop : 0 }"
  >
    <view class="dropdow">
      <div
        @click="handClose"
        class="bg-dark-100 bg-opacity-50 transition-all right-0 bottom-0 left-0 z-1 fixed"
        :style="{ height: `calc(100vh - ${customBarHeight}px)`, top: customBarHeight }"
        :class="maskVisibility ? 'opacity-100 visible' : 'opacity-0 invisible'"
      />
      <view class="content bg-white dark:bg-dark shadow-sm" @click="handClose">
        <view class="tabs flex align-center bg-white dark:bg-dark">
          <view
            class="tab flex align-center justify-center items-center"
            v-for="(item, index) in tableData"
            :key="index"
            @click.stop="handEnum(index)"
          >
            <div
              class="font-bold px-1 text-30rpx"
              :class="show && curren === index ? 'text-blue-5' : ''"
            >
              {{ getTitleName(item) }}
            </div>
            <div
              class="transition-transform duration-200 i-carbon-chevron-down text-xl"
              :class="[
                show && curren === index ? 'rotate-to-180 text-blue-5' : 'rotate-to-0',
              ]"
            ></div>
          </view>
          <slot name="right"></slot>
        </view>
        <view class="mains" :class="{ open: show }" :style="{ height: mainsHeight }">
          <scroll-view :scroll-y="true" class="h-full">
            <view class="radios">
              <view
                class="yradio"
                v-for="(item, index) in child?.submenu"
                :key="index"
                @click="handSelect(index)"
              >
                <div
                  class="text-30rpx font-bold"
                  :class="
                    child?.select === index
                      ? 'text-blue-5 '
                      : 'text-gray-5 dark:text-gray-3'
                  "
                >
                  {{ item.label }}
                </div>
                <div
                  v-if="child?.select === index"
                  class="transition-transform duration-200 text-blue-5 i-carbon:checkmark text-xl"
                ></div>
              </view>
            </view>
          </scroll-view>
        </view>
      </view>
    </view>
  </div>
</template>

<style lang="scss">
.flex {
  display: flex;
}

.align-center {
  align-items: center;
}

.justify-center {
  justify-content: center;
}

.yang-dropdown {
  min-height: 70rpx;
}

.dropdow {
  position: relative;
  height: v-bind("tabsHei");
  z-index: 2;

  .content {
    position: relative;
    z-index: 5;
    overflow: hidden;
    height: v-bind("maxHei");
  }

  .tabs {
    position: relative;
    z-index: 4;
    height: v-bind("tabsHei");

    .tab {
      flex: 1;
      padding: 25rpx 0;
      font-size: 28rpx;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  .mains {
    transition: height 0.2s;
    position: absolute;
    z-index: 3;
    left: 0;
    width: 750rpx;
    overflow: hidden;
    transform: translateY(-100%);
    transition: all 0.3s;
    height: v-bind("mainsHeight");

    .yradio {
      width: 750rpx;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 20rpx;
      box-sizing: border-box;
      font-size: 28rpx;
    }
  }

  .open {
    transform: translateY(0);
  }
}

.overHidden {
  overflow: hidden;
}

.isSticky {
  position: sticky;
}
.isFixed {
  position: fixed;
  width: 100%;
  top: v-bind("stickyTop");
}

.rotate-to-180 {
  transform: rotate(180deg);
}

.rotate-to-0 {
  transform: rotate(0deg);
}
</style>
