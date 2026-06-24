export interface ClaseSede {
  dia: string;
  hora: string;
  disciplina: string;
}

export interface Sede {
  id: string;
  nombre: string;
  direccion: string;
  area: string;
  lat: number;
  lng: number;
  mapsUrl: string;
  alquiler?: boolean;
  clases: ClaseSede[];
}

// Etiqueta unificada para los 3 niveles (según flyer Diciembre 2025)
export const NIVEL_UNIFICADO = "Inicial · Princip. · Inter.";

// Niveles separados: Inicial por un lado, Principiante + Intermedio unificados por otro
export const NIVEL_INICIAL = "Inicial";
export const NIVEL_PRINCIP_INTER = "Princip. · Inter.";

// Expande una disciplina en los badges a mostrar.
// Si es el nivel unificado, devuelve los dos badges de nivel separados.
export const expandirNivel = (disciplina?: string): string[] => {
  if (!disciplina) return [];
  if (disciplina === NIVEL_UNIFICADO) return [NIVEL_INICIAL, NIVEL_PRINCIP_INTER];
  return [disciplina];
};

// Coordenadas aproximadas de cada sede en CABA / GBA Norte
export const sedes: Sede[] = [
  {
    id: "rosedal",
    nombre: "Rosedal Palermo",
    direccion: "Infanta Isabel 555, Palermo",
    area: "CABA",
    lat: -34.5736,
    lng: -58.4156,
    mapsUrl: "https://maps.app.goo.gl/wsKfFUGqciPhAbup7",
    alquiler: true,
    clases: [
      { dia: "Martes", hora: "09:00", disciplina: NIVEL_UNIFICADO },
      { dia: "Martes", hora: "19:00", disciplina: NIVEL_UNIFICADO },
      { dia: "Martes", hora: "09:00", disciplina: "Slalom" },
      { dia: "Martes", hora: "20:00", disciplina: "Frenadas" },
      { dia: "Miércoles", hora: "19:00", disciplina: NIVEL_UNIFICADO },
      { dia: "Miércoles", hora: "20:00", disciplina: "Slalom" },
      { dia: "Jueves", hora: "19:00", disciplina: NIVEL_UNIFICADO },
      { dia: "Jueves", hora: "19:00", disciplina: "Slalom" },
      { dia: "Jueves", hora: "20:00", disciplina: "Rampas" },
      { dia: "Viernes", hora: "09:00", disciplina: NIVEL_UNIFICADO },
      { dia: "Viernes", hora: "09:00", disciplina: "Slalom" },
      { dia: "Sábado", hora: "10:00", disciplina: NIVEL_UNIFICADO },
      { dia: "Sábado", hora: "18:00", disciplina: NIVEL_UNIFICADO },
      { dia: "Sábado", hora: "10:00", disciplina: "Urbano" },
      { dia: "Domingo", hora: "10:00", disciplina: NIVEL_UNIFICADO },
    ],
  },
  {
    id: "puerto-madero",
    nombre: "Puerto Madero",
    direccion: "Juana Manso y Martha Lynch",
    area: "CABA",
    lat: -34.6118,
    lng: -58.3631,
    mapsUrl: "https://maps.app.goo.gl/QKdHNpXbNSwK9yRh9",
    alquiler: true,
    clases: [
      { dia: "Martes", hora: "18:00", disciplina: NIVEL_UNIFICADO },
      { dia: "Martes", hora: "19:00", disciplina: NIVEL_UNIFICADO },
      { dia: "Martes", hora: "19:00", disciplina: "Slalom" },
      { dia: "Sábado", hora: "09:00", disciplina: NIVEL_UNIFICADO },
      { dia: "Sábado", hora: "10:00", disciplina: "Urbano" },
    ],
  },
  {
    id: "caballito",
    nombre: "Caballito (P. Rivadavia)",
    direccion: "Monumento a Bolívar, Parque Rivadavia",
    area: "CABA",
    lat: -34.6189,
    lng: -58.4359,
    mapsUrl: "https://maps.app.goo.gl/PoyVBEq58EbUdtM59",
    clases: [
      { dia: "Lunes", hora: "19:00", disciplina: NIVEL_UNIFICADO },
      { dia: "Martes", hora: "19:00", disciplina: NIVEL_UNIFICADO },
      { dia: "Jueves", hora: "19:00", disciplina: NIVEL_UNIFICADO },
      { dia: "Jueves", hora: "20:00", disciplina: "Urbano" },
      { dia: "Domingo", hora: "09:00", disciplina: NIVEL_UNIFICADO },
      { dia: "Domingo", hora: "09:00", disciplina: "Slalom" },
    ],
  },
  {
    id: "vicente-lopez",
    nombre: "Vicente López",
    direccion: "Playón Río Vicente López",
    area: "GBA Norte",
    lat: -34.5230,
    lng: -58.4762,
    mapsUrl: "https://maps.app.goo.gl/spbof6ndxcJgAog56",
    alquiler: true,
    clases: [
      { dia: "Sábado", hora: "09:00", disciplina: NIVEL_UNIFICADO },
      { dia: "Sábado", hora: "09:00", disciplina: "Slalom" },
    ],
  },
  {
    id: "belgrano",
    nombre: "Belgrano",
    direccion: "Av. Figueroa Alcorta 6734",
    area: "CABA",
    lat: -34.5450,
    lng: -58.4490,
    mapsUrl: "https://maps.app.goo.gl/eUhoF2YDj4VnmPbp6",
    clases: [
      { dia: "Miércoles", hora: "19:00", disciplina: NIVEL_UNIFICADO },
      { dia: "Miércoles", hora: "20:00", disciplina: "Skatepark" },
      { dia: "Viernes", hora: "19:00", disciplina: NIVEL_UNIFICADO },
      { dia: "Viernes", hora: "20:00", disciplina: "Skatepark" },
    ],
  },
  {
    id: "villa-luro",
    nombre: "Villa Luro",
    direccion: "Av. Rivadavia 9300",
    area: "CABA",
    lat: -34.6385,
    lng: -58.5012,
    mapsUrl: "https://maps.app.goo.gl/Q1jrrWT8Rcvr7xR58",
    clases: [
      { dia: "Viernes", hora: "19:00", disciplina: NIVEL_UNIFICADO },
      { dia: "Viernes", hora: "20:00", disciplina: "Skatepark" },
    ],
  },
  {
    id: "colegiales",
    nombre: "Colegiales",
    direccion: "Conde, Plaza Mafalda",
    area: "CABA",
    lat: -34.5751,
    lng: -58.4519,
    mapsUrl: "https://maps.app.goo.gl/689B4vaoSq851ZJ1A",
    alquiler: true,
    clases: [
      { dia: "Miércoles", hora: "18:00", disciplina: NIVEL_UNIFICADO },
      { dia: "Jueves", hora: "19:00", disciplina: NIVEL_UNIFICADO },
    ],
  },
  {
    id: "plaza-la-pampa",
    nombre: "Plaza La Pampa",
    direccion: "Av. Gaona y Gavilán",
    area: "CABA",
    lat: -34.6131,
    lng: -58.4630,
    mapsUrl: "https://maps.app.goo.gl/n3egc4dPJRSDRCPG7",
    alquiler: true,
    clases: [
      { dia: "Sábado", hora: "09:00", disciplina: NIVEL_UNIFICADO },
      { dia: "Domingo", hora: "09:00", disciplina: NIVEL_UNIFICADO },
    ],
  },
  {
    id: "devoto",
    nombre: "Devoto",
    direccion: "Plaza Arenales",
    area: "CABA",
    lat: -34.5985,
    lng: -58.5099,
    mapsUrl: "https://maps.app.goo.gl/45fnmEEHSHPAu4gg7",
    alquiler: true,
    clases: [
      { dia: "Martes", hora: "19:00", disciplina: NIVEL_UNIFICADO },
      { dia: "Viernes", hora: "19:00", disciplina: NIVEL_UNIFICADO },
    ],
  },
  {
    id: "villa-real",
    nombre: "Villa Real",
    direccion: "Plaza Las Toscaneras",
    area: "CABA",
    lat: -34.6204,
    lng: -58.5247,
    mapsUrl: "https://maps.app.goo.gl/mxt7d3g3SUkRtkms7",
    alquiler: true,
    clases: [
      { dia: "Miércoles", hora: "18:00", disciplina: NIVEL_UNIFICADO },
      { dia: "Miércoles", hora: "19:00", disciplina: NIVEL_UNIFICADO },
      { dia: "Sábado", hora: "10:30", disciplina: NIVEL_UNIFICADO },
      { dia: "Sábado", hora: "11:30", disciplina: "Urbano" },
    ],
  },
];

