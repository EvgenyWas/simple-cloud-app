<template>
  <div class="main-box">
    <div class="main-box__container">
      <h1 class="main-box__title">Cloud App</h1>
      <form class="upload-form" for="">
        <UploadIcon class="upload-form__icon" />
        <label class="upload-form__desc" for="upload"
          >Drag & drop files or <span>Browse</span></label
        >
        <label class="upload-form__text" for="upload">{{
          supportedFormatesText
        }}</label>
        <input
          class="upload-form__input"
          name="upload"
          type="file"
          @change=""
        />
      </form>
      <UploadingFiles />
      <UploadedFiles />
    </div>
  </div>
</template>

<script setup lang="ts">
import { UploadIcon } from '@/components/icons';
import { SUPPORTED_FORMATES } from '@/config';
import { computed } from 'vue';
import UploadedFiles from './UploadedFiles.vue';
import UploadingFiles from './UploadingFiles.vue';

const supportedFormatesText = computed<string>(
  () => `Supported formates: ${SUPPORTED_FORMATES.join(' ')}`
);
</script>

<style scoped lang="scss">
.main-box {
  background-color: $secondary-background;
  box-shadow: 0px 6px 8px rgba(0, 0, 0, 0.05);
  border-radius: 4px;

  &__container {
  }

  &__title {
  }
}

.upload-form {
  &__icon {
  }

  &__desc {
  }

  &__text {
  }

  &__input {
  }
}
</style>
