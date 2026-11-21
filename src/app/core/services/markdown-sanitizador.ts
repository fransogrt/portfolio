// Contrato del purificador de HTML de Markdown. La implementación cambia con
// la plataforma porque DOMPurify necesita un DOM real: en el navegador usa el
// window del documento (markdown-sanitizador.navegador.ts) y en el
// prerender/servidor una ventana jsdom (markdown-sanitizador.servidor.ts,
// importado solo desde app.config.server.ts). Con esto la sanitización es
// real en TODAS las plataformas: sin DOM, DOMPurify ni siquiera expone
// sanitize() y devolvería el HTML sin limpiar.

import { InjectionToken } from '@angular/core';

export interface SanitizadorMarkdown {
  sanitizar(html: string): string;
}

export const PURIFICADOR_MARKDOWN = new InjectionToken<SanitizadorMarkdown>('PURIFICADOR_MARKDOWN');
