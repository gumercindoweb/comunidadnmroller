## Objetivo

Convertir la zona de "Sedes + Horarios" en una experiencia interactiva con **mapa real de Google Maps** que muestre cada sede como pin, y permita alternar entre **Mapa** y **Grilla por días**.

## Cambios

### 1. Conector Google Maps Platform
- Activar Lovable Cloud (si no está activo) y conectar el conector **Google Maps Platform** (managed).
- Quedará disponible `VITE_LOVABLE_CONNECTOR_GOOGLE_MAPS_BROWSER_KEY` para cargar el Maps JS API en el browser.

### 2. Nuevo componente `SedesMapa.tsx`
- Carga asíncrona del Maps JS API (`loading=async` + callback global).
- Mapa centrado en CABA, estilo dark custom alineado al DS (fondo #111, agua teal #62C3BF tenue, calles oscuras) para coherencia con la marca NM Rollers.
- **Pins custom** (SVG con el rojo PANTONE 1795 C y un ícono de rollers) usando `google.maps.Marker` con `icon` SVG inline.
- Geocoding: hardcodeo lat/lng de las 12 sedes en un nuevo `src/data/sedes.ts` (extraído de `SedesSection.tsx`, enriquecido con coords + array de clases asociadas filtrado desde `horarios` de `HorariosSection.tsx`).
- **Hover en pin** (mouseover): InfoWindow / floating card custom (no la default fea de Google) con:
  - Nombre sede + dirección
  - 2–3 próximos horarios resumidos (día más cercano)
  - Badges de disciplinas disponibles
  - Botón **"Ver detalle"**
- **Click en pin / "Ver detalle"**: abre un `Dialog` (shadcn) con el cronograma completo de esa sede (todos los días/horarios/disciplinas) + link "Cómo llegar" a Google Maps.
- Sidebar lateral (desktop) con lista de sedes clickeables que centran el mapa y abren la card; en mobile la lista va debajo del mapa colapsada.

### 3. Refactor `HorariosSection.tsx`
- Pasar de 2 a **3 tabs**: `Mapa interactivo` · `Todas las clases` (grilla actual) · `Alquiler + Clases`.
- Tab Mapa por defecto.
- Mantener la grilla intacta para quienes prefieran ver por día.

### 4. Eliminar / fusionar `SedesSection`
- `SedesSection.tsx` se retira de `Index.tsx` (su contenido vive ahora en el tab Mapa).
- Mantener el archivo por si se reutiliza, pero quitar del flujo principal.

### 5. Data layer compartida
- `src/data/sedes.ts`: única fuente de verdad con `{ id, nombre, direccion, area, lat, lng, mapsUrl, clases: [{dia, hora, disciplina}] }`.
- `HorariosSection` y `SedesMapa` consumen este archivo (elimina duplicación actual).

### 6. Estilos
- Pins, info cards y dialog respetan el DS v1.0: esquinas sharp (radius 0), fondo #111, acento teal en hover, CTAs uppercase con tracking.
- Animación de entrada del mapa con Intersection Observer (`useScrollAnimation`).

## Detalles técnicos

```text
src/
├── data/
│   └── sedes.ts                 (nuevo, fuente única)
├── components/
│   ├── SedesMapa.tsx            (nuevo)
│   ├── SedesMapaSidebar.tsx     (nuevo, lista lateral)
│   ├── SedeDetalleDialog.tsx    (nuevo, modal detalle)
│   └── HorariosSection.tsx      (refactor: 3 tabs)
└── pages/Index.tsx              (quita SedesSection)
```

- Tipo `Sede` exportado desde `data/sedes.ts`.
- Hook interno `useGoogleMaps()` que resuelve cuando `window.google.maps` está listo (evita race con `loading=async`).
- Marker icon: SVG data URL con color `hsl(var(--primary))` resuelto a hex (#D01C1F) — Google no acepta CSS vars.
- Map styles JSON dark custom embebido en el componente.
- No usar `mapId` (requiere config en Cloud Console), por lo tanto `google.maps.Marker` clásico, no `AdvancedMarkerElement`.

## Fuera de alcance
- Filtros por disciplina/día sobre el mapa (se puede agregar luego).
- Cálculo de "sede más cercana a vos" con geolocalización del usuario.
- Edición de horarios desde UI (siguen hardcoded).