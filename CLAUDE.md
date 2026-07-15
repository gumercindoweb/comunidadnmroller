# CLAUDE.md — Comunidad NM Roller

## ⭐ Principio rector (PRIORIDAD MÁXIMA)

Cuando el usuario pida algo, **buscá siempre el camino más fácil / menos complejo pero eficiente, sin sacrificar la calidad del resultado.**

- Antes de meterte en un proceso largo o enredado, **frená y preguntá: ¿hay una forma más simple de lograr el mismo resultado de calidad?** Si la hay, proponéla primero.
- Si en mitad de una tarea notás que **nos estamos complicando demasiado** (muchos pasos, dependencias externas, configuraciones pesadas, fricción innecesaria), **decílo de una y ofrecé la alternativa simple** en vez de seguir empujando el camino difícil.
- Evaluá las opciones mentalmente y recomendá la mejor relación **simplicidad ↔ resultado**, no la primera que aparezca.
- No hace falta pedir permiso para pensar en simple: es el modo por defecto.

**Ejemplo real (junio 2026):** para el mapa interactivo nos metimos con Google Maps → API keys, restricciones de dominio, Google Cloud, billing con tarjeta… un lío. La solución simple y de igual calidad era **Leaflet + OpenStreetMap** (gratis, sin key, sin tarjeta). Si lo hubiéramos visto desde el principio, nos ahorrábamos todos esos problemas. **Esa es la mentalidad que se espera siempre.**

---

## Contexto del proyecto

- **Qué es:** landing/sitio de NM Roller (escuela de patinaje, Buenos Aires). React + Vite + TypeScript + Tailwind + shadcn/ui.
- **Origen:** generado en **Lovable**, sincronizado con GitHub (`git@github.com:gumercindoweb/comunidadnmroller.git`).
- **Backend:** Supabase (Edge Functions en `supabase/functions/`: `subscribe-newsletter`, `notify-comprobante`, `subscribe-sportclub`, `subscribe-clase-gratis`, `subscribe-lista-espera`, `submit-sugerencia`) + GetResponse (secuencias de email) + Slack (notificaciones, ver `_shared/slack.ts`).
- ⚠️ **OJO: hay DOS proyectos Supabase (no confundir).** Producción usa **`bosutrnpmpjxylcgjmbt`** (tiene la base de datos real: tabla `leads`, etc.) — es a donde apunta el `.env` y el frontend en Hostinger. Lovable, en cambio, deploya las Edge Functions en **`zpeijyutagfqeoatlvdq`** (lo dice `supabase/config.toml`), que está VACÍO de datos. Ver el error recurrente #15 más abajo. **El frontend (`.env`) debe seguir apuntando a `bosutr`; nunca a `zpeij`.**
- **Deploy de Edge Functions a producción:** por Supabase CLI a `bosutr`, NO desde Lovable (Lovable solo alcanza `zpeij`). Ver error #15.

## Flujo de trabajo (Git)

- ⭐ **SIEMPRE que apliques un cambio: commit + push a `main` automáticamente.** No esperar a que el usuario lo pida. Tras cada tanda de cambios, hacer `git add` de los archivos tocados, commit con mensaje claro y `git push origin main`. Lovable sincroniza desde GitHub.
- Mensaje de commit en español, conciso, con prefijo tipo `fix()/copy()/feat()`.

## Deploy (producción)

- **Hosting:** Hostinger (cPanel / File Manager), dominio `comunidadnmroller.com`.
- **Flujo:** `npm run build` → subir el contenido de `dist/` a `public_html/`.
- ⚠️ **Nunca tocar la carpeta `public_html/lp/`** → es el subdominio `lp.comunidadnmroller.com`, vive aparte.
- El sitio es **SPA**: requiere `.htaccess` en `public_html/` que redirige todo a `index.html` (si falta, las rutas internas dan 404 al recargar). Ya está en `public/.htaccess`.
- SSH de Hostinger existe pero el puerto puede dar timeout; el camino confiable es cPanel File Manager.

## Notas técnicas

- **Mapa:** Leaflet + tiles oscuros de CARTO (`SedesMapa.tsx`). Sin Google Maps, sin API key, sin billing.
- **Pagos:** links de Mercado Pago por plan en `PricingSection.tsx`; al volver, el usuario sube comprobante en `/pago-confirmado`.
- **Dev server:** Vite en puerto 8080 (o `PORT` si el preview lo asigna).
- **ScrollToTop:** ya existe en `src/components/ScrollToTop.tsx` y está montado en `App.tsx`. Hace `window.scrollTo(0,0)` en cada cambio de ruta. No recrear.

