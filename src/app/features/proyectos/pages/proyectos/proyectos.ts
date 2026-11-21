// Página de proyectos: listado de los proyectos confirmados (D6: solo
// flowabot y replaybot; el tercero se añadirá cuando se decida).

import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Markdown } from '../../../../shared/ui/components/markdown/markdown';
import { TarjetaProyecto } from '../../../../shared/ui/components/tarjeta-proyecto/tarjeta-proyecto';
import { PROYECTOS } from '../../../../core/models/proyecto';
import { SeoService } from '../../../../core/services/seo.service';

@Component({
  selector: 'app-proyectos',
  imports: [Markdown, TarjetaProyecto],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './proyectos.html',
  styleUrl: './proyectos.scss',
})
export class Proyectos {
  protected readonly proyectos = PROYECTOS;

  constructor() {
    inject(SeoService).definir(
      'Proyectos — Francisco Ogallar',
      'Proyectos destacados de Francisco Ogallar: un bot de Discord en JavaScript y un proyecto desarrollado en Go.',
    );
  }
}
