import { campaigns, fmtMoney, type CampaignRow } from "./data";

function StatusBadge({ status }: { status: CampaignRow["status"] }) {
  const map = {
    Active: "bg-success/10 text-success",
    Learning: "bg-primary/10 text-primary",
    Paused: "bg-white/5 text-muted-foreground",
  } as const;
  const dot = {
    Active: "bg-success",
    Learning: "bg-primary",
    Paused: "bg-muted-foreground",
  } as const;
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${map[status]}`}
    >
      <span className={`size-1.5 rounded-full ${dot[status]}`} />
      {status}
    </span>
  );
}

export function CampaignTable() {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card">
      <div className="flex items-center justify-between border-b border-border p-6">
        <div>
          <h3 className="font-semibold">Detalhe de Campanhas</h3>
          <p className="mt-0.5 text-xs text-muted-foreground">
            {campaigns.length} campanhas no período
          </p>
        </div>
        <button className="text-sm font-medium text-primary hover:underline">Exportar CSV</button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-border text-xs uppercase tracking-wider text-muted-foreground">
              <th className="px-6 py-4 font-medium">Campanha</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium">Estratégia</th>
              <th className="px-6 py-4 text-right font-medium">Gasto</th>
              <th className="px-6 py-4 text-right font-medium">CPR</th>
              <th className="px-6 py-4 text-right font-medium">ROAS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {campaigns.map((c) => (
              <tr key={c.name} className="transition-colors hover:bg-white/[0.02]">
                <td className="px-6 py-4 font-medium">{c.name}</td>
                <td className="px-6 py-4">
                  <StatusBadge status={c.status} />
                </td>
                <td className="px-6 py-4 text-sm text-muted-foreground">{c.strategy}</td>
                <td className="px-6 py-4 text-right font-mono tabular-nums">{fmtMoney(c.spend)}</td>
                <td className="px-6 py-4 text-right font-mono tabular-nums">${c.cpr.toFixed(2)}</td>
                <td
                  className={`px-6 py-4 text-right font-mono tabular-nums ${
                    c.roas >= 3 ? "text-success" : c.roas >= 2 ? "" : "text-destructive"
                  }`}
                >
                  {c.roas.toFixed(1)}x
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}