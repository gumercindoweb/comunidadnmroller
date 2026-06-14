# Rediseño del footer — ajustado

Solo trabajamos el **footer**. Las páginas nuevas que aparezcan como links se crean después, en una segunda etapa. Los links a páginas que todavía no existen quedan apuntando a `#` con `preventDefault` para no romper UX ni dar 404.

## Nueva estructura del footer

### Desktop (≥ md): **5 columnas**

| Columna 1 | Columna 2 | Columna 3 | Columna 4 | Columna 5 |
|---|---|---|---|---|
| **Marca + Contacto** | **Nosotros** | **Clases & Planes** | **Alianzas** | **Recursos** |
| Logo NM | ¿Por qué NM? | Planes | Beneficio SportClub | Newsletter Desde Cero |
| Mini-claim | Staff de profes | Clases + Alquiler | Alquiler recreativo (Fly Free) | Ruta de aprendizaje |
| Instagram | Sedes | Clase gratis | Kit iniciación Fly Free | Tutoriales |
| Email | Testimonios | Masterclass | Equipamiento Fly Free | Soporte y ayuda |
| WhatsApp | | | | |
| Ubicación | | | | |

- Legal y copyright pasan a una **fila full-width** debajo de las 5 columnas, separada por un divisor sutil.
- Así Marca y Contacto quedan unidos en un solo bloque vertical, no en columnas separadas.

### Responsive
- Tablet (sm–md): grid 3 cols, Marca+Contacto arriba full-width.
- Mobile: stack vertical, 1 col.

## Detalle de cada columna

### 1. Marca + Contacto (NUEVO bloque unificado)
- Logo NM Roller.
- Mini-claim: *"Comunidad de patinaje urbano en Buenos Aires."*
- Icono + link Instagram.
- Email `hola@comunidadnmroller.com`.
- WhatsApp `+54 11 6592-0600`.
- Buenos Aires, Argentina.

### 2. Nosotros (NUEVA)
- ¿Por qué NM? → `#propuesta`
- Staff de profes → `#` *(TODO)*
- Sedes → `#sedes`
- Testimonios → `#testimonios` *(necesita agregar `id` a la sección)*

### 3. Clases & Planes
- Planes → `#planes`
- Clases + Alquiler → `/clases-de-rollers-mas-alquiler`
- Clase de prueba gratis → `/clase-gratis`
- Masterclass de patinaje → `/masterclass-de-patinaje/<próxima>`

### 4. Alianzas comerciales (NUEVA)
- Beneficio Socios SportClub → `/exclusivo-de-socios-sportclub`
- Alquiler recreativo (Fly Free) → `#` *(TODO)*
- Kit de iniciación (Fly Free) → link externo a Fly Free
- Equipamiento – Tienda Fly Free → link externo a Fly Free

### 5. Recursos (NUEVA)
- Newsletter Desde Cero → `/newsletter-desde-cero`
- Ruta de aprendizaje → `#` *(TODO)*
- Tutoriales → `#` *(TODO)*
- Soporte y ayuda → `#` *(TODO)*

### Fila inferior: Legal
- Términos y Condiciones
- Política de Privacidad
- Copyright © 2026 NM Roller

## Otros cambios

- **Sugerí horario o sede** se **elimina del footer** (queda solo en la grilla de horarios como trigger del empty-state).
- Links con TODO: mismo estilo visual, `href="#"`, `onClick={e => e.preventDefault()}`.
- Sin badge "próximamente" para no ensuciar.

## Archivos a tocar

- `src/components/Footer.tsx` — reescritura completa con 5 cols + fila legal.
- `src/components/Testimonials.tsx` — agregar `id="testimonios"` a la sección raíz.

## Lo que NO se hace ahora

- Sin crear páginas nuevas.
- Sin tocar navbar ni otras secciones.
- Sin modificar `App.tsx` ni rutas.

¿Confirmás y lo implemento?
