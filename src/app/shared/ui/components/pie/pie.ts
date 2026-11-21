// Pie del sitio: aviso y enlaces sociales (GitHub, LinkedIn y email).

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PERFIL } from '../../../../core/models/perfil';

@Component({
  selector: 'app-pie',
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './pie.html',
  styleUrl: './pie.scss',
})
export class Pie {
  protected readonly perfil = PERFIL;
  protected readonly anio = new Date().getFullYear();
}
