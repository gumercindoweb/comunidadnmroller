export interface Masterclass {
  slug: string;
  sede: string;
  sedeCorta: string;
  fechaISO: string; // ISO date for ordering
  fechaLabel: string; // e.g. "Sábado 28 de Junio"
  hora: string; // e.g. "15 hs"
  ventaHasta: string; // ISO date when ticket sales close → triggers waitlist redirect
  direccion: string;
  mapsUrl: string;
  whatsappUrl: string;
  precios: {
    general: string;
    conAlquiler: string;
    alumnos: string;
  };
}

export const masterclasses: Masterclass[] = [
  {
    slug: "puerto-madero",
    sede: "Puerto Madero",
    sedeCorta: "Puerto Madero",
    fechaISO: "2026-07-26T15:00:00-03:00",
    fechaLabel: "Domingo 26 de Julio",
    hora: "15 hs",
    ventaHasta: "2026-07-24T23:59:59-03:00",
    direccion: "Juana Manso y Martha Lynch, Puerto Madero",
    mapsUrl: "https://maps.app.goo.gl/QKdHNpXbNSwK9yRh9",
    whatsappUrl: "https://wa.link/7vfiie",
    precios: {
      general: "$29.000",
      conAlquiler: "$49.000",
      alumnos: "$20.000",
    },
  },
];

export const getMasterclass = (slug?: string): Masterclass | undefined => {
  if (!slug) return getProximaMasterclass();
  return masterclasses.find((m) => m.slug === slug);
};

export const getProximaMasterclass = (): Masterclass => {
  const ahora = Date.now();
  // Una masterclass se promociona hasta que cierra su venta (ventaHasta).
  // Al cerrar, todas las promos del sitio (banner, popup, footer, redirect)
  // pasan automáticamente a la siguiente.
  const vigentes = masterclasses
    .filter((m) => new Date(m.ventaHasta).getTime() > ahora)
    .sort((a, b) => a.fechaISO.localeCompare(b.fechaISO));
  return vigentes[0] ?? masterclasses[masterclasses.length - 1];
};
