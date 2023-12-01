<template>
  <main class="main-container">
    <CustomMode v-if="customResponse == true" />
    <SubmissionForm v-else></SubmissionForm>
    <Toast />
  </main>
</template>

<script setup lang="ts">
import SubmissionForm from './components/SubmissionForm.vue'
import CustomMode from './components/CustomMode.vue'
import Toast from 'primevue/toast'
import { watch, ref } from 'vue'
import { useApplicationStore } from '@/stores/application'
import { useToast } from 'primevue/usetoast'

const toast = useToast()
const URLParams = new URLSearchParams(window.location.search)
const customResponse = ref<boolean>()

// watch(
//   () => URLParams.get('custom_response'),
//   async (value) => {
//     if (value) {
//       if (value === 'true') {
//         try {
//           customResponse.value = true
//           await useApplicationStore().submitApplication()
//         } catch (error: any) {
//           toast.add({
//             severity: 'error',
//             summary: 'Error',
//             detail: error.message,
//             life: 3000
//           })
//           return
//         }
//       } else {
//         customResponse.value = false
//       }
//       // call submission form method
//     }
//   },
//   { immediate: true }
// )
</script>

<style scoped></style>
