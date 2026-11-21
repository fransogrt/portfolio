// SOLO PLATAFORMA SERVIDOR (se registra en app.config.server.ts): backend
// HTTP del prerender que resuelve las URLs `/content/*.md` leyendo los
// ficheros de `public/content/` del disco. Así el Markdown entra en el HTML
// estático (D8) sin servidor en producción: el navegador sigue usando su
// backend normal y sirve los mismos ficheros con nginx.
//
// Ojo: en prerender la petición llega con URL absoluta (el motor de render
// le antepone un origen local, p. ej. http://localhost:<puerto>/content/…),
// así que el parser acepta rutas relativas y absolutas.

import { Injectable } from '@angular/core';
import { HttpBackend, HttpEvent, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { dirname, join, resolve } from 'node:path';
import { readFileSync, statSync } from 'node:fs';

const PREFIJO = '/content/';

@Injectable()
export class FicherosContentBackend implements HttpBackend {
  /** Solo sirve GET /content/*.md; cualquier otra URL es un error explícito. */
  handle(req: HttpRequest<never>): Observable<HttpEvent<unknown>> {
    const ruta = this.rutaFichero(req.url);
    if (!ruta) {
      return throwError(
        () => new Error(`FicherosContentBackend: URL no servible en prerender: ${req.url}`),
      );
    }
    try {
      const cuerpo = readFileSync(ruta, 'utf8');
      return of(new HttpResponse({ body: cuerpo, status: 200, url: req.url }));
    } catch {
      return throwError(
        () => new Error(`FicherosContentBackend: no se pudo leer ${req.url} (${ruta})`),
      );
    }
  }

  /** Extrae el path de una URL (relativa o absoluta) sin query ni fragmento. */
  private rutaRelativa(url: string): string {
    const sinQuery = url.split(/[?#]/, 1)[0];
    if (/^https?:\/\//i.test(sinQuery)) {
      try {
        return new URL(sinQuery).pathname;
      } catch {
        // URL absoluta malformada: se trata como ruta y el filtro decide.
        return sinQuery;
      }
    }
    return sinQuery;
  }

  /** Convierte /content/x.md en una ruta de disco real, sin traversals. */
  private rutaFichero(url: string): string | null {
    const ruta = this.rutaRelativa(url);
    if (!ruta.startsWith(PREFIJO) || !ruta.endsWith('.md')) {
      return null;
    }
    const relativo = decodeURIComponent(ruta.slice(PREFIJO.length));
    if (relativo.length === 0 || relativo.includes('..') || relativo.includes('\0')) {
      return null;
    }
    const segmentos = relativo.split('/').filter(Boolean);
    for (const base of this.bases()) {
      const candidata = join(base, ...segmentos);
      try {
        if (statSync(candidata).isFile()) {
          return candidata;
        }
      } catch {
        // No existe en esta base: probamos la siguiente.
      }
    }
    return null;
  }

  /**
   * Bases posibles de public/content: el raíz del proyecto visto desde el cwd
   * del build y, por si el prerender ejecuta el bundle desde otra carpeta
   * (.angular/prerender-root/…), se sube niveles buscando public/content o el
   * browser/ ya emitido.
   */
  private bases(): string[] {
    const candidatas: string[] = [];
    for (const origen of [process.cwd(), resolve(import.meta.dirname ?? '.')]) {
      let directorio = origen;
      for (let nivel = 0; nivel < 6; nivel++) {
        candidatas.push(resolve(directorio, 'public', 'content'));
        candidatas.push(resolve(directorio, 'dist', 'portfolio', 'browser', 'content'));
        directorio = dirname(directorio);
      }
    }
    return candidatas;
  }
}
