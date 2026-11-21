// Smoke de la página de proyectos: exactamente los 2 proyectos confirmados
// (D6), cada uno enlazando a su detalle.

import { TestBed } from '@angular/core/testing';
import { Proyectos } from './proyectos';
import { appConfig } from '../../../../app.config';

describe('Proyectos', () => {
  async function renderizar() {
    await TestBed.configureTestingModule({
      imports: [Proyectos],
      providers: appConfig.providers,
    }).compileComponents();
    const fixture = TestBed.createComponent(Proyectos);
    await fixture.whenStable();
    return fixture.nativeElement as HTMLElement;
  }

  it('lista flowabot y replaybot', async () => {
    const elemento = await renderizar();
    expect(elemento.textContent).toContain('Flowabot');
    expect(elemento.textContent).toContain('Replaybot');
    expect(elemento.querySelectorAll('app-tarjeta-proyecto').length).toBe(2);
  });

  it('no inventa un tercer proyecto', async () => {
    const elemento = await renderizar();
    const titulos = Array.from(elemento.querySelectorAll('.c-tarjeta__titulo')).map((nodo) =>
      nodo.textContent?.trim(),
    );
    expect(titulos).toEqual(['Flowabot', 'Replaybot']);
  });

  it('enlaza cada proyecto a su detalle', async () => {
    const elemento = await renderizar();
    const hrefs = Array.from(elemento.querySelectorAll('.c-tarjeta__enlace')).map((nodo) =>
      nodo.getAttribute('href'),
    );
    expect(hrefs).toEqual(['/proyectos/flowabot', '/proyectos/replaybot']);
  });
});
