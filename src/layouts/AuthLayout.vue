<template>
  <div class="flex justify-center h-screen">
    <div class="hidden bg-cover lg:block lg:w-2/3">
      <div class="flex items-center h-full px-20 bg-gray-900 bg-opacity-40">
        <div class="max-w-lg">
          <h1 class="title">Mrf Movies</h1>

          <p class="body mt-6">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos dolores
            qui dolorum pariatur dolore? Ipsum atque animi doloremque
            voluptatibus laborum. Nihil, repudiandae veritatis quas voluptatum
            distinctio ratione repellendus ad harum!
          </p>
        </div>
      </div>
    </div>
    <div class="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
      <div class="flex-1">
        <RouterView />
      </div>
    </div>
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router'
</script>

<style lang="scss" scoped></style>
