<template>
  <div>
    <RouterLink :to="{ name: 'home' }" class="btn link">
      <LeftIcon class="size-4 mr-2" />
      Voltar
    </RouterLink>
    <h1 class="title-sm mt-4">Novo filme</h1>

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
        v-model="form.score"
        label="observações"
        required
        placeholder="Observações"
        max="5"
        class="mt-4"
      />
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
import { ref } from 'vue'

const form = ref({
  title: '',
  score: '',
  note: ''
})

const loading = ref(false)

const onSubmit = () => {
  loading.value = true
  setTimeout(() => {
    console.log('Submitted:', email.value, password.value)
    loading.value = false
  }, 1000)
}
</script>
