# Portfolio de Francisco Ogallar

Portfolio personal (fransogrt.xyz): Angular 22 zoneless con signals, prerender estático (SSG) y
sistema de diseño propio con tokens (`--mlt-sys-*`). El contenido vive como Markdown en el repo.

## Stack

- Angular 22 (zoneless, signals, standalone) con prerender estático: sin servidor Node en
  producción; nginx sirve `dist/portfolio/browser/`.
- Angular Material en modo mixto: Material para lo utilitario (botones), bloques `c-`/`l-` propios
  para lo identitario.
- Contenido Markdown en `public/content/`, cargado con `httpResource` y renderizado con
  `marked` + `DOMPurify` (siempre sanitizado).
- Fuentes self-hosted: `@fontsource-variable/roboto-flex` + Material Symbols locales (paquete
  `material-symbols`), sin CDNs externos.
- Tests con Vitest (`ng test`), ESLint con angular-eslint (flat config) y Prettier.

## Estructura

- `src/app/core/` — modelos (perfil, proyectos) y servicios (tema, markdown, SEO).
- `src/app/shared/ui/components/` — componentes reutilizables (cabecera, pie, interruptor de tema,
  bloque markdown, tarjeta de proyecto).
- `src/app/features/` — páginas por funcionalidad (inicio, proyectos, sobre-mi, contacto).
- `src/styles/` — sistema de diseño `s01_utilities` … `s06_global`; tema claro/oscuro con el
  atributo `data-tema` en `<html>` (cambia `color-scheme`, y con él se retema Material).
- `public/content/` — un Markdown por proyecto y por sección.
- `public/cv/` — aquí va `cv-francisco-ogallar.pdf` cuando exista (ver su README).

## Comandos

```bash
npm install
npm start            # ng serve (desarrollo)
npm run build        # build de producción con prerender -> dist/portfolio/browser/
npm test             # Vitest
npm run lint         # ESLint
npm run format       # Prettier --write .
npm run format:check # Prettier --check .
```

## Contenido y datos

Los datos personales (email, GitHub, LinkedIn, disponibilidad del CV) están centralizados en
`src/app/core/models/perfil.ts`. Los proyectos destacados, en `src/app/core/models/proyecto.ts`;
añadir uno nuevo = entrada ahí + fichero Markdown en `public/content/proyectos/` (el prerender de
`/proyectos/:slug` sale de esa lista).

## Despliegue

Dockerfile multistage (node:22 → nginx:alpine, compatible arm64) y `compose.yaml` que publica
`127.0.0.1:18081:80` con `restart: unless-stopped`. `nginx.conf` incluye el fallback SPA
(`try_files … /index.html`). La exposición real (cloudflared, DNS, Email Routing, Umami) es un paso
de operación fuera de este repo.
