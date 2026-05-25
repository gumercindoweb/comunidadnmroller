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
      { dia: "Martes", hora: "09:00", disciplina: "Primeros pasos y principiante" },
      { dia: "Martes", hora: "19:00", disciplina: "Primeros pasos y principiante" },
      { dia: "Martes", hora: "09:00", disciplina: "Slalom" },
      { dia: "Martes", hora: "20:00", disciplina: "Frenadas" },
      { dia: "Miércoles", hora: "09:00", disciplina: "Primeros pasos y principiante" },
      { dia: "Miércoles", hora: "19:00", disciplina: "Primeros pasos y principiante" },
      { dia: "Miércoles", hora: "20:00", disciplina: "Slalom" },
      { dia: "Jueves", hora: "19:00", disciplina: "Primeros pasos y principiante" },
      { dia: "Jueves", hora: "19:00", disciplina: "Slalom" },
      { dia: "Jueves", hora: "20:00", disciplina: "Rampas" },
      { dia: "Sábado", hora: "09:00", disciplina: "Primeros pasos y principiante" },
      { dia: "Sábado", hora: "18:00", disciplina: "Primeros pasos y principiante" },
      { dia: "Sábado", hora: "10:00", disciplina: "Urbano" },
      { dia: "Domingo", hora: "09:00", disciplina: "Primeros pasos y principiante" },
    ],
  },
  {
    id: "puerto-madero",
    nombre: "Puerto Madero",
    direccion: "Pierina Dealessi 100-150",
    area: "CABA",
    lat: -34.6118,
    lng: -58.3631,
    mapsUrl: "https://maps.app.goo.gl/L7ZsdAEvwSPZWbwU8",
    alquiler: true,
    clases: [
      { dia: "Martes", hora: "18:00", disciplina: "Primeros pasos y principiante" },
      { dia: "Martes", hora: "19:00", disciplina: "Primeros pasos y principiante" },
      { dia: "Martes", hora: "19:00", disciplina: "Slalom" },
      { dia: "Sábado", hora: "09:00", disciplina: "Primeros pasos y principiante" },
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
      { dia: "Lunes", hora: "19:00", disciplina: "Primeros pasos y principiante" },
      { dia: "Martes", hora: "19:00", disciplina: "Primeros pasos y principiante" },
      { dia: "Jueves", hora: "19:00", disciplina: "Primeros pasos y principiante" },
      { dia: "Jueves", hora: "20:00", disciplina: "Frenadas" },
      { dia: "Domingo", hora: "09:00", disciplina: "Primeros pasos y principiante" },
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
      { dia: "Miércoles", hora: "18:30", disciplina: "Primeros pasos y principiante" },
      { dia: "Sábado", hora: "09:00", disciplina: "Primeros pasos y principiante" },
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
      { dia: "Miércoles", hora: "19:00", disciplina: "Primeros pasos y principiante" },
      { dia: "Miércoles", hora: "20:00", disciplina: "Skatepark" },
      { dia: "Viernes", hora: "19:00", disciplina: "Primeros pasos y principiante" },
      { dia: "Viernes", hora: "20:00", disciplina: "Skatepark" },
    ],
  },
  {
    id: "villa-luro",
    nombre: "Villa Luro (Skatepark)",
    direccion: "Av. Rivadavia 9300",
    area: "CABA",
    lat: -34.6385,
    lng: -58.5012,
    mapsUrl: "https://maps.app.goo.gl/Q1jrrWT8Rcvr7xR58",
    clases: [
      { dia: "Viernes", hora: "19:00", disciplina: "Primeros pasos y principiante" },
      { dia: "Viernes", hora: "20:00", disciplina: "Skatepark" },
    ],
  },
  {
    id: "belgrano-skatepark",
    nombre: "Belgrano (Skatepark)",
    direccion: "Skatepark Converse",
    area: "CABA",
    lat: -34.5475,
    lng: -58.4540,
    mapsUrl: "https://maps.app.goo.gl/6rRCVgFi3N6fEUPb8",
    clases: [
      { dia: "Miércoles", hora: "20:00", disciplina: "Skatepark" },
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
      { dia: "Miércoles", hora: "18:00", disciplina: "Primeros pasos y principiante" },
      { dia: "Jueves", hora: "19:00", disciplina: "Primeros pasos y principiante" },
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
      { dia: "Sábado", hora: "08:00", disciplina: "Primeros pasos y principiante" },
      { dia: "Domingo", hora: "08:00", disciplina: "Primeros pasos y principiante" },
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
      { dia: "Martes", hora: "19:00", disciplina: "Primeros pasos y principiante" },
      { dia: "Viernes", hora: "19:00", disciplina: "Primeros pasos y principiante" },
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
      { dia: "Miércoles", hora: "18:00", disciplina: "Primeros pasos y principiante" },
      { dia: "Miércoles", hora: "19:00", disciplina: "Primeros pasos y principiante" },
      { dia: "Sábado", hora: "10:30", disciplina: "Primeros pasos y principiante" },
      { dia: "Sábado", hora: "11:30", disciplina: "Urbano" },
    ],
  },
  {
    id: "parque-las-heras",
    nombre: "Parque Las Heras",
    direccion: "Recoleta",
    area: "CABA",
    lat: -34.5862,
    lng: -58.4019,
    mapsUrl: "https://maps.app.goo.gl/bBQiZYm4ZnF3yxSy5",
    clases: [],
  },
];

export const ordenDias = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];

export const disciplinaColor: Record<string, string> = {
  Slalom: "bg-primary/15 text-primary border border-primary/30",
  Urbano: "bg-muted text-foreground border border-border",
  Skatepark: "bg-amber-500/15 text-amber-400 border border-amber-500/30",
  Frenadas: "bg-muted text-foreground border border-border",
  Rampas: "bg-amber-500/15 text-amber-400 border border-amber-500/30",
  "Primeros pasos y principiante": "bg-secondary/15 text-secondary border border-secondary/30",
};
