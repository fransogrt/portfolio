// Página de detalle de proyecto: la ruta /proyectos/:slug llega como input
// (withComponentInputBinding). Solo existen los slugs de PROYECTOS.

import { ChangeDetectionStrategy, Component, computed, effect, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { Markdown } from '../../../../shared/ui/components/markdown/markdown';
import { PROYECTOS } from '../../../../core/models/proyecto';
import { SeoService } from '../../../../core/services/seo.service';

@Component({
  selector: 'app-detalle-proyecto',
  imports: [RouterLink, MatButtonModule, Markdown],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './detalle-proyecto.html',
  styleUrl: './detalle-proyecto.scss',
})
export class DetalleProyecto {
  readonly slug = input.required<string>();

  protected readonly proyecto = computed(() => PROYECTOS.find((p) => p.slug === this.slug()));

  constructor() {
    const seo = inject(SeoService);
    effect(() => {
      const proyecto = this.proyecto();
      if (proyecto) {
        seo.definir(`${proyecto.titulo} — Francisco Ogallar`, proyecto.resumen);
      }
    });
  }
}
