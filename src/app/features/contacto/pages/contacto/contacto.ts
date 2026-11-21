// Página de contacto: email directo (D11, sin formulario), GitHub y LinkedIn.

import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Markdown } from '../../../../shared/ui/components/markdown/markdown';
import { PERFIL } from '../../../../core/models/perfil';
import { SeoService } from '../../../../core/services/seo.service';

@Component({
  selector: 'app-contacto',
  imports: [MatButtonModule, Markdown],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './contacto.html',
  styleUrl: './contacto.scss',
})
export class Contacto {
  protected readonly perfil = PERFIL;

  constructor() {
    inject(SeoService).definir(
      'Contacto — Francisco Ogallar',
      'Cómo contactar con Francisco Ogallar: email directo, GitHub y LinkedIn.',
    );
  }
}
