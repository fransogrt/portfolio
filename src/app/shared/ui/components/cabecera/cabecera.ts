// Cabecera del sitio: marca, navegación principal y interruptor de tema.

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TemaInterruptor } from '../tema-interruptor/tema-interruptor';

interface EnlaceNavegacion {
  ruta: string;
  texto: string;
  exacta: boolean;
}

@Component({
  selector: 'app-cabecera',
  imports: [RouterLink, RouterLinkActive, TemaInterruptor],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './cabecera.html',
  styleUrl: './cabecera.scss',
})
export class Cabecera {
  protected readonly enlaces: EnlaceNavegacion[] = [
    { ruta: '/', texto: 'Inicio', exacta: true },
    { ruta: '/proyectos', texto: 'Proyectos', exacta: true },
    { ruta: '/sobre-mi', texto: 'Sobre mí', exacta: true },
    { ruta: '/contacto', texto: 'Contacto', exacta: true },
  ];
}
