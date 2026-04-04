

# Plan: Rediseñar la sección de Horarios con Disciplinas y Alquiler

## Resumen

Transformar la sección actual de horarios en una sección con 3 subsecciones usando tabs: **Horarios generales**, **Disciplinas** y **Alquiler de equipo**, cada una con su propia estética visual.

## Estructura

La sección usara `Tabs` de shadcn con 3 pestañas:

1. **Horarios** - El grid actual de horarios por día (ya existente)
2. **Disciplinas** - Cards organizadas por tipo de disciplina, cada una con color diferente
3. **Alquiler** - Cards de sedes que ofrecen alquiler con horarios

## Datos de las imágenes

### Disciplinas (extraídas de la imagen):
| Sede | Disciplina | Horarios |
|---|---|---|
| Rosedal Palermo | Slalom | Mar y Mié 9hs, Mié 20hs, Jue 19hs |
| Rosedal Palermo | Urbano | Sáb 10hs |
| Villa Luro | Skatepark | Vie 20hs |
| Parque Rivadavia | (general) | Dom 9am |
| Rosedal Palermo | Frenadas | Mar 20hs |
| Belgrano | Skatepark | Mié y Vie 20hs |
| Madero | Slalom | Mar 19hs |
| Villa Real | Urbano | Sáb 11:30hs |
| Rosedal | Rampas | Jue 20hs |
| Vicente López | Slalom | Sáb 9hs |
| Madero | Urbano | Sáb 10hs |
| Rivadavia | Frenadas | Jue 20hs |

### Alquiler de equipo (extraídas de la imagen):
| Sede | Horarios |
|---|---|
| Rosedal Palermo | Mar, Mié y Dom 9hs, Jue 19hs |
| Villa Real | Mié 18hs, Sáb 10:30hs |
| Puerto Madero | Mar 18hs |
| Colegiales | Mié 18hs y Jue 19hs |
| Plaza La Pampa | Sáb y Dom 8am |
| Vicente López | Sáb 9hs |
| Devoto | Mar y Vie 19hs |

## Diseño visual

### Disciplinas
- Cards con color de fondo según disciplina:
  - **Slalom**: blanco con borde primario
  - **Urbano**: gris (bg-muted)
  - **Skatepark**: amarillo/dorado (amber)
  - **Frenadas**: gris
  - **Rampas**: amarillo/dorado
- Cada card muestra un pin de ubicación (MapPin icon), nombre de sede, disciplina destacada en color, y horarios debajo
- Grid de 3 columnas en desktop, 1-2 en mobile

### Alquiler
- Cards blancas con pin de ubicación dorado
- Grid de 3 columnas, última fila centrada
- Nota importante al pie sobre las 24hs de antelación y tarifa estándar

## Archivos a modificar

| Archivo | Cambio |
|---|---|
| `src/components/HorariosSection.tsx` | Reescribir completamente: agregar Tabs con 3 pestañas, datos de disciplinas y alquiler, diseño visual diferenciado por tipo |

## Detalles técnicos

- Usar componente `Tabs` de shadcn/ui (ya disponible)
- Iconos: `MapPin`, `Clock`, `Wrench` de lucide-react
- Colores por disciplina usando clases de Tailwind (amber para Skatepark/Rampas, muted para Urbano/Frenadas, white+border para Slalom)
- Mantener animaciones de scroll existentes

