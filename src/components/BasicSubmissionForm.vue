<template>
  <div>
    <form class="form-container">
      <BasicName></BasicName>
      <BasicEmail></BasicEmail>
      <BasicFileUpload></BasicFileUpload>
    </form>
  </div>
</template>

<script setup lang="ts">
import BasicName from './basic/BasicName.vue'
import BasicEmail from './basic/BasicEmail.vue'
import BasicFileUpload from './basic/BasicFileUpload.vue'
</script>
