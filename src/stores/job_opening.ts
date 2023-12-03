import { defineStore, acceptHMRUpdate } from 'pinia'
import { ref } from 'vue'
import { supabase } from '@/services/supabaseClient'
import { type Tables } from '@/types/database.types'
import { useAppStateStore } from './app_state'
export const useJobOpeningStore = defineStore('job_opening', () => {
  type JobOpening = Pick<Tables<'job_opening'>, 'title' | 'description' | 'keywords' | 'location'>
  const currentOpening = ref<JobOpening[]>([])

  async function fetchJobOpening() {
    try {
      if (currentOpening.value.length > 0) return currentOpening.value
      const jobId = useAppStateStore().job_id
      if (!jobId) {
        throw new Error('Job ID is required')
      }
      const { data, error } = await supabase
        .from('job_opening')
        .select('title, description,keywords,location')
        .eq('user_external_key', jobId)

      if (error) {
        throw new Error(error.message)
      }
      currentOpening.value = data || []
      return data
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  return { fetchJobOpening, currentOpening }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useJobOpeningStore, import.meta.hot))
}
