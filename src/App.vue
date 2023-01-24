<template>
  <main class="main">
    <MainBox :userId="storageValue" />
  </main>
</template>

<script setup lang="ts">
import { v4 as uuidv4 } from 'uuid';
import { onMounted } from 'vue';
import MainBox from './components/MainBox/MainBox.vue';
import { useStorage } from './composables';
import { STORAGE_KEYS } from './config';

const { storageValue, setItem } = useStorage(STORAGE_KEYS.USER_ID, '');

onMounted(() => {
  if (!storageValue.value) {
    setItem(uuidv4());
  }
});
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
