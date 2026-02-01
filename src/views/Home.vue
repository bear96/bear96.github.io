<template>
  <div class="wrap">
    <section class="grid">
      <div class="card">
        <h1>Hi - I'm Aritra.</h1>

        <p>
        My main interest is in machine learning, and I like working at the intersection of topics (ML + people, ML + systems,
        ML + weird ideas) that turn into fun research projects. Lately I've been interested in chess engines, and I have been 
        trying to build one that plays like the great Mikhail Tal, the Pirate of Riga.
        I'm also tinkering with the idea of turning one of my stories into a small game on Unity.
        </p>

        <p>
        Outside the “professional me”, I write fiction (English & Bengali), paint, read a lot of mystery stories,
        and play chess (<a href="https://lichess.org/@/bear96" target="_blank" rel="noreferrer">Lichess</a>). One of my stories is available as an audio story on
        <a href="https://www.youtube.com/watch?v=rT0cjx52wF4" target="_blank" rel="noreferrer">YouTube</a>.
        </p>

        <p>
        For papers, projects, and affiliations, go to <b>Academic / Professional</b>.
        For everything else, head to <b>Writing</b> or <b>Painting</b>.
        </p>


        <div class="row">
          <a href="https://github.com/bear96" target="_blank" rel="noreferrer" role="button" class="secondary outline">GitHub</a>
          <a
            href="https://scholar.google.com/citations?user=1fKiOygAAAAJ&hl=en"
            target="_blank"
            rel="noreferrer"
            role="button"
            class="secondary outline"
          >
            Google Scholar
          </a>
          <a
            href="https://www.linkedin.com/in/aritra-machine-learning/"
            target="_blank"
            rel="noreferrer"
            role="button"
            class="secondary outline"
          >
            LinkedIn
          </a>
        </div>
      </div>

      <div class="card center">
        <img class="avatar" src="/me.jpg" alt="Portrait" />
        <div class="caption">Kolkata / US • Data Scientist • Researcher</div>
      </div>
    </section>

    <footer class="foot">© 2026 Aritra Majumdar</footer>
  </div>
</template>

<style scoped>
/* centers the whole home content on the page */
.wrap {
  min-height: calc(100vh - 80px);
  display: grid;
  place-items: center;
  padding: 24px 16px;
}

/* keep your grid, but constrain width so it stays centered and not too wide */
.grid {
  width: min(980px, 100%);
  display: grid;
  grid-template-columns: 1.4fr 0.6fr;
  gap: 16px;
  align-items: start;
}

.card { border: 1px solid rgba(0,0,0,0.12); border-radius: 16px; padding: 18px; }

.row { display: flex; gap: 10px; flex-wrap: wrap; margin-top: 14px; }

/* .btn {
  padding: 10px 12px;
  border-radius: 12px;
  border: 1px solid rgba(0,0,0,0.12);
  text-decoration: none;
  color: inherit;
}
.btn:hover { border-color: rgba(0,0,0,0.35); } */

.center { text-align: center; }
.avatar { width: 180px; height: 180px; object-fit: cover; border-radius: 999px; border: 1px solid rgba(0,0,0,0.12); }
.caption { margin-top: 10px; opacity: 0.75; }

.foot { margin-top: 18px; opacity: 0.6; font-size: 13px; }

@media (max-width: 760px) {
  .grid { grid-template-columns: 1fr; }
}
</style>
