<template>
  <div style="display: grid; place-content: center">
    <h2>
      Make a <Tag>GET</Tag> request to <Tag severity="info">{{ currentLocation }}</Tag> with the
      following Params:
    </h2>
    <code><Tag severity="warning">job_id:</Tag> xxxxxx-xx-xxxx-xxxx</code>
    <br />
    <code><Tag severity="warning">custom_response</Tag>: true</code>
    <br />
    <code><Tag severity="warning">application_json</Tag>: {stringified json} </code>
    <div>
      <h3>Example:</h3>
      <code>
        <Tag severity="info">{{ currentLocation }}</Tag>
        <Tag severity="success">?job_id=xxxxxx-xx-xxxx-xxxx</Tag>
        <Tag severity="warning">&custom_response=true</Tag>
        <Tag severity="danger">&application_json='{"name":"UserName",email:"example@you.com"}'</Tag>
      </code>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const currentLocation = ref(window.location.origin)
</script>

<style scoped>
code {
  display: block;
}
</style>
