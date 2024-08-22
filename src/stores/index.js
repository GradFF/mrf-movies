import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useStore = defineStore('main', () => {
  const user = ref({ name: 'MrfNeto' })

  return { user }
})
