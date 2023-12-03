<template>
  <main class="main-container">
    <ApplicationView></ApplicationView>
    <Toast :position="setPosition" />
  </main>
</template>

<script setup lang="ts">
import ApplicationView from '@/views/ApplicationView.vue'
import Toast from 'primevue/toast'
import { usePrimeVue } from 'primevue/config'
import { useAppStateStore } from './stores/app_state'
import { computed } from 'vue'
const setPosition = computed(() => {
  return window.screen.width < 768 ? 'bottom-center' : 'top-center'
})
const appState = useAppStateStore()
const prime = usePrimeVue()
prime.changeTheme('lara-light-green', appState.theme, 'theme-link', () => {})
</script>

<style></style>
