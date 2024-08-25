<template>
  <div class="min-h-screen flex flex-col">
    <header class="border-b border-zinc-700">
      <nav class="container py-4 flex items-center justify-between">
        <div class="flex items-center justify-between">
          <div class="flex flex-col">
            <span class="body-sm">{{ store.user?.displayName }}</span>
            <span class="body-sm muted -mt-1">{{ store.user?.email }}</span>
          </div>
        </div>
        <div class="w-1/2 px-8 text-center">
          <RouterLink to="/">
            <span class="subtitle text-indigo-500">Mrf Movies</span>
          </RouterLink>
        </div>
        <div class="flex items-center space-x-4">
          <button @click="logout" class="btn btn-outline">Sair</button>
        </div>
      </nav>
    </header>
    <main class="flex-1">
      <div class="container py-12">
        <RouterView />
      </div>
    </main>
    <footer class="border-t border-zinc-800 py-2">
      <div class="text-center">
        <a href="http://" target="_blank" rel="noopener noreferrer" class="link"
          >@mrfneto - {{ new Date().getFullYear() }}</a
        >
      </div>
    </footer>
  </div>
</template>

<script setup>
import { auth } from '@/firebase'
import { useStore } from '@/stores'
import { signOut } from 'firebase/auth'
import { useRouter } from 'vue-router'

const router = useRouter()
const store = useStore()

const logout = async () => {
  try {
    await signOut(auth)
    router.replace({ name: 'login' })
  } catch (error) {
    console.log(error)
  }
}
</script>