## ⚠️ Escala de fuentes personalizada (CRÍTICO para mobile)

Este proyecto **sobreescribe** las clases de tamaño de Tailwind. Los valores reales son:

| Clase Tailwind | Tamaño real en este proyecto |
|---|---|
| `text-xl` | 28 px |
| `text-2xl` | 36 px |
| `text-3xl` | 48 px |
| `text-4xl` | 64 px |
| `text-5xl` | ~80 px |

**Regla práctica para mobile:** usar `text-2xl` (36px) para h1/h2 en mobile. `text-3xl` (48px) es demasiado grande en 375px. Ver `tailwind.config.ts` si hay dudas.

## Paleta de colores

| Token | Valor | Uso |
|---|---|---|
| `primary` / `#D01C1F` | Rojo NM | CTAs, acentos, badges |
| `#F5B800` | Dorado SportClub | Elementos de alianza SportClub |
| `background` / `#111` | Negro base | Fondo general |
| `card` / `#1A1A1A` | Gris oscuro | Cards, secciones alternadas |

## Mapa de componentes clave

| Componente | Ruta | Qué hace |
|---|---|---|
| `SedesMapa` | `src/components/SedesMapa.tsx` | Mapa Leaflet + sidebar + dialog de sede |
| `HorariosSportclub` | `src/components/sportclub/HorariosSportclub.tsx` | Grilla horaria del beneficio SportClub |
| `MasterclassFooterBanner` | `src/components/MasterclassFooterBanner.tsx` | Banner fijo inferior con CTA masterclass |
| `NewsletterBannerHome` | `src/components/NewsletterBannerHome.tsx` | Bloque newsletter embebido en Home |
| `ScrollToTop` | `src/components/ScrollToTop.tsx` | Reset de scroll en cambio de ruta |
| `Index` | `src/pages/Index.tsx` | Orden de secciones en Home — editar acá para reordenar bloques |

---

## 🔧 Errores recurrentes y cómo se resolvieron

> ⭐ **REGLA (PRIORIDAD ALTA):** ante un error **igual o parecido** a alguno de abajo,
> **NO reinventar el diagnóstico**: ir directo a este apartado, identificar el patrón y
> **repetir el fix documentado** que ya funcionó. Recién si no aplica, investigar de cero.
> Si aparece un **error nuevo que se repite**, sumá su patrón (síntoma → causa → fix) a esta lista.

> **Antes de pelear con un bug de deploy/Hostinger/Lovable, leé acá: ya nos pasó.**

### 1. El sitio en producción da **404** en todo (home, rutas internas) tras subir el `dist/`
- **Causa típica:** el `.htaccess` que está en `public_html/` no es el nuestro (quedó uno viejo) o no se aplicó.
- **Fix que funcionó:** abrir el `.htaccess` en el editor del File Manager y pegar el contenido bueno (el de `public/.htaccess`). El acto de guardarlo fuerza al server a releerlo.
- El `.htaccess` correcto pesa **~1.1 KiB (1155 bytes)**. Si ves uno de ~203 bytes, es el viejo malo.

### 2. URLs se redirigen a **minúsculas** (301) → assets de Vite (con mayúsculas en el hash) dan 404
- **Síntoma:** `/assets/index-CLz5p8Rf.js` → 301 → `/assets/index-clz5p8rf.js` → 404. Probar `curl -skI .../TEST-MAYUS`: si da 301 a `/test-mayus`, hay regla de lowercase activa.
- **Causa:** un `.htaccess` viejo con regla `tolower`/lowercase. NO está en el nuestro.
- **Fix:** reemplazar el `.htaccess` por el nuestro (sin esa regla). Si persiste, **purgar la caché de Hostinger** (hPanel → Performance/Caché → vaciar; revisar CDN).

### 3. **Pantalla en blanco** tras un deploy (el `<title>` carga pero nada más)
- **Causa:** el navegador tiene cacheado el `index.html` viejo, que pide un JS con hash anterior; ese JS ya no existe y el `.htaccess` SPA lo sirve como `index.html` (HTML) → "Failed to load module script" → blanco.
- **Fix:** el `.htaccess` ya fuerza `ExpiresByType text/html "access plus 0 seconds"` (HTML sin caché). Para el usuario: **hard reload** (Cmd+Shift+R) o incógnito.

