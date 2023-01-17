<template>
  <div class="container">
    <div class="left-menu">
      <li
          v-for="(item, index) in list"
          :key="item.name"
          :class="{active: activeIndex === index}"
          @click="switchMenu(item, index)"
      >
        {{ item.name }}
      </li>
    </div>
    <div class="router-view">
      <router-view></router-view>
    </div>
  </div>
</template>

<script lang="ts" setup>
import menuList from "@/router/routerPage/pages.ts";
import {reactive, ref} from "vue";
import {useRouter} from "vue-router";
const router = useRouter();

const listIndex = menuList.findIndex(item => {
  console.log(item.path, item.path === "/components");
  return item.path === "/components";
});
const list = reactive(menuList[listIndex].children);

const activeIndex = ref<number>(0);

const switchMenu = (item, index: number):void => {
  activeIndex.value = index;
  router.push('/components/' + item.path);
}

</script>

<style lang="less" scoped>
.container {
  width: 100%;
  height: 100vh;
  display: flex;

  .left-menu {
    width: 250px;
    height: auto;
    overflow-y: auto;
    border-right: 1px solid #f0f0f0;

    li {
      list-style: none;
      line-height: 35px;
      padding: 0 10px;
    }

    li.active {
      border-right: 4px solid @primary;
      color: @primary;
      background-color: rgba(14, 128, 235, 0.1);
    }
  }

  .router-view {
    flex: 1;
    padding: 0 15px;
  }
}
</style>