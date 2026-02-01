<script setup>
import { ref, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const html = ref("");
const title = ref("");
const date = ref("");

async function load() {
  const slug = String(route.params.slug || "");

  // Load metadata (title/date) from the generated index
  const mod = await import("../generated/writings-index.json");
  const items = mod.default ?? mod;
  const item = items.find((x) => x.slug === slug);

  title.value = item?.title ?? slug;
  date.value = item?.date ?? "";

  // Load the rendered HTML (BASE_URL makes it work on GitHub Pages subpaths too)
  const url = `${import.meta.env.BASE_URL}writings/${slug}.html`;
  const res = await fetch(url);

  if (!res.ok) {
    html.value = `<p><b>Couldn’t load this writing.</b></p><p>Missing file: <code>${url}</code></p>`;
    return;
  }

  html.value = await res.text();
}

onMounted(load);
watch(() => route.params.slug, load);
</script>

<template>
  <div class="card">
    <button class="back" @click="router.back()">← Back</button>

    <h2 class="h">{{ title }}</h2>
    <div v-if="date" class="meta">{{ date }}</div>

    <div class="reader">
      <div class="content" v-html="html"></div>
    </div>
  </div>
</template>

<style scoped>
.card { border: 1px solid rgba(0,0,0,0.12); border-radius: 16px; padding: 18px; }
.back { border: 1px solid rgba(0,0,0,0.12); background: transparent; padding: 8px 10px; border-radius: 12px; cursor: pointer; }
.back:hover { border-color: rgba(0,0,0,0.35); }
.meta { opacity: 0.7; margin: 6px 0 12px; }
.reader { border: 1px solid rgba(0,0,0,0.12); border-radius: 14px; padding: 14px; max-height: 70vh; overflow: auto; }
.content :deep(p) { line-height: 1.65; margin: 0 0 12px; }
</style>
