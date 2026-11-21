// Perfil verificado del portfolio. Los datos de contacto y las rutas viven
// aquí para que solo haya un sitio donde cambiarlos.
//
// Nota: `cvDisponible` vale false mientras no exista el PDF en
// `public/cv/` (ver public/cv/README.md). Al subirlo, ponerlo a true.

export const PERFIL = {
  nombre: 'Francisco Ogallar',
  rol: 'Desarrollador full-stack JavaScript y TypeScript',
  email: 'contacto@fransogrt.xyz',
  github: 'https://github.com/fransogrt',
  linkedin: 'https://www.linkedin.com/in/francisco-ogallar/',
  cv: {
    ruta: '/cv/cv-francisco-ogallar.pdf',
    disponible: false,
  },
} as const;
