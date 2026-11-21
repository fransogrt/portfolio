// Smoke de la página de inicio: hero con los dos CTA (D2) y los proyectos
// confirmados (D6).

import { TestBed } from '@angular/core/testing';
import { Inicio } from './inicio';
import { appConfig } from '../../../../app.config';

describe('Inicio', () => {
  async function renderizar() {
    await TestBed.configureTestingModule({
      imports: [Inicio],
      providers: appConfig.providers,
    }).compileComponents();
    const fixture = TestBed.createComponent(Inicio);
    await fixture.whenStable();
    return fixture.nativeElement as HTMLElement;
  }

  it('muestra el nombre y el rol', async () => {
    const elemento = await renderizar();
    expect(elemento.querySelector('h1')?.textContent).toContain('Francisco Ogallar');
    expect(elemento.textContent).toContain('JavaScript y TypeScript');
  });

  it('muestra los dos CTA: contactarme (mailto) y ver proyectos', async () => {
    const elemento = await renderizar();
    const mailto = elemento.querySelector('a[href="mailto:contacto@fransogrt.xyz"]');
    expect(mailto?.textContent).toContain('Contactarme');
    expect(elemento.querySelector('a[routerlink="/proyectos"]')).toBeTruthy();
    expect(elemento.textContent).toContain('Ver proyectos');
  });

  it('muestra los dos proyectos confirmados, sin tercero', async () => {
    const elemento = await renderizar();
    expect(elemento.querySelectorAll('app-tarjeta-proyecto').length).toBe(2);
    expect(elemento.textContent).toContain('Flowabot');
    expect(elemento.textContent).toContain('Replaybot');
  });

  it('define el título y la description de la página (D3)', async () => {
    await renderizar();
    expect(document.title).toBe('Francisco Ogallar');
    expect(document.querySelector('meta[name="description"]')?.getAttribute('content')).toContain(
      'desarrollador full-stack',
    );
  });
});
