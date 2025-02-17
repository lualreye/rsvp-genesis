<script setup lang="ts">
import { onMounted, ref } from 'vue';
import Loader from './components/Loader.vue';

const isLoading = ref(false)
const video = ref<HTMLVideoElement | null>(null);
const backgroundVideo = ref<HTMLVideoElement | null>(null);
const invitationIsOpen = ref(false)

const onVideoEnd = () => {
  if (video.value) {
    video.value.pause();
    video.value.currentTime = video.value.duration;
  }
};

function playMusic() {
  invitationIsOpen.value = true
  isLoading.value = true
  setTimeout(
    () => isLoading.value = false,
    1500
  )
  if (video.value) {
    video.value.play();
  }
}

onMounted(() => {
});

</script>

<template>
  <div class="app-container">
    <button v-if="!invitationIsOpen" @click="playMusic">
      Ver invitacion
    </button>
    <Loader :isLoading="isLoading && invitationIsOpen"></Loader>
  
    <!-- VIDEO INVITATION -->
    <div v-if="!isLoading && invitationIsOpen" class="video-container">
      <video autoplay muted playsinline @ended="onVideoEnd" class="video">
        <source src="./assets/invitation.mp4" type="video/mp4" />
        Tu navegador no soporta la etiqueta de video.
      </video>
    </div>
  </div>

  <!-- VIDEO SONG -->
  <div
    v-if="!isLoading && invitationIsOpen"
    class="hidden">
    <video
      id="background-video"
      autoplay
      loop
      playsinline
      ref="backgroundVideo">
      <source src="./assets/cancion.mp4" type="video/mp4">
    </video>
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

.hidden {
  width: 1px;
  height: 1px;
  overflow: hidden;
  position: absolute;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
</style>
