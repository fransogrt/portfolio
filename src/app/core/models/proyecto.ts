// Proyectos destacados del portfolio.
//
// D6 (plan): confirmados SOLO flowabot y replaybot. El tercer proyecto se
// añadirá cuando se decida: basta una entrada aquí y su Markdown en
// `public/content/proyectos/`.

export interface Proyecto {
  slug: string;
  titulo: string;
  resumen: string;
  tecnologias: string[];
  estado: string;
  produccion?: string;
}

export const PROYECTOS: Proyecto[] = [
  {
    slug: 'flowabot',
    titulo: 'Flowabot',
    resumen:
      'Bot de Discord escrito en JavaScript, activo en octubre de 2026 y autohospedado en mi Raspberry Pi.',
    tecnologias: ['JavaScript', 'Discord', 'Docker'],
    estado: 'Activo — octubre 2026',
    produccion: 'Corre en producción en mi Raspberry Pi 5, puerto 8487.',
  },
  {
    slug: 'replaybot',
    titulo: 'Replaybot',
    resumen:
      'Proyecto desarrollado en Go (julio de 2026), un salto fuera del ecosistema JavaScript hacia un lenguaje compilado y de tipado estático.',
    tecnologias: ['Go'],
    estado: 'Desarrollado en Go — julio 2026',
  },
];
