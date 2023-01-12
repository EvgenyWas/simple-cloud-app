<template>
  <div class="uploading-files">
    <h3 class="uploading-files__title">Uploading</h3>
    <ul class="uploading-files__list">
      <li class="uploading-files__item">
        <p class="uploading-files__text"></p>
        <button class="uploading-files__remove">
          <RemoveIcon />
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { RemoveIcon } from '@/components/icons';
</script>

<style scoped lang="scss">
.uploading-files {
}
</style>
