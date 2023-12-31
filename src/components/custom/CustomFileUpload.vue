<template>
  <div class="form-field">
    <FileUpload
      ref="fileUpload"
      id="file"
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
              <Button @click="removeFileCallback(index)" label="Remove File" severity="danger" />
            </div>
          </div>
        </div>
      </template>
    </FileUpload>
  </div>
</template>

<script setup lang="ts">
import { usePrimeVue } from 'primevue/config'
import { ref, watch } from 'vue'

const props = defineProps<{
  resetField: boolean
}>()
const file = defineModel()
const prime = usePrimeVue()
const fileUpload = ref()
const onSelect = (event: any) => {
  file!.value = event.files[0] as File
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

watch(
  () => props.resetField,
  (resetField) => {
    if (resetField) {
      fileUpload.value.clear()
    }
  }
)
</script>

<style scoped></style>
