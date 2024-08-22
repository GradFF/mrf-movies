<template>
  <div>
    <RouterLink :to="{ name: 'home' }" class="btn link">
      <LeftIcon class="size-4 mr-2" />
      Voltar
    </RouterLink>
    <div class="flex items-center space-x-8 mt-4">
      <h1 class="title-sm">O Poderoso Chefão</h1>

      <div class="flex space-x-2">
        <StarIcon
          v-for="item in 5"
          :key="item.id"
          class="size-5 text-indigo-500"
        />
      </div>
    </div>
    <div class="flex items-center space-x-4 body">
      <span> Por Mrfneto</span>
      <span> 22/08/2024 19:44</span>
    </div>
    <ul class="flex space-x-2 mt-4">
      <li class="body-sm muted px-2 rounded bg-zinc-900">Policial</li>
      <li class="body-sm muted px-2 rounded bg-zinc-900">Drama</li>
    </ul>
    <p class="body mt-6">
      Don Vito Corleone (Marlon Brando) é o chefe de uma "família" de Nova York
      que está feliz, pois Connie (Talia Shire), sua filha, se casou com Carlo
      (Gianni Russo). Porém, durante a festa, Bonasera (Salvatore Corsitto) é
      visto no escritório de Don Corleone pedindo "justiça", vingança na verdade
      contra membros de uma quadrilha, que espancaram ...
    </p>

    <div class="mt-8 flex items-center space-x-6">
      <RouterLink
        :to="{ name: 'movies-update', params: { id: 1 } }"
        class="btn btn-outline w-1/4"
      >
        Editar
      </RouterLink>
      <button class="btn btn-danger w-1/4">Excluir</button>
    </div>
  </div>
</template>

<script setup>
import LeftIcon from '@/components/icons/LeftIcon.vue'
import StarIcon from '@/components/icons/StarIcon.vue'

import { ref } from 'vue'

const loading = ref(false)

const onSubmit = () => {
  loading.value = true
  setTimeout(() => {
    console.log('Submitted:', email.value, password.value)
    loading.value = false
  }, 1000)
}
</script>
