import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/firebase'

export const useStore = defineStore('main', () => {
  const user = ref({ name: 'MrfNeto' })

  const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
      onAuthStateChanged(
        auth,
        u => {
          user.value = u
          resolve(u)
        },
        e => reject(e)
      )
    })
  }

  return { user, getCurrentUser }
})
