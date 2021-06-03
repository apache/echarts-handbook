<template>
  <blockquote :class="`md-alert md-alert-${type}`">
    <p>
      <slot />
    </p>
  </blockquote>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
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
.md-alert {
  @apply rounded-lg;
  @apply border-l-4;
}
/* Info */
.md-alert-info {
  @apply bg-blue-100 border-blue-400;
}
.md-alert-info code {
  @apply bg-blue-200 shadow-none border-0 text-current;
}
.md-alert-info .md-alert-icon {
  @apply text-blue-400;
}
.md-alert-info .md-alert-content {
  @apply text-blue-700;
}
/* Success */
.md-alert-success {
  @apply bg-green-100 border-green-400;
}
.md-alert-success code {
  @apply bg-green-200 shadow-none border-0 text-current;
}
.md-alert-success .md-alert-icon {
  @apply text-green-400;
}
.md-alert-success .md-alert-content {
  @apply text-green-700;
}
/* Warning */
.md-alert-warning {
  @apply bg-orange-100 border-orange-400;
}
.md-alert-warning code {
  @apply bg-orange-200 shadow-none border-0 text-current;
}
.md-alert-warning .md-alert-icon {
  @apply text-orange-400;
}
.md-alert-warning .md-alert-content {
  @apply text-orange-700;
}
/* Danger */
.md-alert-danger {
  @apply bg-red-100 border-red-400;
}
.md-alert-danger code {
  @apply bg-red-200 shadow-none border-0 text-current;
}
.md-alert-danger .md-alert-icon {
  @apply text-red-400;
}
.md-alert-danger .md-alert-content {
  @apply text-red-700;
}
</style>
