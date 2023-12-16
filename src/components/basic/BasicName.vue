<template>
  <div class="form-field">
    <label for="name" class="form-label">Name</label>
    <InputText
      id="name"
      :class="{ 'p-invalid': errors?.name }"
      placeholder="Name"
      v-model="name"
    ></InputText>
    <small id="text-error" class="p-error">{{ errors?.name || '&nbsp;' }}</small>
  </div>
</template>

<script setup lang="ts">
import { inject } from 'vue'
import { type BasicApplicationSchemaType } from '@/types/basic_apply.types'

const name = inject<BasicApplicationSchemaType['name']>('name')
const errors = inject<BasicApplicationSchemaType['errors']>('errors')
</script>

<style scoped></style>