export const ordenDias = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];

// Ordena las clases de cada sede por día (Lunes→Domingo) y dentro del día por hora ascendente.
sedes.forEach((s) => {
  s.clases.sort((a, b) => {
    const d = ordenDias.indexOf(a.dia) - ordenDias.indexOf(b.dia);
    if (d !== 0) return d;
    return a.hora.localeCompare(b.hora);
  });
});

export const disciplinaColor: Record<string, string> = {
  Slalom: "rounded-none bg-primary/15 text-primary border border-primary/50",
  Frenadas: "rounded-none bg-primary/10 text-primary border border-primary/40 border-dashed",
  Urbano: "rounded-none bg-muted text-foreground border border-border",
  Skatepark: "rounded-none bg-amber-500/15 text-amber-300 border border-amber-500/50",
  Rampas: "rounded-none bg-amber-500/25 text-amber-200 border border-amber-500/70",
  // Niveles: pills redondeados que resaltan, cada uno con su color
  [NIVEL_INICIAL]: "rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/70 font-extrabold",
  [NIVEL_PRINCIP_INTER]: "rounded-full bg-sky-500/20 text-sky-300 border border-sky-400/70 font-extrabold",
  [NIVEL_UNIFICADO]: "rounded-full bg-secondary/40 text-secondary-foreground border border-secondary/70",
};
