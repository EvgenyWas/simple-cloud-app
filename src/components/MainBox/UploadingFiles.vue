<template>
  <div class="uploading-files">
    <h2 class="uploading-files__title">Uploading</h2>
    <TransitionGroup name="list" tag="ul" class="uploading-files__list">
      <li
        v-for="file in uploadingFiles"
        :key="file.id"
        class="uploading-files__item"
      >
        <p class="uploading-files__name">{{ file.name }}</p>
        <button
          class="uploading-files__remove"
          @click="emit('remove', file.id, file.handleAbort)"
        >
          <RemoveIcon />
        </button>
        <UiProgressBar :progress="file.progress" />
      </li>
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
import { RemoveIcon } from '@/components/icons';
import UiProgressBar from '@/components/ui/UiProgressBar.vue';
import type { TUploadingFile } from '@/types';

type Props = {
  uploadingFiles: Array<TUploadingFile>;
};

type Emits = {
  (e: 'remove', fileId: string, handler: () => void): void;
};

defineProps<Props>();
const emit = defineEmits<Emits>();
</script>

<style scoped lang="scss">
.uploading-files {
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
    position: relative;
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 10px;
    border: 1px solid $outline-color;
    border-radius: 4px;

    &--error {
      border: 1px solid $invalid-color;
    }
  }

  &__name {
    font-size: $sm-text;
    line-height: $sm-lh;
  }

  &__remove {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 16px;
    height: 16px;
    padding: 4px;
    border-radius: 50%;
    background-color: $outline-color;
    cursor: pointer;

    &:hover {
      background-color: $title-color;
    }
  }
}

@include md {
  .uploading-files {
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
