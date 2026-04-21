

# Tooltips explicativos en badges de niveles y disciplinas

## Resumen

Al pasar el cursor (o tap en mobile) sobre los badges de disciplina/nivel dentro de las cards de la pestaña "Todas las clases", se mostrará un tooltip con una descripción breve y emocional del nivel o disciplina.

## Cambios

### 1. `src/components/HorariosSection.tsx`

**a) Agregar diccionario de descripciones** junto a `badgeStyles`:

```ts
const badgeDescriptions: Record<string, string> = {
  "Primeros pasos": "Tu primer contacto con los rollers, sin presión y con acompañamiento real.",
  "Principiante": "Empezás a soltarte, ganar confianza y disfrutar cada avance.",
  "Intermedio": "Más control, más fluidez… empezás a sentirte realmente patinador.",
  "Slalom": "Técnica y flow entre conos para dominar cada movimiento.",
  "Frenadas": "Control total: aprendé a frenar seguro y moverte con confianza.",
  "Skatepark": "Desafío, adrenalina y nuevos trucos en un entorno distinto.",
  "Rampas": "Subidas, bajadas y saltos para llevar tu nivel al siguiente paso.",
  "Urbano": "La ciudad como pista: aprendé a moverte con seguridad real.",
  // Fallback para el badge agrupado existente
  "Primeros pasos y principiante": "Para quienes están dando sus primeros pasos o ya empezaron a soltarse en los rollers.",
  "Nivel principiante": "Empezás a soltarte, ganar confianza y disfrutar cada avance.",
};
```

**b) Envolver el `<span>` del badge dentro de `ClaseCard`** con los componentes `Tooltip`, `TooltipTrigger` y `TooltipContent` de shadcn (`@/components/ui/tooltip`). El span pasa a ser `TooltipTrigger asChild` y se le agrega `cursor-help`. El `TooltipContent` muestra la descripción correspondiente con `max-w-xs text-xs`.

**c) Envolver toda la sección con `TooltipProvider`** (o asegurarse de que esté ya disponible globalmente — verificar `App.tsx`; si no, importarlo localmente y envolver el `<section>`).

**d) Soporte mobile**: como Radix Tooltip no se activa con tap, se agrega además `title={descripcion}` nativo en el span como fallback accesible. (Mantenemos diseño igual; si el usuario prefiere tap-popovers en mobile, se puede iterar).

## Archivos modificados

- `src/components/HorariosSection.tsx` (único)

## Sin cambios

- Estética visual de badges, cards, tabs, animaciones
- Pestaña "Alquiler + Clases"
- Datos de horarios

