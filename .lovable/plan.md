# Plan: Niveles diferenciados + badges optimizados mobile

## Objetivo
1. Separar "Primeros pasos y principiante" en **dos niveles distintos**: `Primeros pasos` y `Principiante`.
2. Aplicar **colores diferenciados** del Design System a cada tipo de badge (nivel vs disciplina), más visibles sobre fondo oscuro.
3. Que en mobile **no se corten** los textos (hoy "PRIMEROS PASOS Y PRINCIPIAN…" queda clipeado).

## Cambios

### 1. `src/components/HorariosSection.tsx` — datos
Reemplazar todas las entradas `disciplina: "Primeros pasos y principiante"` por dos clases separadas en cada slot donde hoy figura combinada:
- Donde el grupo es realmente mixto / iniciación pura → `Primeros pasos`
- Donde ya hay continuidad / soltura → `Principiante`

Criterio propuesto (lo confirmamos si tenés preferencia distinta):
- **Primeros pasos**: primer turno del día en cada sede + clases de sábado/domingo matutinas + sedes barriales de debut (Devoto, Villa Real, Villa Luro, Plaza La Pampa, P. Rivadavia 19:00).
- **Principiante**: segundos turnos (19:00/20:00 cuando ya hay un 18:00 previo en la misma sede) y horarios "consolidados" de Rosedal/Madero/Belgrano/Colegiales.

> Si preferís que TODAS las que hoy dicen "Primeros pasos y principiante" se dupliquen (una card por nivel en el mismo horario), lo hacemos así en su lugar. Avisame.

### 2. Sistema de badges por **categoría**
Dos familias visuales claras, ambas usando tokens del DS (rojo `--primary` #D01C1F y teal `--secondary` #62C3BF + amber existente):

**Niveles (pill redondeada, jerarquía progresiva):**
| Nivel | Color |
|---|---|
| Primeros pasos | Teal claro: `bg-secondary/20 text-secondary border border-secondary/40` |
| Principiante | Teal sólido: `bg-secondary/35 text-secondary-foreground border border-secondary/60` |
| Intermedio | Teal intenso + ring: `bg-secondary text-background border border-secondary` |

**Disciplinas (badge sharp, acento de marca):**
| Disciplina | Color |
|---|---|
| Slalom | Rojo marca: `bg-primary/15 text-primary border border-primary/40` |
| Frenadas | Rojo oscuro/borde: `bg-primary/10 text-primary border border-primary/30` (dashed opcional) |
| Urbano | Neutro fuerte: `bg-muted text-foreground border border-border-strong` |
| Skatepark | Amber: `bg-amber-500/15 text-amber-300 border border-amber-500/40` |
| Rampas | Amber +: `bg-amber-500/25 text-amber-200 border border-amber-500/60` |

Mantiene la regla del DS v1.0: pills solo para nivel/status, sharp para disciplinas/plan.

### 3. `ClaseCard` — optimización mobile (anti-truncado)
- Bajar tamaño base del badge a `text-[9px]` mobile / `text-[10px]` desktop.
- Quitar `whitespace-nowrap`, permitir `leading-tight` + `break-words`.
- En mobile mostrar **dos badges apilados** (`flex flex-col gap-1`): nivel arriba, disciplina abajo (cuando aplique).
- Padding ajustado: `px-2 py-0.5`.
- Reducir grid mobile a `grid-cols-1` para días con muchas clases, o mantener `grid-cols-2` pero con cards de altura libre (`min-h` no fijo) — usaremos `grid-cols-2` con badges multilínea permitidos.

### 4. `src/data/sedes.ts`
Mismo split de niveles para mantener consistencia con `SedeDetalleDialog` y mapa de sedes.

### 5. Tooltips (`badgeDescriptions`)
- Mantener `Primeros pasos` y `Principiante` por separado (ya existen ambos).
- Eliminar la entrada combinada "Primeros pasos y principiante".

## Fuera de alcance
- No tocamos Hero, Pricing, Calendly popup, ni layout general de la sección.
- No cambiamos tokens globales del DS, solo asignamos clases existentes.

## Confirmaciones que necesito antes de codear
1. ¿Querés que **separe** cada slot combinado en 1 nivel solo (mi criterio arriba), o que **duplique** la card mostrando ambos niveles?
2. ¿Te sirve la paleta propuesta (Teal para niveles / Rojo para Slalom-Frenadas / Amber para Skate-Rampas)?
