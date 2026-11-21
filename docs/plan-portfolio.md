# Entendimiento compartido: Portfolio personal de Francisco Ogallar (fransogrt.xyz)

Sesión de grilling del 2026-11-20. 8 rondas, 13 decisiones: 12 resueltas, 1 abierta. Corregido el mismo día con los hechos verificados del inventario de la Raspberry (fuente: `3 - Fuentes/personal/Informe Raspberry Pi - 2026-11-20.md` en la bóveda) y con la ronda 8 de stack concreto.

## Decisiones

| # | Decisión | Estado | Resolución |
|---|---|---|---|
| D1 | ¿Propósito del portfolio y audiencia? | Resuelta | Conseguir empleo como desarrollador; audiencia: reclutadores y responsables técnicos; mercado: España local/híbrido (R1, usuario) |
| D2 | ¿Acción principal (CTA) del visitante? | Resuelta | Doble CTA: «contactarme» y «ver proyectos» (R1, usuario) |
| D3 | ¿Posicionamiento y marca del sitio? | Resuelta | Generalista full-stack JS/TS; título de pestaña y SEO: «Francisco Ogallar» (R1 y R7, usuario) |
| D4 | ¿Estructura e idioma del sitio? | Resuelta | Multi-página: Inicio, Proyectos, Sobre mí, Contacto; en español (R2, usuario; idioma derivado del mercado España de D1) |
| D5 | ¿Contenido que entra en el sitio? | Resuelta | Solo material real (R2, usuario): formación y certificaciones (DAW), CV en PDF descargable (R5), GitHub `github.com/fransogrt` y LinkedIn `linkedin.com/in/francisco-ogallar` (R6). Sin foto personal (R4), sin blog en v1 (R3), sin experiencia laboral reseñada (no marcada como material disponible en R2) |
| D6 | ¿Tercer proyecto destacado? | Abierta | Confirmados solo 2 de los 3 decididos: flowabot y replaybot (R7). Bloquea el tercero: el usuario aún no lo sabe; candidato verificado: el propio portfolio como proyecto Angular real |
| D7 | ¿Estética visual? | Resuelta | Modo claro + modo oscuro con toggle (R4), sobre el sistema de diseño de la bóveda (carpetas `s01`–`s06`, tokens, bloques `c-`/`l-`/`g--`) con Angular Material en modo mixto: Material para lo utilitario, bloques propios para lo identitario (R4) |
| D8 | ¿Stack y arquitectura del frontend? | Resuelta | Angular (patrón de la bóveda: zoneless, signals, `core/`+`shared/`+`features/`), elegido por el usuario sobre la estructura documentada en `Angular - Signals y Directivas (Índice).md` y `Sistema de Diseño - Estructura de carpetas.md` (R3, hecho verificado en la sesión). Prerender SSG para SEO (R4). Contenido gestionado como Markdown en el repo (R3). Versión y herramientas concretas: D13 |
| D9 | ¿Hosting y exposición? | Resuelta | Contenedor Docker en la Raspberry (hecho verificado: Pi 5, Debian 12, Docker con cada app en su compose bajo `/home/pi/apps/`), expuesto por el túnel Cloudflare existente — también verificado: `cloudflared` corre como **servicio systemd** (`cloudflared-filehost.service`, config `/home/pi/.cloudflared/config.yml`), no como contenedor, y hoy publica `files.fransogrt.xyz` y `test.fransogrt.xyz` hacia puertos loopback. Patrón a seguir (el de `examenes-web`): portfolio publicado en `127.0.0.1:18081` (18080 ya ocupado) + regla de ingress nueva `fransogrt.xyz → http://127.0.0.1:18081` (propuesta técnica). Dominio `fransogrt.xyz` (R6); al publicar, eliminar `fransogrt.github.io` (R7). Dockerfile multistage Node→nginx: propuesta (patrón de la bóveda, no preguntado) |
| D10 | ¿Analítica? | Resuelta | Umami self-hosted (R5, recomendación aceptada). Hechos verificados que lo respaldan: la Pi tiene holgura (7,9 GiB RAM con ~1 GiB en uso; 14 GiB libres en raíz). Detalle técnico: Umami necesita su PostgreSQL y su script de tracking debe ser público → compose propio (p. ej. `/home/pi/apps/umami/`) en un puerto loopback libre (propuesta: `127.0.0.1:18082`) publicado como `stats.fransogrt.xyz` (propuesta) con otra regla de ingress. Nota: no hay backups programados en la Pi; los datos de Umami quedarían sin copia (aceptable, volumen pequeño) |
| D11 | ¿Email de contacto? | Resuelta | Cloudflare Email Routing reenviando al buzón personal, sin servidor de correo (R7). Dirección propuesta —editable—: `contacto@fransogrt.xyz` (la dirección exacta no se preguntó). El CTA «contactarme» es email directo (mailto), sin formulario (R4) |
| D12 | ¿Plazo y criterio de éxito de la v1? | Resuelta | Sin deadline (R5, única respuesta del usuario a esta pregunta). Por síntesis del documento (agrega D4, D5 y D10-D11, ya respaldadas): v1 = sitio publicado en fransogrt.xyz con las 4 páginas, proyectos destacados, CV descargable, contacto y analítica funcionando |
| D13 | ¿Stack concreto de desarrollo? | Resuelta | **Angular 22** (estable actual desde jun 2026 — hecho verificado en la sesión; mismo modelo zoneless/signals que los apuntes de la bóveda, que documentan v21) (R8). Markdown en `public/content/` cargado con `httpResource` y renderizado con `marked` + `DOMPurify` (R8; materializa el «Markdown en repo» de D8). **Vitest mínimo**: runner por defecto del CLI, smoke tests de páginas, render de markdown y toggle claro/oscuro, sin E2E (R8). **ESLint (angular-eslint, flat config) + Prettier** desde el inicio (R8). **Build en la Pi**: repo público `github.com/fransogrt/portfolio` y `docker compose build` en la Raspberry, sin CI (R8). Fuentes **self-hosted** con `@fontsource` (Roboto Flex, el del tema Material) + Material Symbols locales, sin CDNs externos (R8) |

