<script setup>
import { RouterLink, RouterView } from 'vue-router'

const navLinks = [
  { to: '/login', label: 'Login' },
  { to: '/signup', label: 'Sign Up' },
  { to: '/post/create', label: 'Write Post' },
]
</script>

<template>
  <header class="site-header">
    <div class="nav-shell">
      <nav class="main-nav" aria-label="Primary">
        <RouterLink
          v-for="link in navLinks"
          :key="link.to"
          :to="link.to"
          class="nav-link"
        >
          {{ link.label }}
        </RouterLink>
      </nav>
    </div>
  </header>

  <main class="page-root">
    <RouterView />
  </main>
</template>

<style scoped>
header.site-header {
  position: sticky;
  top: 0;
  z-index: 10;
  background: var(--color-background, #fff);
  border-bottom: 1px solid var(--color-border, #e5e7eb);
}

.nav-shell {
  max-width: 960px;
  margin: 0 auto;
  padding: 0.75rem 1rem;
}

.main-nav {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  width: 100%;
}

.nav-link {
  padding: 0.5rem 0.9rem;
  border-radius: 999px;
  text-decoration: none;
  color: var(--color-text, #111827);
  border: 1px solid transparent;
  transition: background-color 0.2s ease, border-color 0.2s ease;
}

.nav-link:hover {
  background: #f3f4f6;
}

.nav-link.router-link-active {
  border-color: var(--color-border, #d1d5db);
  background: #eff6ff;
  color: #1d4ed8;
}

.page-root {
  max-width: 960px;
  margin: 0 auto;
  padding: 1rem;
}

@media (min-width: 1024px) {
  .nav-shell {
    padding: 1rem;
  }

  .main-nav {
    gap: 0.75rem;
  }
}
</style>
