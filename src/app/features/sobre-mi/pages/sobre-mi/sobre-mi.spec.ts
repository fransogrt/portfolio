// Smoke de Sobre mí: formación DAW (D5) y CV en estado elegante sin PDF.

import { TestBed } from '@angular/core/testing';
import { SobreMi } from './sobre-mi';
import { appConfig } from '../../../../app.config';

describe('SobreMi', () => {
  async function renderizar() {
    await TestBed.configureTestingModule({
      imports: [SobreMi],
      providers: appConfig.providers,
    }).compileComponents();
    const fixture = TestBed.createComponent(SobreMi);
    await fixture.whenStable();
    return fixture.nativeElement as HTMLElement;
  }

  it('muestra la sección de currículum con el botón deshabilitado', async () => {
    const elemento = await renderizar();
    const cv = elemento.querySelector('button[disabled]');
    expect(cv?.textContent).toContain('Descargar CV');
    expect(elemento.textContent).toContain('todavía no está publicado');
  });

  it('no enlaza al PDF mientras no exista', async () => {
    const elemento = await renderizar();
    expect(elemento.querySelector('a[href="/cv/cv-francisco-ogallar.pdf"]')).toBeNull();
  });
});
