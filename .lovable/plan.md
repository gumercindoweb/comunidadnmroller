

# Plan: Recrear el sitio web de Comunidad NM Roller

He analizado el sitio en vivo en `lp.comunidadnmroller.com` y tengo toda la información necesaria para recrearlo como una landing page en React.

## Estructura del sitio

El sitio es una landing page de una escuela de patinaje (rollers) en Buenos Aires con las siguientes secciones:

1. **Header/Navbar** - Logo NM Roller + links "Sedes y Horarios" y "Comprar Plan"
2. **Hero** - Imagen de fondo con patinadores, título principal, subtítulo y CTA "Comprar Plan"
3. **Beneficios** - 4 cards: clases ilimitadas, +18 sedes, aprende desde cero, seguro médico
4. **Quienes pueden venir** - Lista de perfil ideal del alumno
5. **Planes/Precios** - Tabs (Efectivo/Transferencia/Trimestral) con 3 planes cada uno: Clase Unica, Basic Fun, Black Free (destacado)
6. **Sedes** - Grid con +15 sedes con nombre, dirección y link a Google Maps
7. **App Turnos Web** - Sección para descargar la app de reservas
8. **Ruta de Aprendizaje** - 4 niveles progresivos de patinaje
9. **Equipamiento** - CTAs para pack de alquiler y kit de iniciacion
10. **Testimonios** - Carousel con reseñas de alumnas
11. **FAQ** - Accordion con preguntas frecuentes agrupadas
12. **Footer** - WhatsApp chat flotante

## Archivos a crear/modificar

| Archivo | Accion |
|---|---|
| `src/pages/Index.tsx` | Pagina principal con todas las secciones |
| `src/components/Navbar.tsx` | Header con logo y navegacion |
| `src/components/Hero.tsx` | Seccion hero con background image |
| `src/components/Benefits.tsx` | 4 tarjetas de beneficios |
| `src/components/WhoCanCome.tsx` | Seccion "Quienes pueden venir" |
| `src/components/PricingPlans.tsx` | Planes con tabs y cards de precios |
| `src/components/Locations.tsx` | Grid de sedes con links a Maps |
| `src/components/AppSection.tsx` | Seccion app Turnos Web |
| `src/components/LearningPath.tsx` | Ruta de aprendizaje por niveles |
| `src/components/Equipment.tsx` | Seccion equipamiento |
| `src/components/Testimonials.tsx` | Carousel de testimonios |
| `src/components/FAQ.tsx` | Preguntas frecuentes con accordion |
| `src/components/WhatsAppButton.tsx` | Boton flotante de WhatsApp |
| `src/index.css` | Paleta de colores (rojo #E31837, negro, amarillo para CTAs) |
| `index.html` | Titulo y meta tags actualizados |

## Detalles tecnicos

- **Colores**: Rojo primario (#E31837), negro, amarillo para botones CTA, blanco para fondos
- **Imagenes**: Se usaran las URLs de las imagenes del sitio original (WordPress) ya que son publicas
- **Links externos**: Mercado Pago (compra), Google Maps (sedes), WhatsApp, App Store/Play Store
- **Componentes shadcn**: Tabs (planes), Accordion (FAQ), Card (beneficios/sedes/planes)
- **Responsive**: Mobile-first, adaptado para todos los tamaños
- **Tipografia**: Sans-serif bold para titulos, con estilo deportivo/energetico

## Notas

- Los links de pago (Mercado Pago) se mantendran como links externos
- El chat de WhatsApp sera un boton flotante que abre WhatsApp Web
- Las imagenes del hero y secciones se cargan desde el CDN de WordPress del sitio original

