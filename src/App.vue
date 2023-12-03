<template>
  <main class="main-container">
    <ApplicationView></ApplicationView>
    <Toast />
  </main>
</template>

<script setup lang="ts">
import ApplicationView from '@/views/ApplicationView.vue'
import Toast from 'primevue/toast'
import { usePrimeVue } from 'primevue/config'

const prime = usePrimeVue()

prime.changeTheme('md-dark-indigo', 'md-light-indigo', 'theme-link', () => {})
</script>

<style></style>
