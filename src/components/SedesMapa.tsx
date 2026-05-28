import { useEffect, useRef, useState } from "react";
import { MapPin, Clock, ExternalLink, Loader2 } from "lucide-react";
import { sedes, Sede, disciplinaColor, ordenDias } from "@/data/sedes";
import SedeDetalleDialog from "./SedeDetalleDialog";

declare global {
  interface Window {
    google: any;
    __nmRollersInitMap?: () => void;
  }
}

const BROWSER_KEY = import.meta.env.VITE_LOVABLE_CONNECTOR_GOOGLE_MAPS_BROWSER_KEY as string;
const TRACKING_ID = import.meta.env.VITE_LOVABLE_CONNECTOR_GOOGLE_MAPS_TRACKING_ID as string;

// Dark map style alineado al DS (fondo #111, agua teal tenue)
const mapStyles = [
  { elementType: "geometry", stylers: [{ color: "#1a1a1a" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#111111" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#9ca3af" }] },
  { featureType: "administrative", elementType: "geometry", stylers: [{ color: "#2a2a2a" }] },
  { featureType: "poi", stylers: [{ visibility: "off" }] },
  { featureType: "road", elementType: "geometry", stylers: [{ color: "#262626" }] },
  { featureType: "road", elementType: "geometry.stroke", stylers: [{ color: "#1a1a1a" }] },
  { featureType: "road.arterial", elementType: "geometry", stylers: [{ color: "#2e2e2e" }] },
  { featureType: "road.highway", elementType: "geometry", stylers: [{ color: "#3a3a3a" }] },
  { featureType: "road", elementType: "labels.text.fill", stylers: [{ color: "#6b7280" }] },
  { featureType: "transit", stylers: [{ visibility: "off" }] },
  { featureType: "water", elementType: "geometry", stylers: [{ color: "#0e2e2c" }] },
  { featureType: "water", elementType: "labels.text.fill", stylers: [{ color: "#62c3bf" }] },
  { featureType: "landscape", elementType: "geometry", stylers: [{ color: "#181818" }] },
];

const markerSvg = (active: boolean) => {
  const fill = active ? "#62C3BF" : "#D01C1F";
  const stroke = "#111111";
  return (
    "data:image/svg+xml;charset=UTF-8," +
    encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="48" viewBox="0 0 40 48">
        <path d="M20 47 L8 28 A14 14 0 1 1 32 28 Z" fill="${fill}" stroke="${stroke}" stroke-width="2.5"/>
        <circle cx="20" cy="18" r="5" fill="${stroke}"/>
      </svg>
    `)
  );
};

let mapsLoadingPromise: Promise<void> | null = null;
const loadGoogleMaps = () => {
  if (mapsLoadingPromise) return mapsLoadingPromise;
  mapsLoadingPromise = new Promise<void>((resolve, reject) => {
    if (typeof window === "undefined") return reject(new Error("no window"));
    if (window.google?.maps) return resolve();
    if (!BROWSER_KEY) return reject(new Error("Falta VITE_LOVABLE_CONNECTOR_GOOGLE_MAPS_BROWSER_KEY"));

    window.__nmRollersInitMap = () => resolve();

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${BROWSER_KEY}&loading=async&callback=__nmRollersInitMap${
      TRACKING_ID ? `&channel=${TRACKING_ID}` : ""
    }`;
    script.async = true;
    script.defer = true;
    script.onerror = () => reject(new Error("No se pudo cargar Google Maps"));
    document.head.appendChild(script);
  });
  return mapsLoadingPromise;
};

const SedesMapa = ({
  sedesList = sedes,
  sidebarTitle = "Encontrá la tuya",
}: {
  sedesList?: Sede[];
  sidebarTitle?: string;
} = {}) => {
  const mapDivRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<any>(null);
  const markersRef = useRef<Map<string, any>>(new Map());
  const [ready, setReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [selectedSede, setSelectedSede] = useState<Sede | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);


  // load script once
  useEffect(() => {
    loadGoogleMaps()
      .then(() => setReady(true))
      .catch((e) => setError(e.message));
  }, []);

  // init map
  useEffect(() => {
    if (!ready || !mapDivRef.current || mapRef.current) return;

    const google = window.google;
    const bounds = new google.maps.LatLngBounds();
    sedesList.forEach((s) => bounds.extend({ lat: s.lat, lng: s.lng }));

    mapRef.current = new google.maps.Map(mapDivRef.current, {
      center: bounds.getCenter(),
      zoom: 12,
      styles: mapStyles,
      disableDefaultUI: true,
      zoomControl: true,
      gestureHandling: "greedy",
      backgroundColor: "#111111",
    });
    mapRef.current.fitBounds(bounds, 60);

    sedesList.forEach((sede) => {

      const marker = new google.maps.Marker({
        position: { lat: sede.lat, lng: sede.lng },
        map: mapRef.current,
        title: sede.nombre,
        icon: {
          url: markerSvg(false),
          scaledSize: new google.maps.Size(40, 48),
          anchor: new google.maps.Point(20, 47),
        },
      });

      marker.addListener("mouseover", () => setHoveredId(sede.id));
      marker.addListener("click", () => {
        setSelectedSede(sede);
        setDialogOpen(true);
      });

      markersRef.current.set(sede.id, marker);
    });
  }, [ready]);

  // update marker icons when hovered changes
  useEffect(() => {
    if (!window.google?.maps) return;
    markersRef.current.forEach((marker, id) => {
      marker.setIcon({
        url: markerSvg(id === hoveredId),
        scaledSize: new window.google.maps.Size(id === hoveredId ? 48 : 40, id === hoveredId ? 56 : 48),
        anchor: new window.google.maps.Point(id === hoveredId ? 24 : 20, id === hoveredId ? 55 : 47),
      });
      if (id === hoveredId) marker.setZIndex(999);
    });
  }, [hoveredId]);

  const focusSede = (sede: Sede) => {
    setHoveredId(sede.id);
    if (mapRef.current) {
      mapRef.current.panTo({ lat: sede.lat, lng: sede.lng });
      mapRef.current.setZoom(14);
    }
  };

  const hoveredSede = hoveredId ? sedes.find((s) => s.id === hoveredId) ?? null : null;

  return (
    <div className="grid lg:grid-cols-[280px_1fr] gap-4 max-w-7xl mx-auto">
      {/* Sidebar lista */}
      <aside className="bg-card border border-border max-h-[560px] overflow-y-auto">
        <div className="sticky top-0 bg-card border-b border-border px-4 py-3 z-10">
          <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
            {sedes.length} sedes
          </p>
          <h3 className="text-foreground font-black italic text-lg leading-tight">Encontrá la tuya</h3>
        </div>
        <ul>
          {sedes.map((sede) => (
            <li key={sede.id}>
              <button
                onMouseEnter={() => setHoveredId(sede.id)}
                onMouseLeave={() => setHoveredId((h) => (h === sede.id ? null : h))}
                onClick={() => focusSede(sede)}
                className={`w-full text-left px-4 py-3 border-b border-border transition-colors flex items-start gap-2.5 ${
                  hoveredId === sede.id ? "bg-primary/10" : "hover:bg-muted/40"
                }`}
              >
                <MapPin
                  className={`w-4 h-4 mt-0.5 shrink-0 transition-colors ${
                    hoveredId === sede.id ? "text-secondary" : "text-primary"
                  }`}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-foreground text-sm font-bold leading-tight truncate">
                    {sede.nombre}
                  </p>
                  <p className="text-muted-foreground text-[11px] truncate">{sede.direccion}</p>
                  <div className="flex gap-1 mt-1 flex-wrap">
                    {sede.alquiler && (
                      <span className="text-[8px] font-bold uppercase tracking-wider text-secondary border border-secondary/40 px-1.5 py-0.5 rounded-full">
                        Alquiler
                      </span>
                    )}
                    <span className="text-[8px] font-bold uppercase tracking-wider text-muted-foreground border border-border px-1.5 py-0.5 rounded-full">
                      {sede.clases.length} clases
                    </span>
                  </div>
                </div>
              </button>
            </li>
          ))}
        </ul>
      </aside>

      {/* Mapa */}
      <div className="relative">
        <div
          ref={mapDivRef}
          className="w-full h-[560px] bg-[#111] border border-border"
        />

        {!ready && !error && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground gap-2 bg-card">
            <Loader2 className="w-6 h-6 animate-spin text-primary" />
            <p className="text-xs uppercase tracking-widest">Cargando mapa…</p>
          </div>
        )}
        {error && (
          <div className="absolute inset-0 flex items-center justify-center text-center p-4 bg-card">
            <p className="text-muted-foreground text-sm">{error}</p>
          </div>
        )}

        {/* Floating hover card */}
        {hoveredSede && (
          <div className="absolute top-4 right-4 w-72 bg-card border border-primary/40 shadow-2xl shadow-primary/20 p-4 pointer-events-auto animate-fade-up">
            <div className="flex items-start justify-between gap-2 mb-2">
              <div>
                <h4 className="text-foreground font-black italic text-base leading-tight">
                  {hoveredSede.nombre}
                </h4>
                <p className="text-muted-foreground text-[11px]">{hoveredSede.direccion}</p>
              </div>
              {hoveredSede.alquiler && (
                <span className="text-[8px] font-bold uppercase tracking-wider text-secondary border border-secondary/40 px-1.5 py-0.5 rounded-full shrink-0">
                  Alquiler
                </span>
              )}
            </div>

            {hoveredSede.clases.length > 0 ? (
              <>
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mt-3 mb-1.5">
                  Próximos horarios
                </p>
                <div className="space-y-1">
                  {ordenDias
                    .map((d) => ({ d, c: hoveredSede.clases.filter((x) => x.dia === d) }))
                    .filter((x) => x.c.length > 0)
                    .slice(0, 2)
                    .map(({ d, c }) => (
                      <div key={d} className="flex items-start gap-2 text-xs">
                        <span className="text-secondary font-bold w-16 shrink-0">{d}</span>
                        <div className="flex flex-wrap gap-1">
                          {c.slice(0, 3).map((cl, i) => (
                            <span
                              key={i}
                              className="flex items-center gap-1 text-foreground bg-background border border-border px-1.5 py-0.5"
                            >
                              <Clock className="w-2.5 h-2.5 text-primary" />
                              {cl.hora}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                </div>

                <div className="flex flex-wrap gap-1 mt-3">
                  {Array.from(new Set(hoveredSede.clases.map((c) => c.disciplina))).map((d) => (
                    <span
                      key={d}
                      className={`text-[8px] font-bold uppercase tracking-wide px-1.5 py-0.5 rounded-full ${
                        disciplinaColor[d] || "bg-muted text-foreground"
                      }`}
                    >
                      {d === "Primeros pasos y principiante" ? "Principiante" : d}
                    </span>
                  ))}
                </div>
              </>
            ) : (
              <p className="text-muted-foreground text-xs italic mt-2">Sin clases regulares.</p>
            )}

            <button
              onClick={() => {
                setSelectedSede(hoveredSede);
                setDialogOpen(true);
              }}
              className="mt-3 w-full text-[10px] font-bold uppercase tracking-[0.18em] text-foreground bg-primary hover:bg-primary/90 py-2 transition-colors flex items-center justify-center gap-1.5"
            >
              Ver detalle <ExternalLink className="w-3 h-3" />
            </button>
          </div>
        )}
      </div>

      <SedeDetalleDialog
        sede={selectedSede}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </div>
  );
};

export default SedesMapa;