### 4. Al subir el `.htaccess` no aparece / no se sube
- Es un **archivo oculto**. En el File Manager: Settings → **"Show hidden files (dotfiles)"**. Sin esto no lo ves ni lo subís y el sitio sigue en 404.

### 5. Guardar `.htaccess` con `Header set ...` da **403 Forbidden (openresty)**
- El **WAF de Hostinger** bloquea directivas `Header set`. Para "no-cache del HTML" usar **`mod_expires`** (`ExpiresByType text/html "access plus 0 seconds"`), no `mod_headers`.

### 6. `git push` rechazado: **"Updates were rejected (fetch first)"**
- Lovable también pushea a `main`. Hacer **`git pull --rebase origin main`** y volver a pushear.

### 7. Logos/imágenes de Lovable **rotas en Hostinger**
- Lovable guarda assets como `*.webp.asset.json` con URL **`/__l5e/assets-v1/...`** que solo existe en su hosting → 404 en Hostinger.
- **Fix:** descargar el `.webp` real (`https://id-preview--<project_id>.lovable.app/__l5e/assets-v1/<asset>`), guardarlo en `src/assets/` e importarlo normal (`import x from "@/assets/x.webp"`, usar `x` directo, no `x.url`). Así entra al bundle.

### 8. El **deploy es manual**: pushear a GitHub NO actualiza el sitio en vivo
- GitHub/Lovable ≠ producción. Producción es Hostinger (`public_html/`). Hay que `npm run build` y subir el `dist/`.
- **Tip:** zipear el `dist/` (`cd dist && zip -r ../nmroller-dist.zip .`) y subir 1 archivo. **Ojo:** el File Manager de Hostinger **obliga a poner nombre de carpeta** al extraer → extrae en `public_html/<nombre>/`; después hay que **mover el contenido** (incluido `.htaccess`) a `public_html/` y borrar la temporal.

### 9. Mensaje de WhatsApp pre-llenado sale **genérico** (placeholders)
- El pre-llenado usa **router state** (en memoria), que se pierde al recargar o entrar directo a la confirmación. Por eso, si abrís la confirmación sin pasar por el form, sale el fallback. Ya hay **backup en `sessionStorage`** (claves `sportclub_form`, `clasegratis_form`) para que sobreviva recargas.

### 10. Screenshots del preview salen en **negro** (glitch)
- Verificar por DOM con `preview_eval` (leer textos/atributos) en vez de pelear con el screenshot.

### 12. **H1/H2 demasiado grande en mobile** — la escala de fuentes no es la estándar de Tailwind
- `text-3xl` en este proyecto = **48px**, no 30px. En un viewport de 375px, 48px es enorme.
- **Fix:** usar `text-2xl` (36px) para titulares en mobile. Patrón: `text-2xl sm:text-3xl md:text-5xl`.
- Ver tabla de escala de fuentes en la sección "Notas técnicas" de este archivo.

### 13. **Overflow horizontal en mobile** por `whitespace-nowrap` dentro de un grid
- **Síntoma:** el contenido se sale del viewport (scroll horizontal), aunque la sección tenga `overflow-hidden`.
- **Causa:** `Button` de shadcn/ui tiene `whitespace-nowrap` en sus estilos base → el botón exige su ancho de texto completo → expande la columna del grid → overflow.
- **Fix:** agregar `min-w-0` al item del grid que contiene el botón, y `whitespace-normal` al `Button`. Verificar con `document.documentElement.scrollWidth` en la consola.

### 14. **Hover card del mapa aparece junto al dialog en mobile** (doble popup)
- **Síntoma:** al tocar un pin en mobile se abren simultáneamente la hover card flotante Y el `SedeDetalleDialog`.
- **Causa:** en touch, `touchstart` dispara `mouseover` (abre la card) y `click` (abre el dialog) en el mismo gesto.
- **Fix ya aplicado:** `hidden md:block` en el wrapper de la hover card en `SedesMapa.tsx`. En mobile solo se muestra el dialog (que tiene botón X para cerrar).

