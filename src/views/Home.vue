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
      <div v-if="loading" class="text-center py-4">
        <span class="subtitle-sm">Carregando ...</span>
      </div>
      <ul v-else class="space-y-2">
        <li
          class="p-4 rounded w-full bg-zinc-900"
          v-for="(item, index) in movies"
          :key="index"
        >
          <RouterLink :to="{ name: 'movies-show', params: { id: item.id } }">
            <h2 class="subtitle">{{ item.title }}</h2>
            <div class="flex space-x-2">
              <StarIcon
                v-for="i in parseInt(item.score)"
                :key="i"
                class="size-3 text-indigo-500"
              />
            </div>
            <p class="body-sm mt-2">
              {{ `${item.note.substring(0, 150)} ...` }}
            </p>
            <ul class="flex space-x-2">
              <li
                class="body-sm muted px-2 rounded bg-zinc-950"
                v-for="(gender, index) in item.genres"
                :key="index"
              >
                {{ gender }}
              </li>
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

import { onMounted, ref } from 'vue'
import { useFirestore } from '@/firebase/useFirestore'

const { loading, get } = useFirestore('movies')

const movies = ref([])
const lastVisible = ref(null)

onMounted(async () => {
  const { docs, lastVisible: lastDoc } = await get({
    sorting: [{ field: 'title' }],
    limitCount: 5
  })

  movies.value = docs
  lastVisible.value = lastDoc
})
</script>

<style lang="scss" scoped></style>
