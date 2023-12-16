import { defineStore, acceptHMRUpdate } from 'pinia'
import { ref, computed } from 'vue'
export const useAppStateStore = defineStore('app_state', () => {
  const urlParams = ref(new URLSearchParams(window.location.search))
  const job_id = computed(() => urlParams.value.get('job_id'))
  const isCustomMode = computed(() => urlParams.value.get('custom_mode'))
  const customFields = computed(
    () =>
      urlParams.value.get('custom_fields') &&
      JSON.parse(urlParams.value.get('custom_fields') as string)
  )
  console.log(customFields.value)
  const showDescription = computed(() => urlParams.value.get('job_description'))
  const theme = computed(() => urlParams.value.get('theme') || 'lara-light-green')

  return { job_id, isCustomMode, showDescription, theme, customFields }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAppStateStore, import.meta.hot))
}
