<template>
  <div>
    <div class="flex items-center justify-between">
      <h1 class="title-sm">Meus filmes</h1>
      <RouterLink :to="{ name: 'movies-create' }" class="btn btn-primary">
        <PlusIcon class="size-5 mr-2" />
        Adiconar filme
      </RouterLink>
    </div>

    <div class="mt-8">
      <ul>
        <li class="p-4 rounded w-full bg-zinc-900">
          <RouterLink :to="{ name: 'movies-show', params: { id: 1 } }">
            <h2 class="subtitle">O Poderoso Chefão</h2>
            <div class="flex space-x-2">
              <StarIcon
                v-for="item in 5"
                :key="item.id"
                class="size-3 text-indigo-500"
              />
            </div>
            <p class="body-sm mt-2">
              Don Vito Corleone (Marlon Brando) é o chefe de uma "família" de
              Nova York que está feliz, pois Connie (Talia Shire), sua filha, se
              casou com Carlo (Gianni Russo). Porém, durante a festa, Bonasera
              (Salvatore Corsitto) é visto no escritório de Don Corleone pedindo
              "justiça", vingança na verdade contra membros de uma quadrilha,
              que espancaram ...
            </p>
            <ul class="flex space-x-2">
              <li class="body-sm muted px-2 rounded bg-zinc-950">Policial</li>
              <li class="body-sm muted px-2 rounded bg-zinc-950">Drama</li>
            </ul>
          </RouterLink>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import PlusIcon from '@/components/icons/PlusIcon.vue'
import StarIcon from '@/components/icons/StarIcon.vue'
import { useStore } from '@/stores'

const { user } = useStore()
</script>

<style lang="scss" scoped></style>
