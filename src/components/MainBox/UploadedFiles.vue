<template>
  <div class="uploaded-files">
    <h3 class="uploaded-files__title">Uploaded</h3>
    <ul class="uploaded-files__list">
      <li class="uploaded-files__item">
        <p class="uploaded-files__text"></p>
        <button class="uploaded-files__download">
          <DownloadIcon />
        </button>
        <button class="uploaded-files__remove">
          <BinIcon />
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { BinIcon, DownloadIcon } from '@/components/icons';
</script>

<style scoped lang="scss">
.uploaded-files {
}
</style>
