<template>
  <div>
    <div>
      <h1 class="job-heading">
        Open Position: <span style="margin-inline: 0.5rem">"{{ currentOpening[0].title }}</span
        >"
      </h1>
    </div>
    <div class="keywords">
      <ul class="keyword-container">
        <li class="keyword" v-for="keyword in currentOpening[0].keywords" :key="keyword">
          <Tag :value="keyword"></Tag>
        </li>
      </ul>
    </div>
    <div class="location">
      <Tag severity="warning" :value="currentOpening[0].location"></Tag>
    </div>
    <div v-html="currentOpening[0].description"></div>
  </div>
</template>

<script setup lang="ts">
import { useJobOpeningStore } from '@/stores/job_opening'
import { storeToRefs } from 'pinia'

const jobOpeningStore = useJobOpeningStore()
await jobOpeningStore.fetchJobOpening()
const { currentOpening } = storeToRefs(jobOpeningStore)
</script>

<style scoped>
.keyword-container {
  display: flex;
  gap: 1rem;
  list-style: none;
  flex-wrap: wrap;
  padding: 0;
}

.p-tag {
  text-transform: capitalize;
}

@media screen and (max-width: 769px) {
  .job-heading {
    text-align: center;
  }
}
</style>
