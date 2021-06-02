<template>
  <blockquote :class="` alert alert-${type}`">
    <p>
      <slot />
    </p>
  </blockquote>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import config from '~/configs/config'
export default Vue.extend({
  props: {
    type: {
      type: String,
      default: 'info',
      validator(value) {
        return ['info', 'success', 'warning', 'danger'].includes(value)
      }
    }
  }
})
</script>

<style lang="postcss" scoped>
.alert {
  @apply rounded-lg;
}
/* Info */
.alert-info {
  @apply bg-blue-100 border-blue-400;
}
.alert-info code {
  @apply bg-blue-200 shadow-none border-0 text-current;
}
.alert-info .alert-icon {
  @apply text-blue-400;
}
.alert-info .alert-content {
  @apply text-blue-700;
}
/* Success */
.alert-success {
  @apply bg-green-100 border-green-400;
}
.alert-success code {
  @apply bg-green-200 shadow-none border-0 text-current;
}
.alert-success .alert-icon {
  @apply text-green-400;
}
.alert-success .alert-content {
  @apply text-green-700;
}
/* Warning */
.alert-warning {
  @apply bg-orange-100 border-orange-400;
}
.alert-warning code {
  @apply bg-orange-200 shadow-none border-0 text-current;
}
.alert-warning .alert-icon {
  @apply text-orange-400;
}
.alert-warning .alert-content {
  @apply text-orange-700;
}
/* Danger */
.alert-danger {
  @apply bg-red-100 border-red-400;
}
.alert-danger code {
  @apply bg-red-200 shadow-none border-0 text-current;
}
.alert-danger .alert-icon {
  @apply text-red-400;
}
.alert-danger .alert-content {
  @apply text-red-700;
}
</style>
