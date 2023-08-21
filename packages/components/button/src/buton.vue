<template>
  <button :class="[ns.b(), ns.m(type)]">
    <slot />
  </button>
</template>

<script setup lang="ts">
import { buttonProps } from "./button";
import { useNamespace } from "@udesign-vue/hooks";

defineOptions({
  name: "UlButton",
});
defineProps(buttonProps);

const ns = useNamespace("button");
</script>
./button
