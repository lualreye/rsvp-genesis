<script setup lang="ts">
import { onMounted, ref } from 'vue';
import Loader from './components/Loader.vue';

const isLoading = ref(false)

onMounted(() => {
  isLoading.value = true
})
</script>

<template>
  <div class="app-container">
    <Loader :isLoading="!isLoading"></Loader>
      
    <div v-if="isLoading" class="video-container">
      <video width="320" height="240" controls>
        <source src="./assets/invitation.mp4" type="video/mp4" />
        Tu navegador no soporta la etiqueta de video.
      </video>
    </div>
  </div>
</template>

<style scoped>
.app-container {
  background: #f6f2e5;
  min-height: 100vh;
  margin: auto 0;
  padding: 0;
  box-sizing: border-box;
}
.video-container {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0;
  animation: fadeIn 2s ease-in-out 2s forwards;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
</style>
