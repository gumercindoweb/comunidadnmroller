## Plan: Cambios en HeroSection de la Home

### Archivo: `src/components/HeroSection.tsx`
1. **Badge**: cambiar texto a `"ESCUELA #1 DE PATINAJE EN ARGENTINA"`.
2. **Headline (h1)**: reemplazar por `"Aprendé a patinar con profes de verdad, en +12 parques de Buenos Aires"`.
3. **Subtítulo (p)**: reemplazar por el texto indicado sobre clases diarias, sedes CABA, profesores certificados, seguro médico incluido, sin contratos.
4. **Cuarta tarjeta de stats**: cambiar ícono a `ShieldCheck` (de lucide-react), valor `"Incluido"`, label `"Seguro médico"`; mantener mismo estilo visual que las demás.
5. **CTA principal (Button)**: cambiar label a `"RESERVÁ TU PRIMERA CLASE →"`; mantener estilo y color actual.
6. **CTA secundario (Button outline)**: cambiar label a `"EMPEZÁ SIN EQUIPO PROPIO"`; apuntar scroll a la sección de Clases + Alquiler (`#alquiler`).

### Archivo: `src/components/alquiler/BannerAlquilerHome.tsx`
- Agregar `id="alquiler"` al `<section>` raíz para que el CTA secundario puedo hacer scroll a esta sección.

Ningún otro archivo se modifica. Colores, tipografía, animaciones y estructura se mantienen exactamente igual.