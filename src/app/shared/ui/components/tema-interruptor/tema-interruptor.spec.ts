// Interruptor de tema: alterna el TemaService al pulsar y actualiza el
// aria-label con la acción que va a hacer.

import { TestBed } from '@angular/core/testing';
import { TemaInterruptor } from './tema-interruptor';

describe('TemaInterruptor', () => {
  beforeEach(() => {
    window.localStorage.clear();
    document.documentElement.removeAttribute('data-tema');
  });

  async function renderizar() {
    await TestBed.configureTestingModule({ imports: [TemaInterruptor] }).compileComponents();
    const fixture = TestBed.createComponent(TemaInterruptor);
    await fixture.whenStable();
    return fixture;
  }

  it('pulsar cambia el tema y el aria-label', async () => {
    const fixture = await renderizar();
    const boton = fixture.nativeElement.querySelector('button') as HTMLButtonElement;

    expect(document.documentElement.getAttribute('data-tema')).toBe('claro');
    expect(boton.getAttribute('aria-label')).toBe('Activar modo oscuro');

    boton.click();
    await fixture.whenStable();

    expect(document.documentElement.getAttribute('data-tema')).toBe('oscuro');
    expect(boton.getAttribute('aria-label')).toBe('Activar modo claro');
    expect(window.localStorage.getItem('portfolio-tema')).toBe('oscuro');
  });
});
