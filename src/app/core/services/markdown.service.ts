// Render de Markdown a HTML seguro: marked para convertir y DOMPurify para
// sanitizar SIEMPRE antes de tocar el DOM (D13 del plan). El purificador se
// inyecta por plataforma (navegador: window real; servidor/prerender: jsdom),
// así que la sanitización es real también en el HTML prerenderizado.

import { Injectable, inject } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { marked } from 'marked';
import { PURIFICADOR_MARKDOWN } from './markdown-sanitizador';

@Injectable({ providedIn: 'root' })
export class MarkdownService {
  private readonly purificador = inject(PURIFICADOR_MARKDOWN);
  private readonly sanitizador = inject(DomSanitizer);

  renderizar(markdown: string): SafeHtml {
    const html = marked.parse(markdown ?? '', { async: false });
    const limpio = this.purificador.sanitizar(html);
    return this.sanitizador.bypassSecurityTrustHtml(limpio);
  }
}
