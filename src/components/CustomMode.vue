<template>
  <div>
    <form class="form-container">
      <div class="form-field" v-for="(field, index) in customFields" :key="index">
        <label class="form-label" :for="field.name" style="text-transform: capitalize">{{
          field.name
        }}</label>
        <InputText
          v-if="field.type == 'input'"
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
        <small class="p-error">{{ errors[field.name] || '&nbsp;' }}</small>
      </div>
      <div class="form-field">
        <Button label="Submit" @click="onSubmit" :loading="isSubmitting" />
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

type CustomField = Array<{
  name: string
  type: 'input' | 'file' | 'radio' | 'checkbox'
}>
const appState = useAppStateStore()
const { customFields } = storeToRefs(appState) as unknown as {
  customFields: ComputedRef<CustomField>
}

const { errors, fields, onSubmit, isSubmitting } = useCustomSubmissionSchema()
</script>

<style scoped></style>