### 11. **CDN de Hostinger** rompe el dominio (404 en algunos edges, SSL error, cambia la IP)
- **Síntoma:** al activar el CDN de Hostinger, el dominio cambia a una **IP de CDN** (ej. `104.160.67.72`, headers "pelados" sin `server`), que puede **cachear los 404 viejos** y servirlos en algunos edges (anda en una red/celu y en otra no). Al **desactivarlo**, queda en limbo de propagación con **error SSL** ("conexión no es privada") hasta que el DNS vuelva al origen (**24–48 hs**, normalmente menos).
- **Diagnóstico:** comparar IPs con `dig +short comunidadnmroller.com`. El **origen real** es `185.249.224.136` / `77.37.85.34` (el de `lp` es otro: `62.72.62.63`). Verificar que el origen está sano sin depender del DNS:
  `curl -sk --resolve comunidadnmroller.com:443:185.249.224.136 https://comunidadnmroller.com/ | grep '<title>'` → debe dar "Escuela #1 de Patinaje…".
- **Fix:** **mantener el CDN DESACTIVADO** para este sitio (es liviano, no lo necesita) y esperar la propagación DNS al origen. No tocar archivos: el origen ya está bien. Flush DNS local del Mac: `sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder`.

### 15. Un formulario **manda los datos pero un campo NO llega a Slack/GetResponse** — aunque en la preview de Lovable SÍ funciona
- **Caso real (jun 2026):** el campo "Alquiler" del form SportClub no aparecía en Slack desde producción, pero sí desde la preview de Lovable. Recompilar y resubir el frontend NO lo arreglaba.
- **Causa raíz — DOS proyectos Supabase desincronizados:**
  - Producción (frontend en Hostinger) llama al proyecto **`bosutrnpmpjxylcgjmbt`** → es el del `.env` y el que tiene la **base de datos real** (tabla `leads`, etc.).
  - Lovable deploya las Edge Functions en **`zpeijyutagfqeoatlvdq`** (lo dice `supabase/config.toml`), que está **vacío de datos**.
  - Cuando Lovable "redeploya" una función, corrige `zpeij` (la preview funciona) pero **NO toca `bosutr`** (producción sigue con la versión vieja). Por eso un campo nuevo agregado al frontend llega al backend pero la Edge Function vieja lo ignora.
- **Cómo confirmarlo rápido:**
  - Qué Supabase usa producción: `curl -s https://comunidadnmroller.com/assets/index-*.js | grep -oE 'https://[a-z]+\.supabase\.co'` (o leer `VITE_SUPABASE_URL` del `.env`).
  - Qué proyecto deploya Lovable: `project_id` en `supabase/config.toml`.
  - Si difieren → ese es el problema.
- **Fix que funcionó — deployar la Edge Function corregida en `bosutr` por Supabase CLI** (NO por Lovable, que solo alcanza `zpeij`):
  - La CLI local está logueada en la cuenta **`escuelanmroller@gmail.com`**, dueña de `bosutr` (`supabase projects list` lo muestra `linked:true ACTIVE_HEALTHY`).
  - Comando: `supabase functions deploy <fn> --project-ref bosutrnpmpjxylcgjmbt --no-verify-jwt`
  - Solo actualiza el **código** de esa función; los secrets (Slack, GetResponse) y la base de datos quedan **intactos**. El `WARNING: Docker is not running` es irrelevante (deploya por API).
  - ⚠️ **Lo corre el USUARIO en su terminal**, no Claude: el auto-mode de Claude Code bloquea deploys directos a producción, y macOS pide la contraseña del Mac (llavero "Supabase CLI" → "Permitir siempre"). Claude prepara el comando exacto y el usuario lo pega.
- ❌ **NO "arreglar" esto apuntando el `.env` a `zpeij`**: rompería el guardado de leads de TODOS los formularios, porque `zpeij` no tiene las tablas. Producción debe seguir en `bosutr`.

## graphify

This project has a knowledge graph at graphify-out/ with god nodes, community structure, and cross-file relationships.

Rules:
- For codebase questions, first run `graphify query "<question>"` when graphify-out/graph.json exists. Use `graphify path "<A>" "<B>"` for relationships and `graphify explain "<concept>"` for focused concepts. These return a scoped subgraph, usually much smaller than GRAPH_REPORT.md or raw grep output.
- If graphify-out/wiki/index.md exists, use it for broad navigation instead of raw source browsing.
- Read graphify-out/GRAPH_REPORT.md only for broad architecture review or when query/path/explain do not surface enough context.
- After modifying code, run `graphify update .` to keep the graph current (AST-only, no API cost).
