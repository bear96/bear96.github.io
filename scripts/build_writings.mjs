import fg from "fast-glob";
import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";

const IN_DIR = "content/writing";
const OUT_HTML_DIR = "public/writings";
const OUT_INDEX = "src/generated/writings-index.json";

function stripExt(filename) {
  return filename.replace(/\.[^.]+$/, "").trim();
}

function makeTitle(filename) {
  return filename
    .replace(/\.docx$/i, "")
    .replace(/[_-]+/g, " ")
    .trim();
}

function asciiSlug(stem) {
  return stem
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/**
 * Hybrid slug:
 * - If stem is ASCII-ish (English), use a readable kebab-case slug.
 * - Otherwise (Bengali, etc.), use a url-safe base64 slug with a prefix.
 */
function makeSlug(filename) {
  const stem = stripExt(filename);
  if (!stem) return "";

  const isAscii = /^[\x00-\x7F]+$/.test(stem); // simple + effective
  if (isAscii) {
    const s = asciiSlug(stem);
    return s || `u-${Buffer.from(stem, "utf8").toString("base64url")}`;
  }

  // Non-ASCII: safe encoded slug (prefixed so it doesn't clash with readable slugs)
  return `u-${Buffer.from(stem, "utf8").toString("base64url")}`;
}

function stripTags(html) {
  return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

fs.mkdirSync(OUT_HTML_DIR, { recursive: true });
fs.mkdirSync(path.dirname(OUT_INDEX), { recursive: true });

const files = await fg(["*.docx"], { cwd: IN_DIR, absolute: true });

const index = [];
const seen = new Set();

for (const file of files) {
  const base = path.basename(file);
  const slug = makeSlug(base);

  if (!slug) throw new Error(`Empty slug for file: ${base}`);
  if (seen.has(slug)) throw new Error(`Duplicate slug "${slug}" for file: ${base}`);
  seen.add(slug);

  const outHtml = path.join(OUT_HTML_DIR, `${slug}.html`);

  execSync(
    `pandoc "${file}" -f docx -t html -o "${outHtml}" --extract-media="${OUT_HTML_DIR}/${slug}-media"`,
    { stdio: "inherit" }
  );

  const html = fs.readFileSync(outHtml, "utf8");
  const text = stripTags(html);

  const title = makeTitle(base);
  const preview = text.slice(0, 220) + (text.length > 220 ? "…" : "");

  const stat = fs.statSync(file);
  const date = stat.mtime.toISOString().slice(0, 10);

  index.push({
    slug,
    title,
    date,
    preview,
    href: `/writings/${slug}.html`,
  });
}

index.sort((a, b) => b.date.localeCompare(a.date));

fs.writeFileSync(OUT_INDEX, JSON.stringify(index, null, 2), "utf8");
console.log(`Built ${index.length} writings.`);
