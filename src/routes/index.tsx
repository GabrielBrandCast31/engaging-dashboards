import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { KpiCard } from "@/components/dashboard/KpiCard";
import { CostChart } from "@/components/dashboard/CostChart";
import { ChannelsChart } from "@/components/dashboard/ChannelsChart";
import { CampaignTable } from "@/components/dashboard/CampaignTable";
import { costSeries, kpisByPeriod, periodLabels, type Period, fmtMoney } from "@/components/dashboard/data";
import { DollarSign, Target, TrendingUp, Wallet } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Vantage — Performance de Campanhas" },
      { name: "description", content: "Dashboard de performance de campanhas: custo, CPR, orçamento e estratégia." },
      { property: "og:title", content: "Vantage — Performance de Campanhas" },
      { property: "og:description", content: "Dashboard interativo de marketing performance." },
    ],
  }),
  component: Index,
});

function Index() {
  const [period, setPeriod] = useState<Period>("30d");
  const k = kpisByPeriod[period];

  return (
    <div className="min-h-screen bg-background font-sans text-foreground selection:bg-primary/30">
      <Sidebar />

      <main className="p-6 lg:ml-64 lg:p-8">
        <header className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Performance Hub</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Acompanhando 14 campanhas ativas em Meta, Google e TikTok
            </p>
          </div>

          <div className="flex items-center gap-1 rounded-lg border border-border bg-card p-1">
            {(Object.keys(periodLabels) as Period[]).map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`rounded-md px-4 py-1.5 text-sm font-medium transition-colors ${
                  period === p ? "bg-white/10 text-foreground" : "text-muted-foreground hover:bg-white/5"
                }`}
              >
                {periodLabels[p]}
              </button>
            ))}
          </div>
        </header>

        <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          <KpiCard
            label="Gasto Total"
            value={fmtMoney(k.spend)}
            delta={{ value: `${k.spendDelta > 0 ? "+" : ""}${k.spendDelta}%`, positive: k.spendDelta > 0 }}
            icon={DollarSign}
          />
          <KpiCard
            label="CPR Médio"
            value={`$${k.cpr.toFixed(2)}`}
            delta={{ value: `${k.cprDelta > 0 ? "+" : ""}${k.cprDelta}%`, positive: k.cprDelta < 0 }}
            icon={Target}
          />
          <KpiCard
            label="ROAS Total"
            value={`${k.roas.toFixed(2)}x`}
            delta={{ value: `${k.roasDelta > 0 ? "+" : ""}${k.roasDelta}x`, positive: k.roasDelta > 0, suffix: "vs meta" }}
            icon={TrendingUp}
          />
          <KpiCard
            label="Orçamento Usado"
            value={`${k.budgetPct.toFixed(1)}%`}
            progress={k.budgetPct}
            icon={Wallet}
          />
        </div>

        <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <section className="rounded-2xl border border-border bg-card p-6 lg:col-span-2">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h3 className="font-semibold">Evolução de Custo</h3>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  Gasto diário vs conversões — passe o mouse para detalhes
                </p>
              </div>
              <div className="flex gap-4">
                <div className="flex items-center gap-2">
                  <div className="size-2 rounded-full bg-primary" />
                  <span className="text-xs text-muted-foreground">Gasto</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="size-2 rounded-full bg-success" />
                  <span className="text-xs text-muted-foreground">Conversões</span>
                </div>
              </div>
            </div>
            <CostChart data={costSeries[period]} />
          </section>

          <section className="rounded-2xl border border-border bg-card p-6">
            <div className="mb-6">
              <h3 className="font-semibold">Top Canais por ROI</h3>
              <p className="mt-0.5 text-xs text-muted-foreground">Retorno por real investido</p>
            </div>
            <ChannelsChart />
          </section>
        </div>

        <CampaignTable />
      </main>
    </div>
  );
}
