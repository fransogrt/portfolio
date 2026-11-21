// Implementación de navegador del purificador: DOMPurify con el window real
// del documento (la clásica de D13). En los tests (jsdom) también aplica.

import { Injectable } from '@angular/core';
import DOMPurify from 'dompurify';
import { SanitizadorMarkdown } from './markdown-sanitizador';

@Injectable()
export class SanitizadorMarkdownNavegador implements SanitizadorMarkdown {
  sanitizar(html: string): string {
    return DOMPurify.sanitize(html, { USE_PROFILES: { html: true } });
  }
}
