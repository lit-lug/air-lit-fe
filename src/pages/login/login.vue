<script setup lang="ts">
const user_isfoucs = ref(false);
const username = ref("");
const user_focus = () => {
  pass_isfoucs.value = false;
  user_isfoucs.value = !user_block.value;
};
const user_block = computed(() => {
  return username.value.length > 0 ? true : user_isfoucs.value ? true : false;
});
const pass_isfoucs = ref(false);
const password = ref("");
const pass_focus = () => {
  user_isfoucs.value = false;
  pass_isfoucs.value = !pass_isfoucs.value;
};
const pass_block = computed(() => {
  return password.value.length > 0 ? true : pass_isfoucs.value ? true : false;
});

const cleanfocus = () => {
  user_isfoucs.value = false;
  pass_isfoucs.value = false;
};
</script>
<template>
  <UBasePage>
    <view class="container" @click="cleanfocus">
      <view class="inputBox" @click="user_focus">
        <input type="text" v-model="username" />
        <label
          class="user-label"
          :style="{
            color: user_block ? ' #00dfc4' : '',
            transform: user_block ? 'translate(10px, -18px)' : '',
            'font-size': user_block ? '0.8em' : '',
            background: user_block ? '#1d2b3a' : '',
            'border-left': user_block ? '1px solid #00dfc4' : '',
            'border-right': user_block ? '1px solid #00dfc4' : '',
          }"
          >First Name</label
        >
      </view>
      <view class="inputBox" @click="pass_focus">
        <input type="text" v-model="password" />
        <label
          :style="{
            color: pass_block ? ' #1d2b3a' : '',
            transform: pass_block ? 'translate(10px, -18px)' : '',
            'font-size': pass_block ? '0.8em' : '',
            background: pass_block ? '#00dfc4' : '',
            'border-left': pass_block ? '1px solid #00dfc4' : '',
            'border-right': pass_block ? '1px solid #00dfc4' : '',
          }"
          >Last Name</label
        >
      </view>
    </view>
  </UBasePage>
</template>
<style>
.container {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
  background: #1d2b3a;
}

.inputBox {
  position: relative;
  width: 250px;
}

.inputBox input {
  width: 100%;
  padding: 10px;
  border: 1px solid rgba(255, 255, 255, 0.25);
  background: #1d2b3a;
  border-radius: 5px;
  outline: none;
  color: #fff;
  font-size: 1em;
}

.inputBox label {
  position: absolute;
  left: 0;
  top: 10px;
  padding: 0 10px;
  pointer-events: none;
  font-size: 1em;
  color: rgba(255, 255, 255, 0.25);
  text-transform: uppercase;
  transition: 0.5s;
}

/* .inputBox input:valid~span {
    color: #00dfc4;
    background-color: red;
} */
</style>
