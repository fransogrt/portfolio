// Integración del bloque Markdown (TEST-1/SEG-1/TEST-2): el .md se pide como
// TEXTO (httpResource.text, no el parser JSON), se renderiza a HTML con
// headings y párrafos, y la sanitización elimina <script>/onerror y
// neutraliza enlaces javascript: conservando su texto.

import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { Markdown } from './markdown';
import { PURIFICADOR_MARKDOWN } from '../../../../core/services/markdown-sanitizador';
import { SanitizadorMarkdownNavegador } from '../../../../core/services/markdown-sanitizador.navegador';

describe('Markdown (integración)', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Markdown],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: PURIFICADOR_MARKDOWN, useClass: SanitizadorMarkdownNavegador },
      ],
    }).compileComponents();
  });

  afterEach(() => {
    TestBed.inject(HttpTestingController).verify();
  });

  it('pide el fichero como texto y renderiza headings y párrafos', async () => {
    const fixture = TestBed.createComponent(Markdown);
    fixture.componentRef.setInput('ruta', 'proyectos/prueba.md');
    fixture.detectChanges();

    const http = TestBed.inject(HttpTestingController);
    const peticion = http.expectOne('/content/proyectos/prueba.md');
    expect(peticion.request.method).toBe('GET');
    expect(peticion.request.responseType).toBe('text');
    peticion.flush('# Título de prueba\n\nUn párrafo con **negrita**.\n\n- Elemento uno\n', {
      headers: { 'Content-Type': 'text/markdown' },
    });

    await fixture.whenStable();
    const elemento = fixture.nativeElement as HTMLElement;
    expect(elemento.querySelector('.markdown h1')?.textContent).toContain('Título de prueba');
    expect(elemento.textContent).toContain('Un párrafo con');
    expect(elemento.querySelector('.markdown li')?.textContent).toContain('Elemento uno');
  });

  it('elimina scripts y manejadores on* del HTML generado', async () => {
    const fixture = TestBed.createComponent(Markdown);
    fixture.componentRef.setInput('ruta', 'proyectos/prueba.md');
    fixture.detectChanges();

    TestBed.inject(HttpTestingController)
      .expectOne('/content/proyectos/prueba.md')
      .flush(
        '# Seguro\n\n<script>alert(1)</script><img src="x" onerror="alert(2)">\nTexto que sí queda.',
      );

    await fixture.whenStable();
    const elemento = fixture.nativeElement as HTMLElement;
    expect(elemento.innerHTML).not.toContain('<script');
    expect(elemento.innerHTML).not.toContain('onerror');
    expect(elemento.textContent).toContain('Texto que sí queda');
  });

  it('neutraliza un enlace javascript: conservando el texto legítimo (TEST-2)', async () => {
    const fixture = TestBed.createComponent(Markdown);
    fixture.componentRef.setInput('ruta', 'proyectos/prueba.md');
    fixture.detectChanges();

    TestBed.inject(HttpTestingController)
      .expectOne('/content/proyectos/prueba.md')
      .flush('[Enlace seguro](https://example.com)\n[Enlace malicioso](javascript:alert(3))');

    await fixture.whenStable();
    const elemento = fixture.nativeElement as HTMLElement;
    const seguro = elemento.querySelector('.markdown a[href="https://example.com"]');
    expect(seguro?.textContent).toContain('Enlace seguro');
    const malicioso = Array.from(elemento.querySelectorAll('.markdown a')).find((a) =>
      a.textContent?.includes('Enlace malicioso'),
    );
    expect(malicioso).toBeTruthy();
    expect(malicioso?.outerHTML).not.toContain('javascript:');
    expect(malicioso?.textContent).toContain('Enlace malicioso');
  });

  it('muestra el estado de error si el fichero no existe', async () => {
    const fixture = TestBed.createComponent(Markdown);
    fixture.componentRef.setInput('ruta', 'proyectos/que-no-existe.md');
    fixture.detectChanges();

    TestBed.inject(HttpTestingController)
      .expectOne('/content/proyectos/que-no-existe.md')
      .flush('no existe', { status: 404, statusText: 'Not Found' });

    await fixture.whenStable();
    const elemento = fixture.nativeElement as HTMLElement;
    expect(elemento.textContent).toContain('No se pudo cargar el contenido');
  });
});
