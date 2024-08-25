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

      <FormSubmit :loading="loading" class="w-full mt-8">Cadastrar</FormSubmit>
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
import { auth } from '@/firebase'
import {
  createUserWithEmailAndPassword,
  signOut,
  updateProfile
} from 'firebase/auth'

import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const name = ref('')
const email = ref('')
const password = ref('')

const error = ref(null)

const loading = ref(false)

const onSubmit = async () => {
  loading.value = true
  error.value = {}
  try {
    await createUserWithEmailAndPassword(auth, email.value, password.value)
    await updateProfile(auth.currentUser, {
      displayName: name.value
    })
    await signOut(auth)
    alert('Usuário cadastrado com sucesso.')
    router.replace({ name: 'home' })
  } catch (err) {
    switch (err.code) {
      case 'auth/email-already-in-use':
        error.value.email =
          'Já existi uma conta com o endereço de email fornecido.'
        break
      case 'auth/weak-password':
        error.value.password =
          'A senha é inválida, precisa ter pelo menos 6 caracteres.'
        break
      default:
        error.value.email = 'Ocorreu um erro ao criar a conta. Tente novamente'
        break
    }
    console.log(err)
  } finally {
    loading.value = false
  }
}
</script>
