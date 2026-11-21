// Toggle claro/oscuro: señal, atributo data-tema en <html>, meta color-scheme
// y persistencia en localStorage.

import { TestBed } from '@angular/core/testing';
import { TemaService } from './tema.service';

describe('TemaService', () => {
  beforeEach(() => {
    window.localStorage.clear();
    document.documentElement.removeAttribute('data-tema');
    document.querySelector('meta[name="color-scheme"]')?.remove();
    document.head.insertAdjacentHTML('beforeend', '<meta name="color-scheme" content="light">');
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('empieza en claro si no hay preferencia guardada ni del sistema', () => {
    const servicio = TestBed.inject(TemaService);
    expect(servicio.tema()).toBe('claro');
  });

  it('restaura el tema guardado en localStorage', () => {
    window.localStorage.setItem('portfolio-tema', 'oscuro');
    const servicio = TestBed.inject(TemaService);
    expect(servicio.tema()).toBe('oscuro');
    expect(document.documentElement.getAttribute('data-tema')).toBe('oscuro');
    expect(document.querySelector('meta[name="color-scheme"]')?.getAttribute('content')).toBe(
      'dark',
    );
  });

  it('alternar pasa a oscuro, aplica el atributo y persiste', () => {
    const servicio = TestBed.inject(TemaService);
    servicio.alternar();
    expect(servicio.tema()).toBe('oscuro');
    expect(document.documentElement.getAttribute('data-tema')).toBe('oscuro');
    expect(document.querySelector('meta[name="color-scheme"]')?.getAttribute('content')).toBe(
      'dark',
    );
    expect(window.localStorage.getItem('portfolio-tema')).toBe('oscuro');
  });

  it('alternar dos veces vuelve al tema claro', () => {
    const servicio = TestBed.inject(TemaService);
    servicio.alternar();
    servicio.alternar();
    expect(servicio.tema()).toBe('claro');
    expect(document.documentElement.getAttribute('data-tema')).toBe('claro');
    expect(window.localStorage.getItem('portfolio-tema')).toBe('claro');
  });

  it('sobrevive a un localStorage que lanza al leer (SEG-2)', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('acceso al almacenamiento bloqueado');
    });
    const servicio = TestBed.inject(TemaService);
    expect(servicio.tema()).toBe('claro');
    expect(document.documentElement.getAttribute('data-tema')).toBe('claro');
  });

  it('sobrevive a un localStorage que lanza al escribir (SEG-2)', () => {
    const servicio = TestBed.inject(TemaService);
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('acceso al almacenamiento bloqueado');
    });
    expect(() => servicio.alternar()).not.toThrow();
    expect(servicio.tema()).toBe('oscuro');
    expect(document.documentElement.getAttribute('data-tema')).toBe('oscuro');
    expect(document.querySelector('meta[name="color-scheme"]')?.getAttribute('content')).toBe(
      'dark',
    );
  });
});
