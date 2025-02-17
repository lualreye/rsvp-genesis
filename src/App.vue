<script setup lang="ts">
import { onMounted, ref } from 'vue';
import Loader from './components/Loader.vue';

const isLoading = ref(false)
const video = ref<HTMLVideoElement | null>(null);

const onVideoEnd = () => {
  if (video.value) {
    video.value.pause();
    video.value.currentTime = video.value.duration;
  }
};

onMounted(() => {
  isLoading.value = true
  setTimeout(
    () => isLoading.value = false,
    1500
  )
  if (video.value) {
    video.value.play();
  }
});

</script>

<template>
  <div class="app-container">
    <Loader :isLoading="isLoading"></Loader>
      
    <div v-if="!isLoading" class="video-container">
      <video autoplay muted playsinline @ended="onVideoEnd" class="video">
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
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0;
  animation: fadeIn 1s linear forwards;
}

.video {
  border-radius: 8px;
  -webkit-box-shadow: 4px 4px 8px -8px rgba(0,0,0,0.75);
  -moz-box-shadow: 4px 4px 8px -8px rgba(0,0,0,0.75);
  box-shadow: 4px 4px 8px -8px rgba(0,0,0,0.75);
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
</style>