## Ramas abiertas

- D6 — Tercer proyecto destacado: confirmados flowabot (bot de Discord, JavaScript, activo en oct 2026) y replaybot (Go, jul 2026), verificados en el GitHub público. Falta elegir el tercero; candidatos: (a) el propio portfolio como proyecto Angular+SSG, y (b) nuevo con el inventario: la **web de exámenes ya desplegada** en `test.fransogrt.xyz` (proyecto real en producción en la Pi). Dato útil para la sección sea cual sea: flowabot también corre en producción en la Pi (puerto 8487), así que dos de los proyectos ya se autohospedan. No bloquea el resto del plan: se implementa con los 2 confirmados y se añade el 3º cuando se decida.

## Siguientes pasos

Ordenados para lanzar `/do-code impl` con este documento:

1. **Email**: activar Cloudflare Email Routing en fransogrt.xyz → `contacto@fransogrt.xyz` reenviado al buzón personal (independiente del código; ~10 min).
2. **Proyecto Angular**: `ng new` (Angular 22) con SSG/prerender, SASS y Vitest (viene por defecto), más ESLint (angular-eslint flat config) + Prettier y las dependencias `marked`, `dompurify` y `@fontsource` (D13). Estructura de la bóveda: `src/app/` en `core/`+`shared/`+`features/` (el índice de Signals usa `shared/`; la nota de sistema de diseño, `shared/ui/` — se sigue la que marque la nota definitiva) y `src/styles/` en `s01_utilities`…`s06_global` con `_index.scss` y `@use` en orden.
3. **Sistema de diseño**: tokens de sistema (en `s03_base/`, según la nota de sistema de diseño de la bóveda), tema claro/oscuro con toggle, Angular Material (mixto: Material utilitario + bloques `c-` propios), tipografía e iconos self-hosted (`@fontsource`/Roboto Flex + Material Symbols locales).
4. **Páginas y contenido**: las 4 páginas (Inicio, Proyectos, Sobre mí, Contacto) en español; un `.md` por proyecto y sección en `public/content/`, cargado con `httpResource` y renderizado con `marked` + `DOMPurify` (D13); páginas de detalle para flowabot y replaybot; CV PDF en `public/`; enlaces a GitHub y LinkedIn.
5. **Docker y deploy**: repo público `github.com/fransogrt/portfolio`; Dockerfile multistage `node:22`→`nginx:alpine` (arm64, patrón de la bóveda, propuesto en D9) + compose en `/home/pi/apps/portfolio/compose.yaml` (patrón de `examenes`) publicando `127.0.0.1:18081→80` con `restart: unless-stopped`; build en la propia Pi con `docker compose build`, sin CI (D13). Exposición: añadir la regla de ingress `fransogrt.xyz → http://127.0.0.1:18081` en `/home/pi/.cloudflared/config.yml` (editarlo es **modificar el servicio en producción**: hacerlo con cuidado y `sudo systemctl restart cloudflared-filehost`), y crear el DNS del apex en Cloudflare (`cloudflared tunnel route dns 71abef02-… fransogrt.xyz`).
6. **Analítica**: compose de Umami + PostgreSQL en `/home/pi/apps/umami/` en `127.0.0.1:18082`, publicado como `stats.fransogrt.xyz` (nueva regla de ingress) porque el script de tracking debe ser público; incluir el script en la web según D10.
7. **Publicación**: SEO de «Francisco Ogallar» (metadatos por página; sitemap si procede), eliminar `fransogrt.github.io`.
8. **Condicionado a D6**: decidir el tercer proyecto destacado (candidatos: el propio portfolio, o la web de exámenes desplegada en test.fransogrt.xyz) y añadir su página de detalle.

## Hechos verificados de la Raspberry (inventario 2026-11-20)

Fuente completa e inmutable: `3 - Fuentes/personal/Informe Raspberry Pi - 2026-11-20.md` (bóveda) / `/tmp/opencode/informe-raspberry.md`. Lo que condiciona este plan:

- **Hardware/SO**: Pi 5 Model B, 8 GB, Debian 12; RAM ~1 GiB en uso y 14 GiB libres en raíz → sin problema de capacidad para portfolio + Umami.
- **Docker**: 6 contenedores activos; convención real de despliegue = compose por app en `/home/pi/apps/<app>/compose.yaml` (o `/home/pi/<app>/`), `restart: unless-stopped`, servicios web publicados en **loopback** para que los alcance cloudflared.
- **cloudflared**: servicio systemd `cloudflared-filehost.service` (no contenedor), config en `/home/pi/.cloudflared/config.yml`, túnel `71abef02-…`, ingress actual: `files.fransogrt.xyz → localhost:8888`, `test.fransogrt.xyz → 127.0.0.1:18080`, resto → 404. Añadir el portfolio y `stats.` = editar ese config y reiniciar el servicio.
- **Puertos ya ocupados** (no reutilizar): 53/67/80 (Pi-hole, red host), 8000/9443 (Portainer), 8487 (flowabot), 8888 (filehost), 18080 (exámenes), 22 (sshd).
- **Sin backups programados ni `unattended-upgrades`**: el código del portfolio vive en git, pero los volúmenes (p. ej. datos de Umami) no tendrán copia.

Siguiente paso exacto: `/do-code impl docs/plan-portfolio.md` desde la raíz del repo `/home/fran/orca/projects/portfolio`.
