import { useEffect, useState } from "react";
import { Clock, AlertTriangle } from "lucide-react";
import { differenceInSeconds } from "date-fns";

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
}

const CountdownBanner = () => {
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining | null>(null);

  useEffect(() => {
    const calculateCountdown = () => {
      // Fecha límite: 26 de junio 2026, 23:59:59
      const deadline = new Date(2026, 5, 26, 23, 59, 59);
      const now = new Date();
      const diffInSeconds = differenceInSeconds(deadline, now);

      if (diffInSeconds <= 0) {
        setTimeRemaining({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isExpired: true,
        });
      } else {
        const days = Math.floor(diffInSeconds / (60 * 60 * 24));
        const hours = Math.floor((diffInSeconds % (60 * 60 * 24)) / (60 * 60));
        const minutes = Math.floor((diffInSeconds % (60 * 60)) / 60);
        const seconds = diffInSeconds % 60;

        setTimeRemaining({
          days,
          hours,
          minutes,
          seconds,
          isExpired: false,
        });
      }
    };

    calculateCountdown();
    const interval = setInterval(calculateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!timeRemaining) return null;

  if (timeRemaining.isExpired) {
    return (
      <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 text-center">
        <p className="text-sm font-bold text-red-400">
          ⏰ La venta de pases ha cerrado
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-red-500/10 border border-amber-500/30 rounded-2xl p-6 text-center">
      <div className="flex items-center justify-center gap-2 mb-3">
        <Clock className="w-5 h-5 text-amber-400" />
        <AlertTriangle className="w-5 h-5 text-red-400" />
      </div>

      <p className="text-xs font-bold uppercase tracking-widest text-amber-300 mb-2">
        ⏳ Cupos limitados
      </p>
      <h3 className="text-2xl font-black italic tracking-tight text-foreground mb-1">
        Asegurá tu lugar antes de que se acaben los cupos
      </h3>
      <p className="text-sm text-muted-foreground mb-6">
        Quedan solo:
      </p>

      <div className="flex justify-center gap-3 mb-6">
        {[
          { label: "Días", value: timeRemaining.days },
          { label: "Horas", value: timeRemaining.hours },
          { label: "Min", value: timeRemaining.minutes },
          { label: "Seg", value: timeRemaining.seconds },
        ].map((unit) => (
          <div key={unit.label} className="flex flex-col items-center">
            <div className="bg-foreground/5 border border-foreground/10 rounded-lg px-3 py-2 min-w-16">
              <p className="text-2xl font-black text-foreground">
                {String(unit.value).padStart(2, "0")}
              </p>
            </div>
            <p className="text-xs text-muted-foreground mt-1 font-semibold">
              {unit.label}
            </p>
          </div>
        ))}
      </div>

      <p className="text-xs text-muted-foreground">
        No esperes más. Reservá tu lugar ahora.
      </p>
    </div>
  );
};

export default CountdownBanner;
