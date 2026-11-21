// SEO por página (D3): título y meta description por ruta. Se llama desde el
// constructor de cada página, así que también queda reflejado en el HTML
// prerenderizado.

import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly titulo = inject(Title);
  private readonly meta = inject(Meta);

  definir(titulo: string, descripcion: string): void {
    this.titulo.setTitle(titulo);
    this.meta.updateTag({ name: 'description', content: descripcion });
  }
}
