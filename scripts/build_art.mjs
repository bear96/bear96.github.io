import fg from "fast-glob";
import fs from "node:fs";
import path from "node:path";

const ART_DIR = "public/art";
const DETAILS_PATH = "content/art/details.json";
const OUT_INDEX = "src/generated/art-index.json";

function parseTitleYear(filename) {
  // "Waterfall, 2025.png" -> title: "Waterfall", year: "2025"
  const stem = filename.replace(/\.[^.]+$/, "");
  const parts = stem.split(",").map(s => s.trim()).filter(Boolean);

  let year = "";
  let title = stem.trim();

  if (parts.length >= 2) {
    const last = parts[parts.length - 1];
    if (/^\d{4}$/.test(last)) {
      year = last;
      title = parts.slice(0, -1).join(", ").trim();
    }
  }

  return { title, year };
}

function readDetails() {
  if (!fs.existsSync(DETAILS_PATH)) return {};
  try {
    return JSON.parse(fs.readFileSync(DETAILS_PATH, "utf8"));
  } catch {
    throw new Error(`Could not parse ${DETAILS_PATH}. Make sure it's valid JSON.`);
  }
}

fs.mkdirSync(path.dirname(OUT_INDEX), { recursive: true });

const files = await fg(["*.png", "*.jpg", "*.jpeg", "*.webp"], { cwd: ART_DIR });
const detailsByFile = readDetails();

const index = files.map((file) => {
  const { title, year } = parseTitleYear(file);
  const d = detailsByFile[file] || {};

  return {
    file,           // exact filename in public/art
    title,
    year,
    medium: d.medium || "",
    size: d.size || "",
    notes: d.notes || "",
    tags: Array.isArray(d.tags) ? d.tags : []
  };
});

// Sort: newest year first, then title
index.sort((a, b) => {
  const ya = a.year || "0000";
  const yb = b.year || "0000";
  if (yb !== ya) return yb.localeCompare(ya);
  return a.title.localeCompare(b.title);
});

fs.writeFileSync(OUT_INDEX, JSON.stringify(index, null, 2), "utf8");
console.log(`Built ${index.length} art items.`);
