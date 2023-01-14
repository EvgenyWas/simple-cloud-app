<template>
  <div
    :style="{ width: progress + '%' }"
    :class="classes"
    class="ui-progress-bar"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue';

type Props = {
  progress: number;
  placement?: 'bottom' | 'top';
};

const props = withDefaults(defineProps<Props>(), {
  placement: 'bottom',
});

const classes = computed(() => ({
  'ui-progress-bar--hidden': props.progress === 0 || props.progress === 100,
  [`ui-progress-bar--${props.placement}`]: props.placement,
}));
</script>

<style scoped lang="scss">
.ui-progress-bar {
  position: absolute;
  left: -1px;
  z-index: 50;
  height: 3px;
  background-color: $accept-color;
  border-radius: 10px;

  &--hidden {
    overflow: hidden;
  }

  &--bottom {
    bottom: -1.75px;
  }

  &--top {
    top: -1.75px;
  }
}
</style>
