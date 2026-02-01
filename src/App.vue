<template>
  <div class="shell">
    <header class="header">
      <div class="brand">
        <div class="name">Aritra Majumdar</div>
        <div class="tag">Data Scientist • Research • Writing • Art</div>
      </div>

      <nav class="nav">
        <RouterLink to="/" class="link" active-class="active">Home</RouterLink>
        <RouterLink to="/professional" class="link" active-class="active">Academic / Professional</RouterLink>
        <RouterLink to="/writing" class="link" active-class="active">Writing</RouterLink>
        <RouterLink to="/art" class="link" active-class="active">Painting</RouterLink>
      </nav>
    </header>

    <main class="main">
      <RouterView />
    </main>

    <footer class="footer">
      <span>© {{ new Date().getFullYear() }} Aritra Majumdar</span>
    </footer>
  </div>
</template>

<style>
.shell { max-width: 980px; margin: 0 auto; padding: 24px; font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial; }
.header { display: flex; gap: 16px; align-items: baseline; justify-content: space-between; flex-wrap: wrap; }
.brand .name { font-size: 22px; font-weight: 700; }
.brand .tag { opacity: 0.75; }
.nav { display: flex; gap: 10px; flex-wrap: wrap; }
.link { padding: 8px 10px; border-radius: 10px; text-decoration: none; color: inherit; border: 1px solid rgba(0,0,0,0.12); }
.link:hover { border-color: rgba(0,0,0,0.30); }
.active { border-color: rgba(0,0,0,0.60); font-weight: 600; }
.main { margin-top: 18px; }
.footer { margin-top: 32px; opacity: 0.65; font-size: 13px; }
</style>
