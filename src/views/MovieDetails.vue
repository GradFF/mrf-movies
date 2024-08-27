<template>
  <div>
    <RouterLink :to="{ name: 'home' }" class="btn link">
      <LeftIcon class="size-4 mr-2" />
      Voltar
    </RouterLink>

    <div  >
      <div v-if="movie">
        <div class="flex items-center space-x-8 mt-4">
          <h1 class="title-sm">{{ movie?.title }}</h1>

          <div class="flex space-x-2" v-if="movie.score">
            <StarIcon
              v-for="i in parseInt(movie.score)"
              :key="i"
              class="size-3 text-indigo-500"
            />
          </div>
        </div>
        <div class="flex items-center space-x-4 body">
          <span> Por {{ movie.user?.displayName }}</span>
          <span>{{ formatDateTime(movie.createdAt) }}</span>
        </div>
        <ul class="flex space-x-2 mt-4">
          <li
            class="body-sm muted px-2 rounded bg-zinc-900"
            v-for="(gender, index) in movie.genres"
            :key="index"
          >
            {{ gender }}
          </li>
        </ul>
        <p class="body mt-6">
          {{ movie.note }}
        </p>

        <div class="mt-8 flex items-center space-x-6">
          <RouterLink
            :to="{ name: 'movies-update', params: { id: id } }"
            class="btn btn-outline w-1/4"
          >
            Editar
          </RouterLink>
          <button
            class="btn btn-danger w-1/4"
            :disabled="loading"
            @click="removeMovie"
          >
            <span v-if="loading">Aguarde ...</span>
            <span v-else>Excluir</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import LeftIcon from '@/components/icons/LeftIcon.vue'
import StarIcon from '@/components/icons/StarIcon.vue'

import { useRoute, useRouter } from 'vue-router'
import { computed, onMounted, ref } from 'vue'
import { useFirestore } from '@/firebase/useFirestore'
import { formatDateTime } from '@/utils/date'

const route = useRoute()
const router = useRouter()

const { loading, find, remove } = useFirestore('movies')

const movie = ref({})

const id = computed(() => route.params.id)

onMounted(async () => {
  movie.value = await find(id.value)

  if (!movie.value) {
    router.replace({ name: 'home' })
    alert('Registro não localizado.')
  }
})

const removeMovie = async () => {
  const result = await remove(id.value, 'home')
  result && alert('Filme deletado.')
}
</script>
