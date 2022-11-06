<script setup lang="ts">
const imgUrl = ref(
  "http://icepie-1258418320.cos.ap-shanghai.myqcloud.com/uPic/calendar-2021-1.png"
);

const previewImg = () => {
  uni.previewImage({
    urls: [imgUrl.value],
  });
};
</script>

<template>
  <UBasePage>
    <!-- 标题栏 -->
    <template v-slot:navContent>校历</template>

    <div
      class="flex flex-col p-2 m-3 pb-6 dark:bg-dark bg-white justify-center items-center rounded-lg shadow-sm"
    >
      <div class="py-2 font-bold">2022-2023 学年第一学期</div>

      <div class="py-2 text-sm">2022-08-29 ~ 2023-01-08</div>

      <image
        @click="previewImg"
        class="rounded-lg shadow py-2"
        :src="imgUrl"
        alt="校历"
        mode="widthFix"
      />
    </div>
  </UBasePage>
</template>
div UBasePage
