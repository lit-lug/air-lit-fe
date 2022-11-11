<script setup lang="ts">
onMounted(() => {
  console.log("UInput mounted");
  const currentInstance = getCurrentInstance();
  const q = uni.createSelectorQuery().in(currentInstance);
  q.select("#scrollContainer")
    .boundingClientRect((res) => {
      console.log(res);
    })
    .exec();
});
</script>

<template class="sticky">
  <scroll-view id="scrollContainer" :style="{ position: 'fixed', zIndex: 1993 }">
    <div class="flex flex-col b-b-blue b-b-2">
      <div class="flex flex-row justify-around items-center px-2 my-2">
        <div w-full justify-center flex flex-col items-center py-2>
          test1
          <div class="w-full h-1 bg-blue-6/80"></div>
        </div>

        <div w-full justify-center flex flex-col items-center py-2>
          test2
          <!-- <div class="w-full h-1 bg-blue-5"></div> -->
        </div>
      </div>

      <!-- 蓝色下滑线 -->
    </div>
  </scroll-view>
</template>
