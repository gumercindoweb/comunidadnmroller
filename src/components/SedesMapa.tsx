import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapPin, Clock, ExternalLink, Loader2 } from "lucide-react";
import { sedes, Sede, disciplinaColor, ordenDias } from "@/data/sedes";
import SedeDetalleDialog from "./SedeDetalleDialog";

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

const makeIcon = (active: boolean) =>
  L.icon({
    iconUrl: markerSvg(active),
    iconSize: active ? [48, 56] : [40, 48],
    iconAnchor: active ? [24, 55] : [20, 47],
    className: "nm-sede-marker",
  });

const SedesMapa = ({
  sedesList = sedes,
  sidebarTitle = "Encontrá la tuya",
}: {
  sedesList?: Sede[];
  sidebarTitle?: string;
} = {}) => {
  const mapDivRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<globalThis.Map<string, L.Marker>>(new globalThis.Map());
  const roRef = useRef<ResizeObserver | null>(null);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [selectedSede, setSelectedSede] = useState<Sede | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  // init map once
  useEffect(() => {
    if (!mapDivRef.current || mapRef.current) return;
    try {
      const map = L.map(mapDivRef.current, {
        zoomControl: true,
        scrollWheelZoom: true,
        attributionControl: true,
      });
      mapRef.current = map;

      // Tiles oscuros gratuitos (CARTO Dark Matter, sin API key)
      L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
        {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
          subdomains: "abcd",
          maxZoom: 19,
        },
      ).addTo(map);

      const bounds = L.latLngBounds(
        sedesList.map((s) => [s.lat, s.lng] as [number, number]),
      );

      // Vista inicial segura (centro de Buenos Aires). El encuadre real se
      // calcula cuando el contenedor ya tiene tamaño, vía ResizeObserver,
      // para evitar que fitBounds se vaya al zoom máximo con ancho 0.
      map.setView([-34.6037, -58.4], 11);

      const applyView = () => {
        map.invalidateSize();
        if (sedesList.length === 1) {
          map.setView([sedesList[0].lat, sedesList[0].lng], 14);
        } else {
          map.fitBounds(bounds, { padding: [60, 60] });
        }
      };

      const ro = new ResizeObserver(() => {
        const el = mapDivRef.current;
        if (el && el.clientWidth > 0 && el.clientHeight > 0) {
          applyView();
          ro.disconnect();
        }
      });
      ro.observe(mapDivRef.current);
      roRef.current = ro;

      sedesList.forEach((sede) => {
        const marker = L.marker([sede.lat, sede.lng], {
          icon: makeIcon(false),
          title: sede.nombre,
        }).addTo(map);

        marker.on("mouseover", () => setHoveredId(sede.id));
        marker.on("click", () => {
          setSelectedSede(sede);
          setDialogOpen(true);
        });

        markersRef.current.set(sede.id, marker);
      });

      setReady(true);
    } catch (e: any) {
      setError(e?.message ?? "No se pudo cargar el mapa");
    }

    return () => {
      roRef.current?.disconnect();
      roRef.current = null;
      mapRef.current?.remove();
      mapRef.current = null;
      markersRef.current.clear();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // update marker icons when hovered changes
  useEffect(() => {
    markersRef.current.forEach((marker, id) => {
      const active = id === hoveredId;
      marker.setIcon(makeIcon(active));
      marker.setZIndexOffset(active ? 1000 : 0);
    });
  }, [hoveredId]);

  const focusSede = (sede: Sede) => {
    setHoveredId(sede.id);
    mapRef.current?.setView([sede.lat, sede.lng], 14, { animate: true });
  };
  const hoveredSede = hoveredId ? sedesList.find((s) => s.id === hoveredId) ?? null : null;

  return (
    <div className="grid lg:grid-cols-[280px_1fr] gap-4 max-w-7xl mx-auto">
      {/* Sidebar lista */}
      <aside className="bg-card border border-border max-h-[560px] overflow-y-auto">
        <div className="sticky top-0 bg-card border-b border-border px-4 py-3 z-10">
          <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
            {sedesList.length} sedes
          </p>
          <h3 className="text-foreground font-black italic text-lg leading-tight">{sidebarTitle}</h3>
        </div>
        <ul>
          {sedesList.map((sede) => (

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
          className="w-full h-[560px] bg-[#111] border border-border z-0"
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
          <div className="absolute top-4 right-4 w-72 bg-card border border-primary/40 shadow-2xl shadow-primary/20 p-4 pointer-events-auto animate-fade-up z-[400]">
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
                      {d}
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
