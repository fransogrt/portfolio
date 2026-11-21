// Página de inicio: hero con los dos CTA (D2), proyectos destacados y
// presentación cargada de public/content/secciones/inicio.md.

import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { Markdown } from '../../../../shared/ui/components/markdown/markdown';
import { TarjetaProyecto } from '../../../../shared/ui/components/tarjeta-proyecto/tarjeta-proyecto';
import { PERFIL } from '../../../../core/models/perfil';
import { PROYECTOS } from '../../../../core/models/proyecto';
import { SeoService } from '../../../../core/services/seo.service';

@Component({
  selector: 'app-inicio',
  imports: [RouterLink, MatButtonModule, Markdown, TarjetaProyecto],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './inicio.html',
  styleUrl: './inicio.scss',
})
export class Inicio {
  protected readonly perfil = PERFIL;
  protected readonly proyectosDestacados = PROYECTOS;

  constructor() {
    inject(SeoService).definir(
      'Francisco Ogallar',
      'Portfolio de Francisco Ogallar, desarrollador full-stack de JavaScript y TypeScript. Proyectos, formación y contacto.',
    );
  }
}
