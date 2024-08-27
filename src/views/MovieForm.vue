<template>
  <div>
    <RouterLink :to="{ name: 'home' }" class="btn link">
      <LeftIcon class="size-4 mr-2" />
      Voltar
    </RouterLink>
    <h1 class="title-sm mt-4">{{ id ? 'Editar' : 'Novo' }} Filme</h1>

    <!-- <div v-if="loading" class="text-center py-4">
      <span class="subtitle-sm">Carregando ...</span>
    </div> -->

    <form @submit.prevent="onSubmit" class="mt-8">
      <div class="grid grid-cols-2 gap-4">
        <FormInput
          id="title"
          v-model="form.title"
          label="Título"
          required
          placeholder="Informe o nome do filme"
        />
        <FormInput
          id="score"
          type="number"
          v-model="form.score"
          label="Nota"
          required
          placeholder="Nota de 0 a 5"
          max="5"
        />
      </div>
      <FormInput
        id="score"
        type="textarea"
        v-model="form.note"
        label="observações"
        required
        placeholder="Observações"
        max="5"
        class="mt-4"
      />

      <div class="mt-4">
        <label for="gender" class="body-sm">Gêneros</label>

        <div
          class="flex items-center flex-wrap space bg-zinc-900 rounded p-4 mt-2"
        >
          <ul class="flex items-center space-x-2 w-full">
            <li
              class="relative bg-zinc-950 px-4 py-2 rounded w-full md:w-1/3 lg:w-1/4"
              v-for="(item, index) in form.genres"
              :key="index"
            >
              <div>{{ item }}</div>
              <button
                type="button"
                class="absolute right-3 top-3"
                @click="removeGender(item)"
              >
                <CloseIcon class="size-4" />
              </button>
            </li>
            <li class="relative w-full md:w-1/3 lg:w-1/4">
              <FormInput
                id="gender"
                v-model="gender"
                placeholder="Adicione gênero"
              />
              <button
                type="button"
                class="absolute right-3 top-3"
                @click="addGender"
              >
                <PlusIcon class="size-4" />
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div class="mt-8">
        <FormSubmit :loading="loading" class="w-1/3">Salvar</FormSubmit>
      </div>
    </form>
  </div>
</template>

<script setup>
import LeftIcon from '@/components/icons/LeftIcon.vue'
import FormInput from '@/components/FormInput.vue'
import FormSubmit from '@/components/FormSubmit.vue'
import PlusIcon from '@/components/icons/PlusIcon.vue'
import CloseIcon from '@/components/icons/CloseIcon.vue'

import { useStore } from '@/stores'
import { useRoute, useRouter } from 'vue-router'
import { getCurrentDate } from '@/utils/date'
import { computed, onMounted, ref } from 'vue'
import { useFirestore } from '@/firebase/useFirestore'

const { user } = useStore()
const { loading, save, find } = useFirestore('movies')

const route = useRoute()
const router = useRouter()

const gender = ref('')

const form = ref({
  title: '',
  score: '',
  note: '',
  genres: []
})

const id = computed(() => route.params.id)

const addGender = () => {
  if (gender.value) {
    form.value.genres.push(gender.value)
    gender.value = ''
  }
}

const removeGender = item => {
  form.value.genres = form.value.genres.filter(i => i != item)
}

const onSubmit = async () => {
  if (!id.value) {
    form.value.user = { id: user.uid, displayName: user.displayName }
    form.value.createdAt = getCurrentDate()
  }

  const docRef = await save(form.value, id.value || null)
  alert('Registro salvo com sucesso!')

  router.replace({
    name: 'movies-show',
    params: { id: id.value || docRef.id }
  })
}

onMounted(async () => {
  if (id.value) {
    form.value = await find(id.value)
    if (!form.value) {
      router.replace({ name: 'home' })
      alert('Registro não localizado.')
    }
  }
})
</script>
