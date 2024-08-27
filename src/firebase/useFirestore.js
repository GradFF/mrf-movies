import { db } from '.'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  updateDoc,
  where
} from 'firebase/firestore'

export const useFirestore = collectionName => {
  const loading = ref(false)

  const router = useRouter()

  const save = async (data, id = null) => {
    loading.value = true
    try {
      const result = id
        ? await updateDoc(doc(db, collectionName, id), data)
        : await addDoc(collection(db, collectionName), data)

      return id ? id : result
    } catch (error) {
      console.log(error)
    } finally {
      loading.value = false
    }
  }

  const remove = async (id, routerName = null) => {
    loading.value = true
    try {
      const userConfirmed = confirm(
        'Tem certeza que deseja deletar este registro?'
      )

      if (userConfirmed) {
        await deleteDoc(doc(db, collectionName, id))
        routerName && router.replace({ name: routerName })
        return true
      }
      return false
    } catch (error) {
      console.log(error)
    } finally {
      loading.value = false
    }
  }

  const find = async id => {
    loading.value = true
    try {
      const snapshot = await getDoc(doc(db, collectionName, id))
      return snapshot.exists ? snapshot.data() : null
    } catch (error) {
      console.log(error)
    } finally {
      loading.value = false
    }
  }

  const get = async ({
    filters = [],
    sorting = [],
    limitCount = null,
    startAfterDoc = null
  }) => {
    loading.value = true
    try {
      let queryRef = collection(db, collectionName)

      // Apply where clauses if provided
      if (filters.length > 0) {
        filters.forEach(({ field, operator, value }) => {
          queryRef = query(queryRef, where(field, operator, value))
        })
      }

      // Apply order by clauses if provided
      if (sorting.length > 0) {
        sorting.forEach(({ field, direction }) => {
          queryRef = query(queryRef, orderBy(field, direction))
        })
      }

      // Apply limit if provided
      if (limitCount) {
        queryRef = query(queryRef, limit(limitCount))
      }

      // Apply start after for pagination if provided
      if (startAfterDoc) {
        queryRef = query(queryRef, startAfter(startAfterDoc))
      }

      // Execute the query
      const querySnapshot = await getDocs(queryRef)
      // Return the documents and the last visible document for pagination
      const docs = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1]

      return { docs, lastVisible }
    } catch (error) {
      console.log('Erro ao buscar registros.')
    } finally {
      loading.value = false
    }
  }

  return { loading, save, remove, find, get }
}
