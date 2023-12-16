<template>
  <div class="submission-container">
    <h2 style="text-align: center">Apply Now</h2>
    <form class="form-container">
      <BasicName></BasicName>
      <BasicEmail></BasicEmail>
      <BasicFileUpload></BasicFileUpload>
      <BasicSubmit></BasicSubmit>
    </form>
  </div>
</template>

<script setup lang="ts">
import BasicName from './basic/BasicName.vue'
import BasicEmail from './basic/BasicEmail.vue'
import BasicFileUpload from './basic/BasicFileUpload.vue'
import BasicSubmit from './basic/BasicSubmit.vue'

</script>

<style scoped>
.submission-container {
  width: min(100%, 800px);
  margin: 0 auto;
}
</style>
