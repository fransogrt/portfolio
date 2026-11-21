// Shell de la aplicación: cabecera fija, contenido enrutado y pie.

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Cabecera } from './shared/ui/components/cabecera/cabecera';
import { Pie } from './shared/ui/components/pie/pie';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Cabecera, Pie],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
