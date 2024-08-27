<template>
  <div>
    <label v-if="label" for="email" class="block body-sm mb-1">{{
      label
    }}</label>
    <textarea
      v-if="type === 'textarea'"
      rows="3"
      :id="id"
      :class="classes"
      :placeholder="placeholder"
      :required="required"
      v-model="model"
    />
    <input
      v-else
      :type="type"
      :id="id"
      :class="classes"
      :placeholder="placeholder"
      :required="required"
      v-model="model"
      autocomplete="on"
      :readonly="readonly"
    />
    <span v-if="error" class="block mt-1 text-red-400 text-sm">{{
      error
    }}</span>
  </div>
</template>

<script setup>
import { computed } from 'vue'
const model = defineModel()

const props = defineProps({
  id: { type: String, required: true },
  type: { type: String, default: 'text' },
  label: String,
  error: String,
  required: Boolean,
  placeholder: String,
  readonly: Boolean
})

const classes = computed(() => {
  return `block w-full px-4 py-2 bg-transparent outline-none rounded border  focus:ring focus:ring-opacity-30 focus:active:bg-transparent placeholder:text-zinc-500 ${
    props.error
      ? 'border-red-200 focus:border-300-500 focus:ring-red-500 '
      : 'border-zinc-700 focus:border-zinc-500 focus:ring-indigo-500 '
  }`
})
</script>
