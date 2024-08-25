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
        :error="error?.email"
      />
      <FormInput
        id="password"
        type="password"
        label="senha"
        required
        v-model="password"
        class="mt-4"
        :error="error?.password"
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
import { auth } from '@/firebase'
import { useRouter } from 'vue-router'
import { signInWithEmailAndPassword } from 'firebase/auth'

const router = useRouter()

const email = ref('')
const password = ref('')

const error = ref(null)

const loading = ref(false)

const onSubmit = async () => {
  loading.value = true
  error.value = {}
  try {
    await signInWithEmailAndPassword(auth, email.value, password.value)
    router.replace({ name: 'home' })
  } catch (err) {
    switch (err.code) {
      case 'auth/invalid-email':
        error.value.email = 'E-mail inválido'
        break
      case 'auth/user-not-found':
        error.value.email = 'O usuário não correponde à nenhuma credencial.'
        break
      case 'auth/wrong-password':
        error.value.password = 'Senha incorreta'
        break
      default:
        error.value.email = 'E-mail ou senha estavam incorretos'
        break
    }
    console.log(err)
  } finally {
    loading.value = false
  }
}
</script>
