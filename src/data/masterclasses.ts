export interface Masterclass {
  slug: string;
  sede: string;
  sedeCorta: string;
  fechaISO: string; // ISO date for ordering
  fechaLabel: string; // e.g. "Sábado 28 de Junio"
  hora: string; // e.g. "15 hs"
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
    fechaISO: "2026-06-28T15:00:00-03:00",
    fechaLabel: "Domingo 28 de Junio",
    hora: "15 hs",
    direccion: "Juana Manso y Martha Lynch, Puerto Madero",
    mapsUrl: "https://maps.app.goo.gl/QKdHNpXbNSwK9yRh9",
    whatsappUrl: "https://wa.link/7vfiie",
    precios: {
      general: "$29.000",
      conAlquiler: "$49.000",
      alumnos: "$20.000",
    },
  },
  {
    slug: "skatepark-pacha-palermo",
    sede: "Skatepark Pacha Palermo",
    sedeCorta: "Skatepark Pacha",
    fechaISO: "2026-07-26T15:00:00-03:00",
    fechaLabel: "Sábado 26 de Julio",
    hora: "15 hs",
    direccion: "Av. Costanera Rafael Obligado, Palermo",
    mapsUrl: "https://maps.google.com/?q=Skatepark+Pacha+Palermo",
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
  const futuras = masterclasses
    .filter((m) => new Date(m.fechaISO).getTime() >= ahora)
    .sort((a, b) => a.fechaISO.localeCompare(b.fechaISO));
  return futuras[0] ?? masterclasses[0];
};
