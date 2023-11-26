<template>
  <form class="form-container">
    <div class="form-field">
      <label for="name" class="form-label">Name</label>
      <InputText
        id="name"
        :class="{ 'p-invalid': errors.name }"
        placeholder="Name"
        v-model="name"
      ></InputText>
      <small id="text-error" class="p-error">{{ errors.name || '&nbsp;' }}</small>
    </div>
    <div class="form-field">
      <label for="email" class="form-label">Email</label>
      <InputText
        id="email"
        :class="{ 'p-invalid': errors.email }"
        v-model="email"
        placeholder="email"
      ></InputText>
      <small id="text-error" class="p-error">{{ errors.email || '&nbsp;' }}</small>
    </div>
    <div class="form-field">
      <label for="file" class="form-label">File</label>
      <FileUpload
        id="file"
        :class="{ 'p-invalid': errors.file }"
        name="file[]"
        mode="basic"
        accept="application/pdf"
        :maxFileSize="500000"
        chooseLabel="Select File"
        uploadLabel="Upload"
        cancelLabel="Cancel"
        :auto="false"
        @select="onSelect"
      ></FileUpload>
      <small id="text-error" class="p-error">{{ errors.file || '&nbsp;' }}</small>
    </div>
    <div class="form-field">
      <Button type="submit" label="Submit" :disabled="isSubmitting" @click="handleSubmit"></Button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { useSubmissionSchema } from '@/schemas/useSubmissionSchema'

const { email, errors, file, isSubmitting, name, onSubmit } = useSubmissionSchema()

const onSelect = (event: any) => {
  file.value = event.files[0] as File
}

const handleSubmit = async () => {
  try {
    await onSubmit()
  } catch (error) {
    console.log(error)
  }
}
</script>

<style scoped></style>
