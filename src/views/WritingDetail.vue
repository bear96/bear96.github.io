<script setup>
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { writings } from "../data/writings";

const route = useRoute();
const router = useRouter();

const writing = computed(() => writings.find(w => w.slug === route.params.slug));
</script>

<template>
  <div v-if="writing" class="card">
    <button class="back" @click="router.back()">← Back</button>
    <h2>{{ writing.title }}</h2>
    <div class="meta">{{ writing.date }}</div>

    <div class="reader">
      <pre class="text">{{ writing.content }}</pre>
    </div>
  </div>

  <div v-else class="card">
    <button class="back" @click="router.back()">← Back</button>
    <p>Not found.</p>
  </div>
</template>

<style scoped>
.card { border: 1px solid rgba(0,0,0,0.12); border-radius: 16px; padding: 18px; }
.back { border: 1px solid rgba(0,0,0,0.12); background: transparent; padding: 8px 10px; border-radius: 12px; cursor: pointer; }
.back:hover { border-color: rgba(0,0,0,0.35); }
.meta { opacity: 0.7; margin-bottom: 10px; }

/* Scrollable reading pane */
.reader { border: 1px solid rgba(0,0,0,0.12); border-radius: 14px; padding: 14px; max-height: 70vh; overflow: auto; }
.text { white-space: pre-wrap; font-family: inherit; line-height: 1.55; margin: 0; }
</style>
