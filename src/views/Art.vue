<script setup>
const paintings = [
  { src: "/art/painting1.jpg", title: "Untitled 1" },
  { src: "/art/painting2.jpg", title: "Untitled 2" },
  { src: "/art/painting3.jpg", title: "Untitled 3" },
];
</script>

<template>
  <div class="card">
    <h2>Painting</h2>
    <div class="grid">
      <figure v-for="p in paintings" :key="p.src" class="tile">
        <img :src="p.src" :alt="p.title" />
        <figcaption>{{ p.title }}</figcaption>
      </figure>
    </div>
  </div>
</template>

<style scoped>
.card { border: 1px solid rgba(0,0,0,0.12); border-radius: 16px; padding: 18px; }
.grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-top: 10px; }
.tile { margin: 0; border: 1px solid rgba(0,0,0,0.12); border-radius: 14px; overflow: hidden; }
img { width: 100%; height: 220px; object-fit: cover; display: block; }
figcaption { padding: 10px; opacity: 0.8; font-size: 14px; }
@media (max-width: 900px) { .grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 600px) { .grid { grid-template-columns: 1fr; } }
</style>
