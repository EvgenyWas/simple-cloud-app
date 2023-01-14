<template>
  <div class="main-box">
    <div class="main-box__container">
      <h1 class="main-box__title">Cloud App</h1>
      <form class="upload-form" for="upload">
        <UploadIcon class="upload-form__icon" />
        <label class="upload-form__caption" for="upload"
          >Drag & drop files or
          <span class="upload-form__excerpt">Browse</span></label
        >
        <label class="upload-form__desc" for="upload">{{
          supportedFormatesText
        }}</label>
        <input
          :accept="acceptedFormates"
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
  () => `Supported formates: ${SUPPORTED_FORMATES.join(', ')}`
);
const acceptedFormates = computed<string>(
  () => '.' + SUPPORTED_FORMATES.join(', .').toLowerCase()
);
</script>

<style scoped lang="scss">
.main-box {
  background-color: $primary-color;
  box-shadow: 0px 6px 8px rgba(0, 0, 0, 0.05);
  border-radius: 4px;

  &__container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 30px 47px;
  }

  &__title {
    margin-bottom: 30px;
    font-weight: $bold-weight;
    font-size: $xl-text;
    line-height: $xl-lh;
  }
}

.upload-form {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 445px;
  max-height: 202px;
  width: 100%;
  height: 100%;
  padding: 30px;
  background-color: $secondary-background;
  border: 2px dashed $border-color;
  border-radius: 4px;

  &__icon {
    width: 69px;
    height: 60px;
    margin-bottom: 20px;
  }

  &__caption {
    margin-bottom: 5px;
    font-weight: $bold-weight;
    font-size: $lg-text;
    line-height: $lg-lh;
  }

  &__excerpt {
    color: $accept-color;
    text-decoration-line: underline;
  }

  &__desc {
    font-size: $sm-text;
    line-height: $sm-lh;
  }

  &__input {
    position: absolute;
    inset: 0;
    cursor: pointer;
    opacity: 0;
    filter: alpha(opacity=0);
  }
}
</style>
