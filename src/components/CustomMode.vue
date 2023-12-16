<template>
  <div>
    <form class="form-container">
      <div class="form-field" v-for="(field, index) in customFields" :key="index">
        <label class="form-label" :for="field.name" style="text-transform: capitalize">{{
          field.name
        }}</label>
        <!-- @vue-skip -->
        <InputText
          v-if="field.type == 'input' && fields[field.name]"
          :class="{ 'p-invalid': errors[field.name] }"
          :placeholder="field.name"
          v-model="fields[field.name].value"
        ></InputText>
        <CustomFileUpload
          v-else-if="field.type == 'file'"
          :class="{ 'p-invalid': errors[field.name] }"
          :placeholder="field.name"
          v-model="fields[field.name].value"
          :errors="errors[field.name]"
        ></CustomFileUpload>
        <!-- set up other components -->
        <small class="p-error">{{ errors[field.name] || '&nbsp;' }}</small>
      </div>
      <div class="form-field">
        <Button label="Submit" @click="handleSubmit" :loading="isSubmitting" />
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { useAppStateStore } from '@/stores/app_state'
import { storeToRefs } from 'pinia'
import { type ComputedRef } from 'vue'
import { useCustomSubmissionSchema } from '@/schemas/useCustomSubmission'
import CustomFileUpload from '@/components/custom/CustomFileUpload.vue'
import { type CustomField } from '@/types/custom_apply.types'
import { useToast } from 'primevue/usetoast'

const toast = useToast()
const appState = useAppStateStore()
const { customFields } = storeToRefs(appState) as unknown as {
  customFields: ComputedRef<CustomField>
}

const { errors, fields, onSubmit, isSubmitting } = useCustomSubmissionSchema()

const handleSubmit = async () => {
  try {
    onSubmit && (await onSubmit())
    toast.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Your submission has been received.',
      life: 4000
    })
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
