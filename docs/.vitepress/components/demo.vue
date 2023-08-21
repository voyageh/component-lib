<script setup lang="ts">
import { computed, ref } from "vue";
import { Icon } from "@iconify/vue";
import CollapseTransition from "./collapseTransition.vue";

const props = defineProps({
  source: {
    type: String,
    required: true,
  },
  rawSource: {
    type: String,
    required: true,
  },
  path: {
    type: String,
    required: true,
  },
  demos: {
    type: Object,
    required: true,
  },
});

const demos = {};
Object.keys(props.demos).forEach((key) => {
  demos[key.replace("/demos/", "").replace(".vue", "")] = props.demos[key].default;
});

const showCode = ref(false);
const decoded = computed(() => {
  return decodeURIComponent(props.source);
});
</script>

<template>
  <div class="demo-preview">
    <div class="demo-preview__content">
      <component :is="demos[path]" />
    </div>
    <div class="demo-preview__btns">
      <span class="copy-btn">
        <Icon icon="akar-icons:copy" />
      </span>
      <span class="view-btn" @click="showCode = !showCode">
        <Icon icon="akar-icons:chevron-horizontal" />
      </span>
    </div>
    <CollapseTransition>
      <div v-show="showCode" class="collapse-wrap example-source-wrapper">
        <div class="example-source language-vue" v-html="decoded" />
      </div>
    </CollapseTransition>
    <Transition name="el-fade-in-linear">
      <div v-show="showCode" class="hidden-code" @click="showCode = false">
        <Icon icon="akar-icons:triangle-up-fill" /><span>隐藏源代码</span>
      </div>
    </Transition>
  </div>
</template>

<style scoped lang="scss">
.demo-preview {
  border-radius: 4px;
  border: 1px solid #dcdfe6;

  &__content {
    padding: 1.5rem;
    margin: 0.5px;
    background-color: #ffffff;
  }
  &__btns {
    padding: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    height: 2.5rem;
    border-top: 1px solid #dcdfe6;

    span {
      cursor: pointer;
    }

    .copy-btn {
      font-size: 20px;
      margin-right: 10px;
    }

    .view-btn {
      font-size: 22px;
    }
  }

  .example-source {
    margin: 0;
    border-radius: 0;
  }
  .hidden-code {
    display: flex;
    align-items: center;
    justify-content: center;
    border-top: 1px solid #dcdfe6;
    height: 44px;
    box-sizing: border-box;
    background-color: #ffffff;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    margin-top: -1px;
    color: #909399;
    cursor: pointer;
    position: sticky;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 10;

    &:hover {
      color: #0083e4;
    }

    span {
      font-size: 14px;
      margin-left: 10px;
    }
  }
  .el-fade-in-linear-enter-active,
  .el-fade-in-linear-leave-active {
    transition: opacity 0.2s linear;
  }

  .el-fade-in-linear-enter-from,
  .el-fade-in-linear-leave-to {
    opacity: 0;
  }
}
</style>
