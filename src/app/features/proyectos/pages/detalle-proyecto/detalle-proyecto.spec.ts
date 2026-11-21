// Detalle de proyecto: slug por input de ruta; solo los slugs confirmados
// (D6) y un estado de "no encontrado" elegante para el resto.

import { TestBed } from '@angular/core/testing';
import { DetalleProyecto } from './detalle-proyecto';
import { appConfig } from '../../../../app.config';

describe('DetalleProyecto', () => {
  async function renderizar(slug: string) {
    await TestBed.configureTestingModule({
      imports: [DetalleProyecto],
      providers: appConfig.providers,
    }).compileComponents();
    const fixture = TestBed.createComponent(DetalleProyecto);
    fixture.componentRef.setInput('slug', slug);
    await fixture.whenStable();
    return fixture;
  }

  it('renderiza el detalle de flowabot', async () => {
    const fixture = await renderizar('flowabot');
    const elemento = fixture.nativeElement as HTMLElement;
    expect(elemento.querySelector('h1')?.textContent).toContain('Flowabot');
    expect(elemento.textContent).toContain('Activo — octubre 2026');
    expect(elemento.textContent).toContain('puerto 8487');
  });

  it('renderiza el detalle de replaybot', async () => {
    const fixture = await renderizar('replaybot');
    const elemento = fixture.nativeElement as HTMLElement;
    expect(elemento.querySelector('h1')?.textContent).toContain('Replaybot');
    expect(elemento.textContent).toContain('Desarrollado en Go — julio 2026');
  });

  it('muestra un estado de no encontrado para slugs inexistentes', async () => {
    const fixture = await renderizar('no-existe');
    const elemento = fixture.nativeElement as HTMLElement;
    expect(elemento.textContent).toContain('Proyecto no encontrado');
    expect(elemento.querySelector('a[routerlink="/proyectos"]')).toBeTruthy();
  });

  it('defini el seo con el titulo del proyecto', async () => {
    await renderizar('flowabot');
    expect(document.title).toContain('Flowabot — Francisco Ogallar');
  });
});
