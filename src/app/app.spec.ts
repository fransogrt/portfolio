// Smoke del shell: cabecera con navegación, outlet y pie con enlaces sociales.

import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { appConfig } from './app.config';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: appConfig.providers,
    }).compileComponents();
  });

  it('crea la aplicación', () => {
    const fixture = TestBed.createComponent(App);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('renderiza la navegación principal', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const elemento = fixture.nativeElement as HTMLElement;
    const enlaces = Array.from(elemento.querySelectorAll('nav a')).map((a) =>
      a.textContent?.trim(),
    );
    expect(enlaces).toEqual(['Inicio', 'Proyectos', 'Sobre mí', 'Contacto']);
  });

  it('renderiza el pie con GitHub, LinkedIn y email', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const elemento = fixture.nativeElement as HTMLElement;
    expect(elemento.querySelector('a[href="https://github.com/fransogrt"]')).toBeTruthy();
    expect(
      elemento.querySelector('a[href="https://www.linkedin.com/in/francisco-ogallar/"]'),
    ).toBeTruthy();
    expect(elemento.querySelector('a[href="mailto:contacto@fransogrt.xyz"]')).toBeTruthy();
  });
});
