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
  invitationIsOpen.value = true;
  isLoading.value = true;

  setTimeout(() => {
    isLoading.value = false;

    if (video.value) {
      video.value.load();
      video.value.oncanplaythrough = () => {
        console.log("Video listo para reproducirse");
        video.value?.play().catch(err => console.error("Error reproduciendo el video", err));
      };
    }

    if (backgroundVideo.value) {
      backgroundVideo.value.load();
      backgroundVideo.value.oncanplaythrough = () => {
        console.log("Background video listo para reproducirse");
        backgroundVideo.value?.play().catch(err => console.error("Error reproduciendo el video de fondo", err));
      };
    }
  }, 1500);
}


function openCloseModal(): void {
  isModalOpen.value = !isModalOpen.value
}

function setModal(type: string): void {
  modalType.value = type
  openCloseModal()
}

onMounted(async () => {
  try {
    const id = route.params.id;
    
    await confirmationStore.postData(id as string);

    if (video.value) {
      video.value.load();
    }

    if (backgroundVideo.value) {
      backgroundVideo.value.load();
    }

  } catch (error) {
    console.error("Error cargando datos", error);
  }
});

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
        <video ref="video" muted playsinline autoplay preload="auto" @ended="onVideoEnd" class="video">
          <source src="../../public/invitation.mp4" type="video/mp4" />
          Tu navegador no soporta la etiqueta de video.
        </video>

      <template v-if="!confirmationStore.user.asistencia.length">
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
      </template>

      <h2 v-else class="name">
        Asistencia respondida
      </h2>

    </div>

    <!-- VIDEO SONG -->
    <div v-if="invitationIsOpen" class="hidden">
      <video ref="backgroundVideo" id="background-video" loop playsinline preload="auto">
        <source src="../../public/cancion.mp4" type="video/mp4" />
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
  color: #f6f2e5;
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
  min-width: 280px;
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
