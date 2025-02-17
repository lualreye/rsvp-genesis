<script lang="ts" setup>
import { computed } from 'vue';
import useConfirmationStore from '../store/confirmation';


const emit = defineEmits(['close-modal', 'confirmation'])
const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true
  },
  modalType: {
    type: String,
    required: true
  }
})

const confirmationStore = useConfirmationStore()

const buttonText = computed(() => {
  return props.modalType === 'confirmar' ? 'Asistiré' : 'No asistiré'
})

function confirmation(): void {
  if (props.modalType === 'confirmar') {
    console.log('esta confirmando')
  } else {
    console.log('no esta confirmando')
  }
  close()
}

function close() {
  emit('close-modal')
}
</script>

<template>
  <div
    v-if="isOpen"
    class="modal-overlay"
    @click.self="close">
    <div class="modal-content">
      <div class="header">
        <p class="modal-header">
          {{ modalType }}
        </p>
        <button
          class="close-button"
          @click="close">
          X
        </button>
      </div>
      <div class="content">

      </div>
      <div class="action-buttons">
        <button @click="close" class="button-2">
          Cancelar
        </button>
        <button @click="confirmation" class="button">
          {{ buttonText }}
        </button>
    </div>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 90%;
  max-width: 400px;
  text-align: center;
  position: relative;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #656c52; 
}

.modal-header {
  color: #2A1F2D;
  text-transform: capitalize;
  margin: 0;
  font-size: 1.5rem;
  font-weight: 600;
}

.content {
  margin: 12px 0;
}

.close-button {
  padding: 4px 8px;
  font-size: 16px;
  cursor: pointer;
}

.close-button {
  color: #656c52;
}

.action-buttons {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
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


</style>