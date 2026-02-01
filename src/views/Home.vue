<template>
  <section class="grid">
    <div class="card">
      <h1>Hi — I’m Aritra.</h1>
      <p>
        I work on data science, ML, and research. I also write fiction and paint.
        This site splits the “professional me” from the “creative me.”
      </p>

      <div class="row">
        <a class="btn" href="/resume.pdf" target="_blank" rel="noreferrer">Resume (PDF)</a>
        <a class="btn" href="https://github.com/bear96" target="_blank" rel="noreferrer">GitHub</a>
        <a class="btn" href="mailto:your@email.com">Email</a>
      </div>
    </div>

    <div class="card center">
      <img class="avatar" src="/me.jpg" alt="Portrait" />
      <div class="caption">Kolkata / US • Data Scientist • Researcher</div>
    </div>
  </section>
</template>

<style scoped>
.grid { display: grid; grid-template-columns: 1.4fr 0.6fr; gap: 16px; }
.card { border: 1px solid rgba(0,0,0,0.12); border-radius: 16px; padding: 18px; }
.row { display: flex; gap: 10px; flex-wrap: wrap; margin-top: 14px; }
.btn { padding: 10px 12px; border-radius: 12px; border: 1px solid rgba(0,0,0,0.12); text-decoration: none; color: inherit; }
.btn:hover { border-color: rgba(0,0,0,0.35); }
.center { text-align: center; }
.avatar { width: 180px; height: 180px; object-fit: cover; border-radius: 999px; border: 1px solid rgba(0,0,0,0.12); }
.caption { margin-top: 10px; opacity: 0.75; }
@media (max-width: 760px) { .grid { grid-template-columns: 1fr; } }
</style>
