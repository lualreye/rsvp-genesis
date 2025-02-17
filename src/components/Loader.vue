<script setup lang="ts">
defineProps({
  isLoading: {
    type: Boolean,
    required: true,
  }
})
</script>

<template>
  <div v-if="isLoading" class="loader-container">
    <div class="heart" />
  </div>
</template>

<style scoped>
* { margin: 0; padding: 0; box-sizing: border-box; }

.loader-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  /* background: rgba(255, 255, 255, 0.8); */
  z-index: 1000;
}

.heart {
  position: relative;
  width: 100px;
  height: 100px;
  background-color: #656c52;
  /* border: 5px solid green; */
  transform: rotate(-45deg);
  animation: expand 2s forwards;
}

.heart::before, .heart::after {
  content: "";
  position: absolute;
  width: 100px;
  height: 100px;
  background-color: #656c52;
  border-radius: 50%;
}

.heart::before {
  top: -50px;
  left: 0;
}

.heart::after {
  left: 50px;
  top: 0;
}

@keyframes expand {
  0% {
    transform: rotate(-45deg) scale(1);
    opacity: 1
  }
  100% {
    transform: rotate(-45deg) scale(50);
    opacity: 0;
  }
}
</style>
