<template>
  <div>{{ msg }}</div>
</template>

<script setup lang="ts">
import { ref } from "vue";

defineOptions({ name: "button-base" });

const msg = ref("ffff");
</script>
