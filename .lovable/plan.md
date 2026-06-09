## Actualización de horarios — Diciembre 2025

Reemplazo total de la grilla de clases y alquiler basándome en los 3 flyers (Niveles, Disciplinas, Alquiler). Unifico Inicial/Principiante/Intermedio en una sola etiqueta y elimino sedes huérfanas.

### Archivos a modificar

**1. `src/data/sedes.ts`** — Reemplazo completo del array `sedes[]` y de `disciplinaColor`.

- **Sedes eliminadas:** `belgrano-skatepark` (se fusiona dentro de `villa-luro`/`belgrano` como disciplina Skatepark donde corresponda), `parque-las-heras` (no figura en flyers).
- **Sedes finales (11):** Rosedal Palermo, Puerto Madero, Caballito (P. Rivadavia), Vicente López, Belgrano, Villa Luro, Colegiales, Plaza La Pampa, Devoto, Villa Real, + se mantiene Belgrano como sede única que también tiene Skatepark.
- **Nueva etiqueta unificada:** `"Inicial · Principiante · Intermedio"` reemplaza a las 3 separadas (`Primeros pasos`, `Principiante`, `Intermedio`). Se mantiene el estilo pill teal.
- **Disciplinas técnicas se mantienen:** Slalom, Frenadas, Urbano, Skatepark, Rampas (con sus colores actuales).

**2. `src/data/sedes-alquiler.ts`** — Reemplazo según flyer de Alquiler.

- 7 sedes con alquiler: Rosedal Palermo, Villa Real, Puerto Madero, Colegiales, Plaza La Pampa, Vicente López, Devoto.
- Actualizo el flag `alquiler: true` en `sedes.ts` para que coincida exactamente con esta lista (sacar de Devoto/Villa Real/Plaza La Pampa donde no esté, agregar donde falte).

**3. `src/components/HorariosSection.tsx`** — Actualizar el mapa `disciplinaColor` local para incluir la nueva etiqueta unificada y remover las viejas (`Primeros pasos`, `Principiante`, `Intermedio`).

### Nuevos horarios — Niveles (etiqueta unificada)

| Sede | Días/Horarios |
|---|---|
| P. Rivadavia (Caballito) | Lun, Mar, Jue 19hs · Dom 9am |
| Villa Real | Mié 18 y 19hs · Sáb 10:30 |
| Devoto | Mar y Vie 19hs |
| Villa Luro | Vie 19hs |
| Plaza La Pampa | Sáb y Dom 9am |
| Belgrano | Mié y Vie 19hs |
| Puerto Madero | Mar 18 y 19hs · Sáb 9hs |
| Colegiales | Mié 18hs · Jue 19hs |
| Vicente López | Sáb 9hs |
| Rosedal Palermo | Mar y Vie 9am · Sáb y Dom 10am · Mar, Mié y Jue 19hs · Sáb 18hs |

### Nuevos horarios — Disciplinas

| Sede / Disciplina | Horarios |
|---|---|
| Rosedal · Slalom | Mar y Vie 9hs · Mié 20hs · Jue 19hs |
| Rosedal · Urbano | Sáb 10hs |
| Rosedal · Frenadas | Mar 20hs |
| Rosedal · Rampas | Jue 20hs |
| Parque Rivadavia · (sin disciplina específica — flyer dice solo "Dom 9am" sin etiqueta) → lo dejo como nivel ya cubierto arriba |
| Puerto Madero · Slalom | Mar 19hs |
| Puerto Madero · Urbano | Sáb 10hs |
| Vicente López · Slalom | Sáb 9hs |
| Villa Real · Urbano | Sáb 11:30 |
| Caballito · Urbano | Jue 20hs |
| Villa Luro · Skatepark | Vie 20hs |
| Belgrano · Skatepark | Mié y Vie 20hs |

### Nuevos horarios — Alquiler (`sedes-alquiler.ts`)

```
Rosedal Palermo  → Mar y Vie 9hs · Dom 10am · Jue 19hs
Villa Real       → Mié 18hs · Sáb 10:30
Puerto Madero    → Mar 18hs
Colegiales       → Mié 18hs · Jue 19hs
Plaza La Pampa   → Sáb y Dom 9am
Vicente López    → Sáb 9hs
Devoto           → Mar y Vie 19hs
```

### Notas

- "Madero" en el flyer = Puerto Madero.
- "Rivadavia" en disciplinas = Caballito / Parque Rivadavia (mismo lugar).
- El estilo visual (chips, colores por disciplina, mapa, dialog de detalle) no cambia — solo la data.
- No toco la sección de precios, alquiler banner, ni otras partes del sitio.

Confirmá y lo aplico.