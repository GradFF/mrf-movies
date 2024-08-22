<template>
  <div>
    <h1 class="text-3xl font-bold underline">Home page</h1>
    <p class="mt-4">Olá! {{ user?.name }}</p>
  </div>
</template>

<script setup>
import { useStore } from '@/stores'

const { user } = useStore()
</script>

<style lang="scss" scoped></style>
