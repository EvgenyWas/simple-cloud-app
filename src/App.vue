<template>
  <main class="main">
    <MainBox />
  </main>
</template>

<script setup lang="ts">
import MainBox from './components/MainBox/MainBox.vue';
</script>

<style scoped lang="scss">
.main {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: $primary-background;
}
</style>
