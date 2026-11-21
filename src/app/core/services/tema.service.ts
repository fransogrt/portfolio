// Servicio de tema claro/oscuro: una señal con el tema actual, persistido en
// localStorage y aplicado como atributo `data-tema` en <html>. El CSS cambia
// `color-scheme` según el atributo (s03_base/_system-tokens.scss), con lo que
// se reteman a la vez los tokens propios y los de Angular Material.

import { DOCUMENT, Injectable, inject, signal } from '@angular/core';

export type Tema = 'claro' | 'oscuro';

const CLAVE_STORAGE = 'portfolio-tema';

@Injectable({ providedIn: 'root' })
export class TemaService {
  private readonly documento = inject(DOCUMENT);

  private readonly temaInterno = signal<Tema>('claro');

  /** Tema actual del sitio. */
  readonly tema = this.temaInterno.asReadonly();

  constructor() {
    this.restaurar();
  }

  /** Cambia al tema contrario. */
  alternar(): void {
    this.aplicar(this.temaInterno() === 'claro' ? 'oscuro' : 'claro');
  }

  /** Recupera el tema guardado (o el del sistema) y lo aplica. */
  restaurar(): void {
    const guardado = this.leerStorage();
    if (guardado) {
      this.aplicar(guardado);
      return;
    }
    this.aplicar(this.prefiereOscuroElSistema() ? 'oscuro' : 'claro');
  }

  private aplicar(tema: Tema): void {
    this.temaInterno.set(tema);
    this.documento.documentElement.setAttribute('data-tema', tema);

    const meta = this.documento.querySelector<HTMLMetaElement>('meta[name="color-scheme"]');
    meta?.setAttribute('content', tema === 'claro' ? 'light' : 'dark');

    this.escribirStorage(tema);
  }

  private leerStorage(): Tema | null {
    try {
      const valor = this.documento.defaultView?.localStorage?.getItem(CLAVE_STORAGE) ?? null;
      return valor === 'claro' || valor === 'oscuro' ? valor : null;
    } catch {
      // Almacenamiento bloqueado: se sigue con el tema del sistema.
      return null;
    }
  }

  private escribirStorage(tema: Tema): void {
    try {
      this.documento.defaultView?.localStorage?.setItem(CLAVE_STORAGE, tema);
    } catch {
      // Escritura fallida: el tema sigue operativo solo en memoria.
    }
  }

  private prefiereOscuroElSistema(): boolean {
    const vista = this.documento.defaultView;
    return typeof vista?.matchMedia === 'function'
      ? vista.matchMedia('(prefers-color-scheme: dark)').matches
      : false;
  }
}
