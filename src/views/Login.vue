<template>
  <div>
    <h1 class="title-sm">Entrar</h1>
    <p>Entre com e-mail e senha para acessar sua conta.</p>

    <form class="mt-8" @submit.prevent="onSubmit">
      <FormInput
        id="email"
        type="email"
        label="E-mail"
        required
        v-model="email"
      />
      <FormInput
        id="password"
        type="password"
        label="senha"
        required
        v-model="password"
        class="mt-4"
      />

      <RouterLink to="#" class="link float-right mt-2">
        Esqueceu sua senha?
      </RouterLink>

      <FormSubmit :loading="loading" class="w-full mt-6">Entrar</FormSubmit>
    </form>
    <div class="mt-4 text-center">
      <RouterLink :to="{ name: 'register' }" class="link">
        Criar conta
      </RouterLink>
    </div>
  </div>
</template>

<script setup>
import FormInput from '@/components/FormInput.vue'
import FormSubmit from '@/components/FormSubmit.vue'
import { ref } from 'vue'

const email = ref('')
const password = ref('')

const loading = ref(false)

const onSubmit = () => {
  loading.value = true
  setTimeout(() => {
    console.log('Submitted:', email.value, password.value)
    loading.value = false
  }, 1000)
}
</script>
