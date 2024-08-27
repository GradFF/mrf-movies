<template>
  <div>
    <RouterLink :to="{ name: 'home' }" class="btn link">
      <LeftIcon class="size-4 mr-2" />
      Voltar
    </RouterLink>
    <h1 class="title-sm mt-4">Editar perfil</h1>

    <div class="w-full mt-8">
      <form @submit.prevent="onSubmit">
        <div class="w-full flex items-center space-x-6">
          <FormInput
            id="name"
            v-model="user.displayName"
            label="Nome"
            required
            class="md:w-1/2"
          />

          <FormInput
            id="email"
            type="e-mail"
            v-model="user.email"
            label="E-mail"
            required
            readonly
            class="md:w-1/2"
          />
        </div>
        <div class="mt-8">
          <FormSubmit :loading="loading">Alterar</FormSubmit>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import LeftIcon from '@/components/icons/LeftIcon.vue'
import FormInput from '@/components/FormInput.vue'
import FormSubmit from '@/components/FormSubmit.vue'

import { ref } from 'vue'
import { auth } from '@/firebase'
import { useStore } from '@/stores'
import { storeToRefs } from 'pinia'
import { updateProfile } from 'firebase/auth'

const store = useStore()

const { user } = storeToRefs(store)

const loading = ref(false)

const onSubmit = async () => {
  loading.value = true
  try {
    await updateProfile(auth.currentUser, {
      displayName: user.value.displayName
    })

    alert('Usuário alterado com sucesso.')
  } catch (error) {
    console.log(error)
  } finally {
    loading.value = false
  }
}
</script>
