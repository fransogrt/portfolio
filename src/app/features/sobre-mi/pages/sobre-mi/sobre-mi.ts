// Página Sobre mí: formación y certificaciones (D5, material real: DAW), con
// el enlace al CV en estado elegante mientras el PDF no exista.

import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Markdown } from '../../../../shared/ui/components/markdown/markdown';
import { PERFIL } from '../../../../core/models/perfil';
import { SeoService } from '../../../../core/services/seo.service';

@Component({
  selector: 'app-sobre-mi',
  imports: [MatButtonModule, Markdown],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './sobre-mi.html',
  styleUrl: './sobre-mi.scss',
})
export class SobreMi {
  protected readonly perfil = PERFIL;

  constructor() {
    inject(SeoService).definir(
      'Sobre mí — Francisco Ogallar',
      'Formación en Desarrollo de Aplicaciones Web (DAW), certificaciones y forma de trabajar de Francisco Ogallar.',
    );
  }
}
