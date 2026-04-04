

# Plan: Rediseñar Horarios al estilo Virtus (grid semanal con cards detalladas)

## Resumen

Reemplazar el diseño actual de tabs por un layout similar al de la imagen de referencia (Virtus): un grid semanal limpio donde cada día es una columna y cada clase es una card con sede, horario y badge de disciplina. Se mantiene solo una pestaña separada para Alquiler.

## Cambios en `src/components/HorariosSection.tsx`

### Estructura principal
- Eliminar las 3 tabs. El contenido principal es el **grid semanal** visible directamente.
- Debajo del grid, una sección separada con titulo "Alquiler de equipo" con las cards de alquiler (sin tab).

### Estilo de cada card de clase (inspirado en Virtus)
Cada card dentro de la columna del día mostrara:
1. **Sede** en bold (equivale al nombre de clase en Virtus)
2. **Horario** formateado
3. **Badge de disciplina** con color segun tipo (Slalom, Urbano, Skatepark, etc.) - equivale a los badges "ESSENTIAL", "PROGRESSION", "ELITE" de Virtus

### Layout del grid
- **Desktop (lg+):** 7 columnas, una por dia. Encabezado con nombre del dia en tipografia serif/bold grande (no fondo de color, solo texto como en Virtus).
- **Mobile:** Columnas colapsadas en acordeon o stack vertical.

### Datos enriquecidos
Fusionar los datos de `horarios` con `disciplinas` para que cada clase muestre su disciplina cuando aplique. Clases sin disciplina especifica mostraran badge "General".

### Seccion Alquiler
- Se muestra debajo del grid con su propio titulo, sin tabs.
- Cards con icono dorado de MapPin, sede y horarios.

## Archivo a modificar

| Archivo | Cambio |
|---|---|
| `src/components/HorariosSection.tsx` | Reescribir: quitar Tabs, grid semanal estilo Virtus con cards detalladas + seccion alquiler debajo |

## Detalles tecnicos

- Encabezados de dia: texto bold grande sin fondo de color, separado por linea sutil
- Cards: fondo blanco, rounded, shadow-sm, padding generoso
- Badges de disciplina: rounded-full, colores segun tipo (mantener el esquema actual de colores)
- Responsive: en mobile, cada dia como bloque vertical con titulo

