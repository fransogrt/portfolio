// Configuración de la aplicación SOLO en servidor/prerender: server routes y
// dos sustituciones de proveedores del navegador:
// - HttpBackend que sirve /content/*.md desde disco (el Markdown entra en el
//   HTML prerenderizado; el navegador no usa este backend).
// - Purificador de Markdown con ventana jsdom (DOMPurify necesita DOM real).

import { ApplicationConfig, mergeApplicationConfig } from '@angular/core';
import { HttpBackend } from '@angular/common/http';
import { provideServerRendering, withRoutes } from '@angular/ssr';
import { appConfig } from './app.config';
import { serverRoutes } from './app.routes.server';
import { PURIFICADOR_MARKDOWN } from './core/services/markdown-sanitizador';
import { SanitizadorMarkdownServidor } from './core/services/markdown-sanitizador.servidor';
import { FicherosContentBackend } from './core/services/ficheros-content.backend';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(withRoutes(serverRoutes)),
    { provide: PURIFICADOR_MARKDOWN, useClass: SanitizadorMarkdownServidor },
    { provide: HttpBackend, useClass: FicherosContentBackend },
  ],
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
