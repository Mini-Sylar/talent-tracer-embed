<template>
  <div>
    <form class="form-container">
      <BasicName></BasicName>
      <BasicEmail></BasicEmail>
      <BasicFileUpload :reset-field="resetField"></BasicFileUpload>
      <BasicSubmit @success="resetField = true"></BasicSubmit>
    </form>
  </div>
</template>

<script setup lang="ts">
import BasicName from './basic/BasicName.vue'
import BasicEmail from './basic/BasicEmail.vue'
import BasicFileUpload from './basic/BasicFileUpload.vue'
import BasicSubmit from './basic/BasicSubmit.vue'
import { ref } from 'vue'

const resetField = ref(false)
</script>
