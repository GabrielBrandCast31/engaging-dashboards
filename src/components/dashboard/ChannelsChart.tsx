import { channels } from "./data";

export function ChannelsChart() {
  const max = Math.max(...channels.map((c) => c.roas));
  return (
    <div className="space-y-6">
      {channels.map((c) => {
        const pct = (c.roas / max) * 100;
        return (
          <div key={c.name} className="group">
            <div className="mb-2 flex justify-between text-sm">
              <span className="text-muted-foreground transition-colors group-hover:text-foreground">
                {c.name}
              </span>
              <span className="font-mono tabular-nums">{c.roas.toFixed(1)}x</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-white/5">
              <div
                className="h-full rounded-full bg-gradient-to-r from-primary/80 to-primary transition-all duration-700 group-hover:from-primary group-hover:to-[oklch(0.7_0.17_162)]"
                style={{ width: `${pct}%` }}
              />
            </div>
            <div className="mt-1 text-[10px] font-mono uppercase tracking-widest text-muted-foreground/70">
              Investimento {c.spend.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 })}
            </div>
          </div>
        );
      })}
    </div>
  );
}