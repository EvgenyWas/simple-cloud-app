<template>
  <main class="main">
    <MainBox />
  </main>
</template>

<script setup lang="ts">
import MainBox from './components/MainBox/MainBox.vue';
</script>

<style lang="scss">
.main {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
}
</style>
