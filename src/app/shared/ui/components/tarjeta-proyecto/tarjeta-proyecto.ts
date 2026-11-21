// Tarjeta de proyecto reutilizable (lista de proyectos y destacados en inicio).
// El estilo del bloque vive en el .scss de este componente (es su única
// implementación; no hay bloque global duplicado).

import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Proyecto } from '../../../../core/models/proyecto';

@Component({
  selector: 'app-tarjeta-proyecto',
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './tarjeta-proyecto.scss',
  template: `
    <article class="c-tarjeta">
      <div class="c-tarjeta__cabecera">
        <h3 class="c-tarjeta__titulo">
          <a class="c-tarjeta__enlace" [routerLink]="['/proyectos', proyecto().slug]">
            {{ proyecto().titulo }}
          </a>
        </h3>
        <p class="c-tarjeta__estado">{{ proyecto().estado }}</p>
      </div>
      <p class="c-tarjeta__texto">{{ proyecto().resumen }}</p>
      <ul class="c-tarjeta__etiquetas">
        @for (tecnologia of proyecto().tecnologias; track tecnologia) {
          <li class="c-tarjeta__etiqueta">{{ tecnologia }}</li>
        }
      </ul>
    </article>
  `,
})
export class TarjetaProyecto {
  readonly proyecto = input.required<Proyecto>();
}
