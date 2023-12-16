<template>
  <div class="form-field" style="margin-top: 2rem">
    <Button type="submit" label="Submit" :loading="isSubmitting" @click="handleSubmit"></Button>
  </div>
</template>

<script setup lang="ts">
import { useToast } from 'primevue/usetoast'
import { inject } from 'vue'
import { type BasicApplicationSchemaType } from '@/types/basic_apply.types'

const emit = defineEmits(['success'])
const isSubmitting = inject<BasicApplicationSchemaType['isSubmitting']>('isSubmitting')
const onSubmit = inject<BasicApplicationSchemaType['onSubmit']>('onSubmit')
const toast = useToast()

const handleSubmit = async () => {
  try {
    onSubmit && (await onSubmit())
    toast.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Your submission has been received.',
      life: 4000
    })
    emit('success')
  } catch (error: any) {
    if (error.type == 'frontend_error') return
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: error?.message || 'An error occurred while submitting your form.',
      life: 4000
    })
  }
}
</script>

<style scoped></style>
