<template>
  <button
    type="submit"
    class="btn btn-primary"
    :loading="loading"
    :disabled="loading"
  >
    <span v-if="loading">Aguarde...</span>
    <slot v-else />
  </button>
</template>

<script setup>
defineProps({
  loading: Boolean
})
</script>
