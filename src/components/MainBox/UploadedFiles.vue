<template>
  <div class="uploaded-files">
    <h2 class="uploaded-files__title">Uploaded</h2>
    <TransitionGroup name="list" tag="ul" class="uploaded-files__list">
      <li
        v-for="file in uploadedFiles"
        :key="file.id"
        class="uploaded-files__item"
      >
        <p class="uploaded-files__name">{{ `${file.name}.${file.format}` }}</p>
        <a
          :href="file.link"
          :download="file.name"
          class="uploaded-files__download"
        >
          <DownloadIcon />
        </a>
        <button class="uploaded-files__remove" @click="emit('remove', file.id)">
          <BinIcon />
        </button>
      </li>
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
import { BinIcon, DownloadIcon } from '@/components/icons';
import type { TUploadedFile } from '@/types';

type Props = {
  uploadedFiles: Array<TUploadedFile>;
};

type Emits = {
  (e: 'remove', fileId: string): void;
};

defineProps<Props>();
const emit = defineEmits<Emits>();
</script>

<style scoped lang="scss">
.uploaded-files {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  margin-bottom: 30px;

  &__title {
    margin-bottom: 10px;
    font-weight: $bold-weight;
    font-size: $md-text;
    line-height: $sm-lh;
    color: $title-color;
    text-align: start;
  }

  &__list {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    width: 100%;
  }

  &__item {
    display: flex;
    width: 100%;
    padding: 10px;
    border: 1px solid $outline-color;
    border-radius: 4px;

    &--uploaded {
      border: 1px solid $valid-color;
    }
  }

  &__name {
    flex-grow: 1;
    font-size: $sm-text;
    line-height: $sm-lh;
  }

  &__download {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 16px;
    height: 16px;
    padding: 2px;
    margin-right: 16px;
    border-radius: 50%;
    background-color: $tertiary-background;
    cursor: pointer;

    &:hover {
      background-color: $outline-color;
    }
  }

  &__remove {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 16px;
    height: 16px;
    padding: 4px;
    border-radius: 50%;
    background-color: $tertiary-background;
    cursor: pointer;

    &:hover {
      background-color: $outline-color;
    }
  }
}

@include md {
  .uploaded-files {
    margin-bottom: 15px;

    &__name {
      width: 170px;
      padding-right: 10px;
      font-size: $xs-text;
      line-height: $xs-lh;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    &__download {
      margin-right: 10px;
    }
  }
}
</style>
