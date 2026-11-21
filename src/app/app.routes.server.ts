// Prerender estático (D8/D13): todas las rutas fijas se prerenderizan y el
// detalle de proyecto genera una página por cada slug confirmado (D6: solo
// flowabot y replaybot). Con outputMode 'static' no hay servidor Node: nginx
// sirve el HTML prerenderizado con fallback SPA.

import { RenderMode, ServerRoute } from '@angular/ssr';
import { PROYECTOS } from './core/models/proyecto';

export const serverRoutes: ServerRoute[] = [
  { path: '', renderMode: RenderMode.Prerender },
  { path: 'proyectos', renderMode: RenderMode.Prerender },
  {
    path: 'proyectos/:slug',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      return PROYECTOS.map((proyecto) => ({ slug: proyecto.slug }));
    },
  },
  { path: 'sobre-mi', renderMode: RenderMode.Prerender },
  { path: 'contacto', renderMode: RenderMode.Prerender },
  { path: '**', renderMode: RenderMode.Client },
];
