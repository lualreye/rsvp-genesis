<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import Loader from '../components/Loader.vue';
import Modal from '../components/Modal.vue'
import useConfirmationStore from '../store/confirmation';

const route = useRoute()
const confirmationStore = useConfirmationStore()
const isLoading = ref(false)
const video = ref<HTMLVideoElement | null>(null);
const backgroundVideo = ref<HTMLVideoElement | null>(null);
const invitationIsOpen = ref(false)
const isModalOpen = ref(false)
const modalType = ref('confirmar')

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

function openCloseModal(): void {
  isModalOpen.value = !isModalOpen.value
}

function setModal(type: string): void {
  modalType.value = type
  openCloseModal()
}

onMounted(() => {
  const id = route.params.id

  confirmationStore.postData(id as string)
})
</script>

<template>
  <div v-if="confirmationStore.user" class="app-container">
    <div v-if="!invitationIsOpen" class="invitation-title">
      <h2 class="name">
        {{ confirmationStore.user.nombre }} {{ confirmationStore.user.apellido }}
      </h2>

      <h1 class="title">
        Nos hace mucha ilusión invitarte a nuestra boda
      </h1>

      <button @click="playMusic" class="button">
        Abrir invitación
      </button>
    </div>

    <Loader :isLoading="isLoading && invitationIsOpen"></Loader>

    <!-- VIDEO INVITATION -->
    <div v-if="!isLoading && invitationIsOpen" class="video-container">
      <video autoplay muted playsinline @ended="onVideoEnd" class="video">
        <source src="./assets/invitation.mp4" type="video/mp4" />
        Tu navegador no soporta la etiqueta de video.
      </video>

      <h2 class="name">
        {{ confirmationStore.user.nombre }} {{ confirmationStore.user.apellido }}
      </h2>
      <p class="name">
        Tienes
        <span class="admission">
          {{ confirmationStore.user.admisiones }}
        </span>
        admisión/es
      </p>
      <div class="action-buttons">
        <button
          @click="setModal('confirmar')"
          class="button">
          Confirmar
        </button>
        <button
          @click="setModal('declinar')"
          @close-modal="openCloseModal"
          class="button-2">
          Declinar
        </button>
      </div>
    </div>

    <!-- VIDEO SONG -->
    <div v-if="invitationIsOpen" class="hidden">
      <video
        id="background-video" autoplay loop playsinline ref="backgroundVideo">
        <source src="./assets/cancion.mp4" type="video/mp4" />
      </video>
    </div>

    <!-- MODAL -->
     <Modal
      :isOpen="isModalOpen"
      :modalType="modalType"
      @close-modal="openCloseModal" />
  </div>
</template>


<style scoped>
.app-container {
  background: #f6f2e5;
  min-height: 100vh;
  margin: auto 0;
  padding: 0;
  box-sizing: border-box;
  display: flex;
  gap: 24px;
}

.invitation-title {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 32px;
}

.name {
  font-weight: 400;
  font-family: "Yellowtail", serif;
  color: #2A1F2D;
  margin: 0;
  font-size: 2.5rem;
  text-transform: capitalize;
}

.title {
  color: #656c52;
  font-size: 2rem;
  font-weight: 400;
  margin: 0;
  font-family: "Yellowtail", serif;
}

.button {
  background-color: #656c52;
  padding: 24px 56px;
  border-color: none;
}

.button-2 {
  border: 1px solid #656c52;
  color: #656c52;
  background: transparent;
  padding: 24px 56px;
  border-color: none;
}

.action-buttons {
  display: flex;
  gap: 12px;
  width: 100%;
  justify-content: space-around;
}

.video-container {
  width: 100%;
  padding-bottom: 48px;
  min-width: 320px;
  max-width: 640px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  opacity: 0;
  animation: fadeIn 1s linear forwards;
}

.video {
  border-radius: 8px;
  -webkit-box-shadow: 4px 4px 8px -8px rgba(0,0,0,0.75);
  -moz-box-shadow: 4px 4px 8px -8px rgba(0,0,0,0.75);
  box-shadow: 4px 4px 8px -8px rgba(0,0,0,0.75);
  width: 100%;
  display: flex;
  justify-content: center;
}

.admission {
  font-size: 3rem;
  color: #656c52;
  font-family: "Yellowtail", serif;
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
