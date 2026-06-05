import { LayoutDashboard, Megaphone, Users, Plug, Receipt } from "lucide-react";

const nav = [
  { label: "Visão Geral", icon: LayoutDashboard, active: true },
  { label: "Campanhas", icon: Megaphone },
  { label: "Público-Alvo", icon: Users },
];

const settings = [
  { label: "Integrações", icon: Plug },
  { label: "Faturamento", icon: Receipt },
];

export function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 hidden h-full w-64 flex-col border-r border-border bg-sidebar/50 lg:flex">
      <div className="flex items-center gap-3 p-6">
        <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-lg font-bold text-primary-foreground">
          B
        </div>
        <span className="text-xl font-bold tracking-tight">BRANDCAST</span>
      </div>

      <nav className="flex-1 space-y-1 px-4">
        <div className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Painel
        </div>
        {nav.map((item) => (
          <a
            key={item.label}
            href="#"
            className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
              item.active
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
            }`}
          >
            <item.icon className="size-4" />
            {item.label}
          </a>
        ))}

        <div className="px-3 pb-2 pt-6 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Configurações
        </div>
        {settings.map((item) => (
          <a
            key={item.label}
            href="#"
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
          >
            <item.icon className="size-4" />
            {item.label}
          </a>
        ))}
      </nav>

      <div className="border-t border-border p-4">
        <div className="rounded-xl bg-primary/5 p-4">
          <p className="mb-2 text-xs text-muted-foreground">Créditos Diários</p>
          <div className="mb-2 h-1 w-full overflow-hidden rounded-full bg-white/10">
            <div className="h-full w-3/4 bg-primary" />
          </div>
          <p className="font-mono text-xs">14,200 / 20,000</p>
        </div>
      </div>
    </aside>
  );
}