<script setup>
import { ref, onMounted } from "vue";
import { RouterLink } from "vue-router";

const items = ref([]);

onMounted(async () => {
  const mod = await import("../generated/writings-index.json");
  items.value = mod.default ?? mod; // just in case
});
</script>

<template>
  <div class="card">
    <h2>Writing</h2>

    <div class="list">
      <RouterLink
        v-for="w in items"
        :key="w.slug"
        class="item"
        :to="`/writing/${w.slug}`"
      >
        <div class="top">
          <div class="title">{{ w.title }}</div>
          <div class="date">{{ w.date }}</div>
        </div>
        <div class="preview">{{ w.preview }}</div>
        <div class="cta">Read →</div>
      </RouterLink>
    </div>
  </div>
</template>

<style scoped>
.card { border: 1px solid rgba(0,0,0,0.12); border-radius: 16px; padding: 18px; }
.list { display: grid; gap: 12px; margin-top: 10px; }
.item { display: block; text-decoration: none; color: inherit; border: 1px solid rgba(0,0,0,0.12); border-radius: 14px; padding: 14px; }
.item:hover { border-color: rgba(0,0,0,0.35); }
.top { display: flex; justify-content: space-between; gap: 12px; }
.title { font-weight: 700; }
.date { opacity: 0.7; font-size: 13px; }
.preview { margin-top: 8px; opacity: 0.85; }
.cta { margin-top: 10px; font-weight: 600; opacity: 0.8; }
</style>
