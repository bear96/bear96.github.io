<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from "vue";

const items = ref([]);

const selected = ref(null);
const showDetails = ref(true);

onMounted(async () => {
  const mod = await import("../generated/art-index.json");
  items.value = mod.default ?? mod;
});

// Use encodeURI so commas stay commas; also encode apostrophes
function artUrl(file) {
  const base = import.meta.env.BASE_URL || "/";
  const safe = encodeURI(file).replace(/'/g, "%27");
  return `${base}art/${safe}`;
}

const selectedSrc = computed(() => (selected.value ? artUrl(selected.value.file) : ""));

function openPiece(p) {
  selected.value = p;
  showDetails.value = true;
  document.body.style.overflow = "hidden";
}

function closePiece() {
  selected.value = null;
  document.body.style.overflow = "";
}

function onKeyDown(e) {
  if (!selected.value) return;
  if (e.key === "Escape") closePiece();
}

onMounted(() => window.addEventListener("keydown", onKeyDown));
onBeforeUnmount(() => window.removeEventListener("keydown", onKeyDown));
onBeforeUnmount(() => (document.body.style.overflow = ""));
</script>

<template>
  <div class="card">
    <h2>Paintings</h2>
    <p class="sub">Click to view.</p>

    <div class="grid">
      <button
        v-for="p in items"
        :key="p.file"
        class="tile"
        @click="openPiece(p)"
        type="button"
      >
        <img :src="artUrl(p.file)" :alt="p.title" loading="lazy" />
        <div class="cap">
          <div class="title">{{ p.title }}</div>
          <div class="meta" v-if="p.year || p.medium">
            {{ p.year }}<span v-if="p.year && p.medium"> • </span>{{ p.medium }}
          </div>
        </div>
      </button>
    </div>
  </div>

  <!-- Lightbox -->
  <div v-if="selected" class="overlay" @click.self="closePiece">
    <div class="dialog" role="dialog" aria-modal="true">
      <button class="close" @click="closePiece" type="button">✕</button>

      <!-- Image (auto adapts to portrait/landscape) -->
      <img class="full" :src="selectedSrc" :alt="selected.title" />

      <!-- Bottom overlay details -->
      <div class="details" :class="{ minimized: !showDetails }">
        <div class="detailsTop">
          <div class="dTitle">{{ selected.title }}</div>
          <button class="toggle" @click="showDetails = !showDetails" type="button">
            {{ showDetails ? "Minimize" : "Expand" }}
          </button>
        </div>

        <div v-if="showDetails" class="detailsBody">
          <div class="line" v-if="selected.year || selected.medium || selected.size">
            <span v-if="selected.year">{{ selected.year }}</span>
            <span v-if="selected.year && selected.medium"> • </span>
            <span v-if="selected.medium">{{ selected.medium }}</span>
            <span v-if="(selected.year || selected.medium) && selected.size"> • </span>
            <span v-if="selected.size">{{ selected.size }}</span>
          </div>

          <div class="notes" v-if="selected.notes">{{ selected.notes }}</div>

          <div class="tags" v-if="selected.tags?.length">
            <span class="tag" v-for="t in selected.tags" :key="t">{{ t }}</span>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* page */
.card { border: 1px solid rgba(0,0,0,0.12); border-radius: 16px; padding: 18px; }
.sub { opacity: 0.75; margin-top: 6px; }

.grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-top: 12px; }
/* .tile { padding: 0; border: 1px solid rgba(0,0,0,0.12); border-radius: 14px; overflow: hidden; background: transparent; cursor: pointer; text-align: left; } */
/* tile is a normal card */
.tile {
  border-radius: 16px;
  overflow: hidden;              /* OK now because tile is not a circle */
  padding: 0;
}

/* image gets a fixed height + cover, but not circular */
.tile img {
  width: 100%;
  height: 220px;
  object-fit: cover;
  display: block;
  border-radius: 0;              /* important */
}

.tile:hover { border-color: rgba(0,0,0,0.35); }
/* .tile img { width: 100%; height: 220px; object-fit: cover; display: block; } */
.cap { padding: 10px; }
.title { font-weight: 700; }
.meta { opacity: 0.7; font-size: 13px; margin-top: 2px; }

@media (max-width: 900px) { .grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 600px) { .grid { grid-template-columns: 1fr; } }

/* lightbox */
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.78);
  display: grid;
  place-items: center;
  padding: 14px;
  z-index: 60;
}

/* This is the key: dialog adapts to image aspect ratio.
   Image controls the size, bounded by viewport. */
.dialog {
  position: relative;
  display: inline-block;
  max-width: 95vw;
  max-height: 92vh;
}

.full {
  display: block;
  max-width: 95vw;
  max-height: 92vh;
  width: auto;
  height: auto;
  object-fit: contain;
  border-radius: 16px;
  background: rgba(0,0,0,0.15);
}

/* close button */
.close {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 3;
  border: 1px solid rgba(255,255,255,0.22);
  background: rgba(0,0,0,0.35);
  color: rgba(255,255,255,0.92);
  border-radius: 10px;
  padding: 6px 10px;
  cursor: pointer;
}
.close:hover { border-color: rgba(255,255,255,0.38); }

/* details overlay */
.details {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
  color: rgba(255,255,255,0.92);
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
  border-top: 1px solid rgba(255,255,255,0.12);
  backdrop-filter: blur(5px);
  padding: 10px 12px;

  /* darker when expanded */
  background: rgba(0,0,0,0.58);
}

/* lighter when minimized */
.details.minimized {
  background: rgba(0,0,0,0.28);
  padding: 8px 10px;
}

.detailsTop {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
}
.dTitle { font-weight: 800; }

.toggle {
  border: 1px solid rgba(255,255,255,0.22);
  background: rgba(0,0,0,0.22);
  color: rgba(255,255,255,0.92);
  border-radius: 10px;
  padding: 6px 10px;
  cursor: pointer;
}
.toggle:hover { border-color: rgba(255,255,255,0.38); }

.detailsBody {
  margin-top: 8px;
  max-height: 28vh;
  overflow: auto;
}

.line { opacity: 0.78; font-size: 13px; }
.notes { margin-top: 10px; line-height: 1.55; }
.tags { margin-top: 10px; display: flex; flex-wrap: wrap; gap: 8px; }
.tag {
  border: 1px solid rgba(255,255,255,0.18);
  border-radius: 999px;
  padding: 4px 8px;
  font-size: 12px;
  opacity: 0.92;
}
.empty { margin-top: 10px; opacity: 0.8; }
</style>
