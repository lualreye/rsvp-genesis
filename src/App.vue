<script lang="ts" setup>
</script>

<template>
  <div class="images1">
    <img src="../public/tulipanes.webp">
    <img src="../public/tulipanes.webp">
    <img src="../public/tulipanes.webp">
    <img src="../public/tulipanes.webp">
  </div>
  <div class="images1">
    <img src="../public/tulipanes.webp">
    <img src="../public/tulipanes.webp">
    <img src="../public/tulipanes.webp">
    <img src="../public/tulipanes.webp">
  </div>
  <RouterView />
  <div class="images-2">
    <img src="../public/tulipan3.webp">
    <img src="../public/tulipan3.webp">
    <img src="../public/tulipan3.webp">
    <img src="../public/tulipan3.webp">
  </div>
</template>

<style scoped>
.images1 {
  position: fixed;
  top: 0;
  left: 0;
}

.images1 img:first-child {
  transform: rotateZ(120deg);
  width: 120px;
  height: 120px;
  position: fixed;
  top: 90px;
  left: -6px;
}
.images1 img:nth-child(2) {
  transform: rotateZ(172deg);
  width: 120px;
  height: 120px;
  position: fixed;
  top: -14px;
  left: 40px;
}
.images1 img:nth-child(3) {
  transform: rotateZ(140deg);
  width: 120px;
  height: 120px;
  position: fixed;
  top: 20px;
  left: -14px;
}
.images1 img:last-child {
  transform: rotateZ(200deg);
  width: 120px;
  height: 120px;
  position: fixed;
  top: -10px;
  left: 100px;
}

.images-2 {
  position: fixed;
  bottom: 0;
  right: 0;
}

.images-2 img:first-child {
  transform: rotateZ(120deg);
  width: 80px;
  height: 80px;
  position: fixed;
  top: 60px;
  left: -6px;
}
.images-2 img:nth-child(2) {
  transform: rotateZ(172deg);
  width: 80px;
  height: 80px;
  position: fixed;
  top: -10px;
  left: 20px;
}
.images-2 img:nth-child(3) {
  transform: rotateZ(140deg);
  width: 80px;
  height: 80px;
  position: fixed;
  top: 20px;
  left: -12px;
}
.images-2 img:last-child {
  transform: rotateZ(225deg);
  width: 80px;
  height: 80px;
  position: fixed;
  top: -10px;
  left: 70px;
}
</style>