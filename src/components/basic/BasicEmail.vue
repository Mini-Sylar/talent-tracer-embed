<template>
  <div class="form-field">
    <label for="email" class="form-label">Email</label>
    <InputText
      id="email"
      :class="{ 'p-invalid': errors?.email }"
      placeholder="Email"
      v-model="email"
    ></InputText>
    <small id="text-error" class="p-error">{{ errors?.email || '&nbsp;' }}</small>
  </div>
</template>

<script setup lang="ts">
import { inject } from 'vue'
import { type BasicApplicationSchemaType } from '@/types/basic_apply.types'

const email = inject<BasicApplicationSchemaType['email']>('email')
const errors = inject<BasicApplicationSchemaType['errors']>('errors')
</script>

<style scoped></style>
