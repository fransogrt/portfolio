// Rutas del sitio: una por página (D4), con lazy loading y título de
// pestaña propio (D3). Los detalles de proyecto van por parámetro.

import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/inicio/pages/inicio/inicio').then((m) => m.Inicio),
    title: 'Francisco Ogallar',
  },
  {
    path: 'proyectos',
    loadComponent: () =>
      import('./features/proyectos/pages/proyectos/proyectos').then((m) => m.Proyectos),
    title: 'Proyectos — Francisco Ogallar',
  },
  {
    path: 'proyectos/:slug',
    loadComponent: () =>
      import('./features/proyectos/pages/detalle-proyecto/detalle-proyecto').then(
        (m) => m.DetalleProyecto,
      ),
    title: 'Proyecto — Francisco Ogallar',
  },
  {
    path: 'sobre-mi',
    loadComponent: () =>
      import('./features/sobre-mi/pages/sobre-mi/sobre-mi').then((m) => m.SobreMi),
    title: 'Sobre mí — Francisco Ogallar',
  },
  {
    path: 'contacto',
    loadComponent: () =>
      import('./features/contacto/pages/contacto/contacto').then((m) => m.Contacto),
    title: 'Contacto — Francisco Ogallar',
  },
  { path: '**', redirectTo: '' },
];
