<template>
  <div>
    <h2 style="text-align: center">Apply Now</h2>
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
        <label for="file" class="form-label">Resume/CV</label>
        <FileUpload
          ref="fileUpload"
          id="file"
          :class="{ 'p-invalid': errors.file }"
          name="file[]"
          accept="application/pdf"
          :maxFileSize="5000000"
          chooseLabel="Select File"
          :auto="false"
          :showUploadButton="true"
          :fileLimit="1"
          @select="onSelect"
        >
          <template #header="{ chooseCallback, files }">
            <div>
              <div style="display: flex; gap: 1rem">
                <Button
                  @click="chooseCallback()"
                  label="Select File"
                  :disabled="files.length >= 1"
                ></Button>
              </div>
            </div>
          </template>
          <template #content="{ files, removeFileCallback }">
            <div v-if="files.length > 0">
              <div>
                <div
                  style="
                    display: flex;
                    justify-content: space-evenly;
                    align-items: center;
                    flex-wrap: wrap;
                    gap: 1rem;
                  "
                  v-for="(file, index) of files"
                  :key="file.name + file.type + file.size"
                >
                  <div>
                    <span>{{ file.name }}</span>
                    <div>{{ formatSize(file.size) }}</div>
                  </div>
                  <Badge value="File Ready" severity="success" />
                  <Button
                    @click="removeFileCallback(index)"
                    label="Remove File"
                    severity="danger"
                  />
                </div>
              </div>
            </div>
          </template>
        </FileUpload>
        <small id="text-error" class="p-error">{{ errors.file || '&nbsp;' }}</small>
      </div>
      <div class="form-field">
        <Button type="submit" label="Submit" :loading="isSubmitting" @click="handleSubmit"></Button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { useSubmissionSchema } from '@/schemas/useSubmissionSchema'
import { useToast } from 'primevue/usetoast'
import { usePrimeVue } from 'primevue/config'
import { ref } from 'vue'

const toast = useToast()
const prime = usePrimeVue()
const { email, errors, file, isSubmitting, name, onSubmit } = useSubmissionSchema()

const fileUpload = ref()

const onSelect = (event: any) => {
  file.value = event.files[0] as File
}

const formatSize = (bytes: number) => {
  const k = 1024
  const dm = 3
  const sizes = prime.config.locale!.fileSizeTypes

  if (bytes === 0) {
    return `0 ${sizes[0]}`
  }

  const i = Math.floor(Math.log(bytes) / Math.log(k))
  const formattedSize = parseFloat((bytes / Math.pow(k, i)).toFixed(dm))

  return `${formattedSize} ${sizes[i]}`
}

const handleSubmit = async () => {
  try {
    await onSubmit()
    toast.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Your submission has been received.',
      life: 4000
    })
    fileUpload.value.clear()
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
