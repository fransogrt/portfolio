// Render de Markdown: marked convierte y DOMPurify sanitiza SIEMPRE (D13).

import { TestBed } from '@angular/core/testing';
import { MarkdownService } from './markdown.service';
import { PURIFICADOR_MARKDOWN } from './markdown-sanitizador';
import { SanitizadorMarkdownNavegador } from './markdown-sanitizador.navegador';

describe('MarkdownService', () => {
  let servicio: MarkdownService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: PURIFICADOR_MARKDOWN, useClass: SanitizadorMarkdownNavegador }],
    });
    servicio = TestBed.inject(MarkdownService);
  });

  it('convierte markdown a html', () => {
    const html = String(servicio.renderizar('# Título\n\nUn párrafo con **negrita**.'));
    expect(html).toContain('<h1>Título</h1>');
    expect(html).toContain('<strong>negrita</strong>');
    expect(html).toContain('<p>');
  });

  it('convierte listas y enlaces', () => {
    const html = String(servicio.renderizar('- Uno\n- Dos\n\n[Enlace](https://example.com)'));
    expect(html).toContain('<ul>');
    expect(html).toContain('<li>Uno</li>');
    expect(html).toContain('<a href="https://example.com">');
  });

  it('elimina el contenido peligroso (scripts y atributos on*)', () => {
    const html = String(
      servicio.renderizar('<script>alert(1)</script>\n<img src="x" onerror="alert(2)">\nHola'),
    );
    expect(html).not.toContain('<script');
    expect(html).not.toContain('onerror');
    expect(html).toContain('Hola');
  });

  it('acepta null o vacío sin romperse', () => {
    expect(() => servicio.renderizar('')).not.toThrow();
    expect(() => servicio.renderizar(undefined as unknown as string)).not.toThrow();
  });
});
