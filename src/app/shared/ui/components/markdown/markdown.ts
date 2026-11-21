// Bloque de contenido Markdown: carga un fichero de public/content/ con
// httpResource.text (D13; el .md es texto, no JSON) y lo pinta sanitizado con
// [innerHTML]. En prerender lo sirve FicherosContentBackend (leer los .md del
// disco, app.config.server.ts) y en el navegador el backend normal: el
// contenido queda en el HTML estático y sigue llegando al cliente.

import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { MarkdownService } from '../../../../core/services/markdown.service';

@Component({
  selector: 'app-markdown',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (contenido.hasValue()) {
      <div class="markdown" [innerHTML]="html()"></div>
    } @else if (contenido.error()) {
      <p class="markdown__error">No se pudo cargar el contenido.</p>
    } @else {
      <p class="markdown__cargando" aria-busy="true">Cargando contenido…</p>
    }
  `,
  styles: `
    :host {
      display: block;
    }
  `,
})
export class Markdown {
  /** Ruta del fichero dentro de public/content (p. ej. 'proyectos/flowabot.md'). */
  readonly ruta = input.required<string>();

  private readonly markdown = inject(MarkdownService);

  /** El fichero es texto plano: responseType 'text', nunca el parser JSON. */
  protected readonly contenido = httpResource.text(
    () => (this.ruta() ? `/content/${this.ruta()}` : undefined),
    { defaultValue: '' },
  );

  protected readonly html = computed(() => this.markdown.renderizar(this.contenido.value()));
}
