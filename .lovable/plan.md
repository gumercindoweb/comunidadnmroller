## Objetivo

En `/pago-confirmado`, diferenciar visualmente y en los registros los planes comprados desde **Clases + Alquiler** vs. los planes estándar, agregando el sufijo **" + Alquiler"** al nombre del plan.

## Dónde se ve el cambio

El texto del plan aparece en **dos lugares** de la página de confirmación (ambos se actualizan):

1. **Hero superior** — "Plan elegido: **Clase Única**" → "Plan elegido: **Clase Única + Alquiler**"
2. **Campo "PLAN"** del formulario de carga de comprobante — "Clase Única" → "Clase Única + Alquiler"

Ejemplos por slug (cuando `origen=clases-alquiler`):

- `?plan=clase-unica` → **Clase Única + Alquiler**
- `?plan=clase-2x1` → **Clase 2x1 + Alquiler**
- `?plan=pack-4-clases` → **Pack 4 Clases + Alquiler**

Los planes estándar (Basic Fun, Black Free, etc., sin `origen=clases-alquiler`) **no cambian**.

## Cambios técnicos (`src/pages/PagoConfirmado.tsx`)

1. **Agregar slugs faltantes** al diccionario `PLAN_LABELS`:
   - `"clase-2x1": "Clase 2x1"`
   - `"pack-4-clases": "Pack 4 Clases"`

2. **Derivar `displayPlanLabel`** combinando `planLabel` con `origen`:
   ```ts
   const isAlquiler = origen === "clases-alquiler";
   const displayPlanLabel = planLabel
     ? (isAlquiler ? `${planLabel} + Alquiler` : planLabel)
     : "";
   ```

3. **Reemplazar `planLabel` por `displayPlanLabel`** en los 4 puntos donde se usa:
   - Hero "Plan elegido: …" (≈ línea 144)
   - Campo "PLAN" del formulario (≈ línea 394)
   - Campo `plan` del `insert` en `comprobantes_pago` (línea 77)
   - Campo `plan` enviado al edge function `notify-comprobante` (línea 89)

Así el nombre diferenciado se ve en la UI **y** queda registrado en la DB y en GetResponse.

## Fuera de alcance

- No se modifica la URL del navegador ni los links de Mercado Pago.
- No se cambia el edge function `notify-comprobante` (recibe el string ya formateado).
- No se toca la sección de planes estándar.