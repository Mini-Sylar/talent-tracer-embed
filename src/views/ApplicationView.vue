<template>
  <div class="application-container">
    <div>
      <Suspense v-if="showDescription != ''">
        <template #default>
          <JobDescription></JobDescription>
        </template>
        <template #fallback>
          <div v-if="!errorState">
            <Skeleton width="45%" height="2.5rem"></Skeleton>
            <br />
            <div class="loading-description">
              <Skeleton width="100%" height="1rem"></Skeleton>
              <Skeleton width="100%" height="1rem"></Skeleton>
              <Skeleton width="100%" height="1rem"></Skeleton>
              <Skeleton width="100%" height="1rem"></Skeleton>
              <Skeleton width="100%" height="1rem"></Skeleton>
            </div>
          </div>
          <div v-else>
            <h4>
              There was an issue displaying job description. <br />
              Check the following:
            </h4>
            <ul>
              <li>is <Tag value="job_id" severity="warning" /> provided in your url?</li>
            </ul>
          </div>
        </template>
      </Suspense>
    </div>
    <div>
      <SubmissionForm></SubmissionForm>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onErrorCaptured, ref } from 'vue'
import SubmissionForm from '@/components/SubmissionForm.vue'
import JobDescription from '@/components/JobDescription.vue'
import { useAppStateStore } from '@/stores/app_state'
import { storeToRefs } from 'pinia'
import { useToast } from 'primevue/usetoast'

const errorState = ref(false)
const appStateStore = useAppStateStore()
const toast = useToast()
const { showDescription } = storeToRefs(appStateStore)

onErrorCaptured((error) => {
  toast.add({
    severity: 'error',
    summary: 'Error',
    detail: error.message,
    life: 3000
  })
  errorState.value = true
})
</script>

<style scoped>
.loading-description {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 2rem;
}

.application-container{
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-top: 2rem;
}
</style>