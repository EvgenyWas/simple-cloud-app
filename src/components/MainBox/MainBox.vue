<template>
  <div class="main-box">
    <div class="main-box__container">
      <h1 class="main-box__title">Cloud App</h1>
      <form
        :class="{ 'upload-form--highlighted': isFormHighlighted }"
        class="upload-form"
        @dragenter.prevent="highlightForm"
        @dragover.prevent="highlightForm"
        @dragleave.prevent="unhighlightForm"
        @drop.prevent="handleDrop"
      >
        <UploadIcon class="upload-form__icon" />
        <span class="upload-form__fieldset">
          <span class="upload-form__caption">Drag & drop files or </span>
          <label class="upload-form__upload-label" for="upload">Browse</label>
          <input
            :accept="acceptedFormates"
            id="upload"
            class="upload-form__input"
            type="file"
            multiple
            @change="handleChange"
          />
        </span>
        <legend class="upload-form__legend">{{ supportedFormatesText }}</legend>
      </form>
      <UploadingFiles :uploadingFiles="upload.uploadingFiles" />
      <UploadedFiles :uploadedFiles="uploaded.uploadedFiles" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { UploadIcon } from '@/components/icons';
import { useUpload, useUploaded } from '@/composables';
import { SUPPORTED_FORMATES } from '@/config';
import type { HTMLInputEvent } from '@/types';
import { computed, ref } from 'vue';
import UploadedFiles from './UploadedFiles.vue';
import UploadingFiles from './UploadingFiles.vue';

type Props = {
  userId: string;
};

const props = defineProps<Props>();

const upload = useUpload(props.userId);
const uploaded = useUploaded();

const isFormHighlighted = ref<boolean>(false);

const supportedFormatesText = computed<string>(
  () => `Supported formates: ${SUPPORTED_FORMATES.join(', ')}`
);
const acceptedFormates = computed<string>(
  () => '.' + SUPPORTED_FORMATES.join(', .').toLowerCase()
);

const highlightForm = () => (isFormHighlighted.value = true);

const unhighlightForm = () => (isFormHighlighted.value = false);

const handleDrop = (event: DragEvent) => {
  unhighlightForm();
  const dataTransfer = event.dataTransfer;
  const files = dataTransfer?.files;
  if (files) {
    upload.uploadFiles(files, uploaded.addUploadedFile);
  }
};

const handleChange = (event: Event) => {
  const { target } = event as HTMLInputEvent;
  const files = target.files;
  if (files?.length) {
    upload.uploadFiles(files, uploaded.addUploadedFile);
  } else {
    alert('Choose a file please');
  }
};
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
    gap: 20px;
    padding: 30px 47px;
  }

  &__title {
    margin-bottom: 10px;
    font-weight: $bold-weight;
    font-size: $xl-text;
    line-height: $xl-lh;
  }
}

.upload-form {
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
  transition: all 300ms ease-in-out;

  &--highlighted {
    border: 2px dashed $accept-color;
    transform: scale($form-scale);
  }

  &__icon {
    width: 69px;
    height: 60px;
    margin-bottom: 20px;
  }

  &__fieldset {
    height: fit-content;
    padding: 0;
    margin: 0 0 5px 0;
    text-align: center;
    border: none;
  }

  &__caption {
    font-weight: $bold-weight;
    font-size: $lg-text;
    line-height: $lg-lh;
  }

  &__upload-label {
    font-weight: $bold-weight;
    font-size: $lg-text;
    line-height: $lg-lh;
    color: $accept-color;
    text-decoration-line: underline;
    cursor: pointer;
  }

  &__legend {
    padding: 0;
    font-size: $sm-text;
    line-height: $sm-lh;
    color: $title-color;
  }

  &__input {
    width: 0;
    height: 0;
    visibility: hidden;
    cursor: pointer;
  }
}
</style>
