// Smoke de Contacto: mailto (D11), GitHub y LinkedIn (D5).

import { TestBed } from '@angular/core/testing';
import { Contacto } from './contacto';
import { appConfig } from '../../../../app.config';

describe('Contacto', () => {
  async function renderizar() {
    await TestBed.configureTestingModule({
      imports: [Contacto],
      providers: appConfig.providers,
    }).compileComponents();
    const fixture = TestBed.createComponent(Contacto);
    await fixture.whenStable();
    return fixture.nativeElement as HTMLElement;
  }

  it('ofrece el CTA de email directo', async () => {
    const elemento = await renderizar();
    const mailto = elemento.querySelector('a[href="mailto:contacto@fransogrt.xyz"]');
    expect(mailto?.textContent).toContain('Contactarme');
    expect(elemento.textContent).toContain('contacto@fransogrt.xyz');
  });

  it('enlaza GitHub y LinkedIn verificados', async () => {
    const elemento = await renderizar();
    expect(elemento.querySelector('a[href="https://github.com/fransogrt"]')).toBeTruthy();
    expect(
      elemento.querySelector('a[href="https://www.linkedin.com/in/francisco-ogallar/"]'),
    ).toBeTruthy();
  });
});
