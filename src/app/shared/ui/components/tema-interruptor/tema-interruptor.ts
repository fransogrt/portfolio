// Interruptor del tema claro/oscuro: botón de icono de Material que alterna
// el TemaService y anuncia el cambio por accesibilidad.

import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { TemaService } from '../../../../core/services/tema.service';

@Component({
  selector: 'app-tema-interruptor',
  imports: [MatButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button
      matIconButton
      type="button"
      (click)="tema.alternar()"
      [attr.aria-label]="etiqueta()"
      [attr.title]="etiqueta()"
    >
      <span class="material-symbols-rounded" aria-hidden="true">
        {{ tema.tema() === 'claro' ? 'dark_mode' : 'light_mode' }}
      </span>
    </button>
  `,
  styles: `
    :host {
      display: inline-flex;
    }
  `,
})
export class TemaInterruptor {
  protected readonly tema = inject(TemaService);

  protected readonly etiqueta = computed(() =>
    this.tema.tema() === 'claro' ? 'Activar modo oscuro' : 'Activar modo claro',
  );
}
