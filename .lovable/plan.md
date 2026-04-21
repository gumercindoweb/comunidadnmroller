

# Actualizar horarios "Todas las clases" según gráficas oficiales

## Resumen

Reemplazar el dataset `horarios` en `src/components/HorariosSection.tsx` con la grilla semanal consolidada a partir de las dos gráficas (Principiantes/Intermedio + Disciplinas). Se mantiene exactamente la misma estética visual (tabs, cards, badges, animaciones, layout 7 columnas desktop / mobile grid). **No se modifica** la pestaña "Alquiler + Clases".

## Mapeo de disciplinas a badges existentes

- "Primeros pasos y principiante" (de la primera gráfica, agrupa nivel inicial e intermedio)
- "Slalom", "Urbano", "Frenadas", "Skatepark", "Rampas" (de la segunda gráfica)

Se mantiene el `badgeStyles` actual (incluye todas estas disciplinas).

## Nueva grilla por día

**Lunes**
- P. Rivadavia 19:00 — Primeros pasos y principiante

**Martes**
- P. Rivadavia 19:00 — Primeros pasos y principiante
- Devoto 19:00 — Primeros pasos y principiante
- Puerto Madero 18:00 — Primeros pasos y principiante
- Puerto Madero 19:00 — Primeros pasos y principiante
- Rosedal Palermo 09:00 — Primeros pasos y principiante
- Rosedal Palermo 19:00 — Primeros pasos y principiante
- Rosedal Palermo 09:00 — Slalom
- Madero 19:00 — Slalom
- Rosedal Palermo 20:00 — Frenadas

**Miércoles**
- Villa Real 18:00 — Primeros pasos y principiante
- Villa Real 19:00 — Primeros pasos y principiante
- Belgrano 19:00 — Primeros pasos y principiante
- Colegiales 18:00 — Primeros pasos y principiante
- Vicente López 18:30 — Primeros pasos y principiante
- Rosedal Palermo 09:00 — Primeros pasos y principiante
- Rosedal Palermo 19:00 — Primeros pasos y principiante
- Rosedal Palermo 20:00 — Slalom
- Belgrano 20:00 — Skatepark

**Jueves**
- P. Rivadavia 19:00 — Primeros pasos y principiante
- Colegiales 19:00 — Primeros pasos y principiante
- Rosedal Palermo 19:00 — Primeros pasos y principiante
- Rosedal Palermo 19:00 — Slalom
- Rosedal Palermo 20:00 — Rampas
- Rivadavia 20:00 — Frenadas

**Viernes**
- Devoto 19:00 — Primeros pasos y principiante
- Villa Luro 19:00 — Primeros pasos y principiante
- Belgrano 19:00 — Primeros pasos y principiante
- Villa Luro 20:00 — Skatepark
- Belgrano 20:00 — Skatepark

**Sábado**
- Villa Real 10:30 — Primeros pasos y principiante
- Plaza La Pampa 08:00 — Primeros pasos y principiante
- Puerto Madero 09:00 — Primeros pasos y principiante
- Vicente López 09:00 — Primeros pasos y principiante
- Rosedal Palermo 09:00 — Primeros pasos y principiante
- Vicente López 09:00 — Slalom
- Rosedal Palermo 10:00 — Urbano
- Madero 10:00 — Urbano
- Villa Real 11:30 — Urbano
- Rosedal Palermo 18:00 — Primeros pasos y principiante (turno tarde)

**Domingo**
- P. Rivadavia 09:00 — Primeros pasos y principiante
- Plaza La Pampa 08:00 — Primeros pasos y principiante
- Rosedal Palermo 09:00 — Primeros pasos y principiante
- Parque Rivadavia 09:00 — Slalom

## Cambios técnicos

- **Archivo único modificado**: `src/components/HorariosSection.tsx`
- Reemplazar el objeto `horarios` con la nueva data
- **Sin cambios** en: estructura JSX, tabs, `ClaseCard`, `badgeStyles`, sección Alquiler, animaciones, estilos Tailwind, `useScrollAnimation`
- Se eliminan entradas previas no respaldadas por las gráficas (ej. "Fac. Medicina" Domingo, "Nivel principiante" suelto en Domingo)
- Se conservan los nombres de sede tal como ya estaban en el código (ej. "P. Rivadavia", "Rosedal", "Madero") para mantener consistencia visual; "Parque Rivadavia" se agrega como sede nueva tal como aparece en la gráfica de Disciplinas

