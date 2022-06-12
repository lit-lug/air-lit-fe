<script lang="ts" setup>
import { onLaunch, onShow, onHide } from "@dcloudio/uni-app";

onLaunch(() => {
  console.log("App Launch");

  // const test = uni.get
  // #ifdef H5
  // const colorScheme = window.matchMedia("(prefers-color-scheme: dark)");
  // document.documentElement.classList.add("dark");
  // colorScheme.addEventListener("change", (e: MediaQueryListEvent) => {
  //   document.documentElement.classList.add(e.matches ? "dark" : "light");
  // });
  // #endif
});
onShow(() => {
  document.documentElement.classList.add("light");
  console.log("App Show");
});
onHide(() => {
  console.log("App Hide");
});
</script>
<style></style>
