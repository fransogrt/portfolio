// Configuración de la aplicación (navegador): routing con inputs de ruta
// vinculados, hidratación para el prerender y HttpClient para los Markdown.
// El purificador de Markdown es el de navegador; el de servidor se sustituye
// en app.config.server.ts.

import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideClientHydration } from '@angular/platform-browser';
import { routes } from './app.routes';
import { PURIFICADOR_MARKDOWN } from './core/services/markdown-sanitizador';
import { SanitizadorMarkdownNavegador } from './core/services/markdown-sanitizador.navegador';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withComponentInputBinding()),
    provideClientHydration(),
    provideHttpClient(withFetch()),
    { provide: PURIFICADOR_MARKDOWN, useClass: SanitizadorMarkdownNavegador },
  ],
};
