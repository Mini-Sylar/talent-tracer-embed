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
import { useAppStateStore } from './stores/app_state'
const appState = useAppStateStore()
const prime = usePrimeVue()
prime.changeTheme('lara-light-green', appState.theme, 'theme-link', () => {})
</script>

<style></style>
