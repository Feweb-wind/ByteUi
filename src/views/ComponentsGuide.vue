<template>
  <div class="container">
    <div class="left-menu">
      <section v-for="(item, index) in asideKeys" :key="'leftBar' + index" class="sidebar-group">
        <p class="sidebar-group-title">{{item.name}}</p>
        <a v-for="(route, index) in item.data"
           :key="item.name + route.name"
           class="link"
           :class="{active: activeComponent === route.path}"
        >
          <p class="link-text"
             @click="switchMenu(route.path)"
          >
            {{route.name}}
          </p>
        </a>
      </section>
    </div>
    <div class="router-view">
      <router-view></router-view>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {ref} from "vue";
import {RouteRecordRaw, useRouter} from "vue-router";
import basicComponents from "@/router/routerPage/basicComponents";
import formComponents from "@/router/routerPage/formComponents";
import dataComponents from "@/router/routerPage/dataComponents";
import navigationComponents from "@/router/routerPage/navigationComponents";
import feedbackComponents from "@/router/routerPage/feedbackComponents";
import othersComponents from "@/router/routerPage/othersComponents";

interface leftBarType {
  name: string
  data: RouteRecordRaw[]
};

const asideKeys: leftBarType[] = [
  {
    name: "Basic 基础组件",
    data: basicComponents,
  },
  {
    name: "Form 表单组件",
    data: formComponents,
  },
  {
    name: "Data 数据展示",
    data: dataComponents,
  },
  {
    name: "Navigation 导航",
    data: navigationComponents,
  },
  {
    name: "Feedback 反馈组件",
    data: feedbackComponents,
  },
  {
    name: "Others 其他",
    data: othersComponents,
  },
];

const router = useRouter();

const activeComponent = ref<string>("button");

const switchMenu = (path: string):void => {
  activeComponent.value = path;
  router.push('/components/' + path);
}

</script>

<style lang="less" scoped>
@left-width: 250px;
.container {
  width: 100vw;
  height: 100vh;
  display: flex;

  .left-menu {
    width: @left-width;
    height: auto;
    overflow-y: auto;
    border-right: 1px solid #f0f0f0;
    padding: 0 20px;

    a {
      text-decoration: none;
    }

    .link {
      display: block;
      padding: 10px 15px;
      line-height: 1.5;
      font-size: .9em;
      border-radius: 8px;
      margin: 0;

      .link-text {
        line-height: 20px;
        font-size: 13px;
        font-weight: 500;
        color: #606266;
        transition: color .25s;
        margin: 0;
      }

      .link-text:hover {
        color: #409eff;
        cursor: pointer;
      }
    }

    .active {
      background-color: rgba(64, 158, 255, 0.1);
      .link-text {
        font-weight: 600;
        color: #409eff;
        transition: color .25s;
      }
    }

  }

  .router-view {
    flex: 1;
    padding: 0 15px;
    height: 100vh;
    overflow-y: scroll;
    width: calc(100vw - @left-width);
  }


}
</style>