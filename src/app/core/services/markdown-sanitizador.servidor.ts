// SOLO PLATAFORMA SERVIDOR (se importa desde app.config.server.ts): en el
// prerender no hay window, y DOMPurify sin DOM no sanitiza. Creamos una
// ventana jsdom (ya está en el árbol de dependencias para los tests) y con
// ella una instancia real de DOMPurify. La sanitización en el prerender es
// tan real como en el navegador.

import { Injectable } from '@angular/core';
import { JSDOM } from 'jsdom';
import DOMPurify from 'dompurify';
import { SanitizadorMarkdown } from './markdown-sanitizador';

const ventana = new JSDOM('').window;

const purificador = DOMPurify(ventana);

@Injectable()
export class SanitizadorMarkdownServidor implements SanitizadorMarkdown {
  sanitizar(html: string): string {
    return purificador.sanitize(html, { USE_PROFILES: { html: true } });
  }
}
