<template>
  <div>
    <h1 class="title-sm">Criar contar</h1>
    <p>Informe os dados abaixo para criar sua conta.</p>

    <form class="mt-8" @submit.prevent="onSubmit">
      <FormInput id="name" type="text" label="Nome" required v-model="name" />
      <FormInput
        id="email"
        type="email"
        label="E-mail"
        required
        v-model="email"
        class="mt-4"
      />
      <FormInput
        id="password"
        type="password"
        label="senha"
        required
        v-model="password"
        class="mt-4"
      />

      <FormSubmit :loading="loading" class="w-full mt-8 ">Cadastrar</FormSubmit>
    </form>
    <div class="mt-4 text-center">
      <RouterLink :to="{ name: 'login' }" class="link">
        Já tenho uma conta
      </RouterLink>
    </div>
  </div>
</template>

<script setup>
import FormInput from '@/components/FormInput.vue'
import FormSubmit from '@/components/FormSubmit.vue'
import { ref } from 'vue'

const name = ref('')
const email = ref('')
const password = ref('')

const loading = ref(false)

const onSubmit = () => {
  loading.value = true
  setTimeout(() => {
    console.log('Submitted:', name.value, email.value, password.value)
    loading.value = false
  }, 1000)
}
</script>
