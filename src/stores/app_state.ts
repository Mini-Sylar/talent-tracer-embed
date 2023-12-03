import { defineStore, acceptHMRUpdate } from 'pinia'
import { ref, computed } from 'vue'
export const useAppStateStore = defineStore('app_state', () => {
  const urlParams = ref(new URLSearchParams(window.location.search))

  const job_id = computed(() => urlParams.value.get('job_id'))
  const isCustomResponse = computed(() => urlParams.value.get('custom_response'))
  const customJSON = computed(() => urlParams.value.get('application_json'))
  const showDescription = computed(() => urlParams.value.get('show_description'))

  return { job_id, isCustomResponse, customJSON, showDescription }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAppStateStore, import.meta.hot))
}