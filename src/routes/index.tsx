import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useRef, useState, useEffect } from "react";
import {
  Activity, AlertTriangle, TrendingUp, Users, DollarSign, Sparkles,
  Radar, BarChart3, Wallet, Filter, Search, Bell, Settings,
  Calendar, FileText, Image as ImageIcon, MessageSquare, PhoneCall,
  ChevronRight, X, Zap, Target, TrendingDown,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Constelação de Clientes — Brandcast" },
      { name: "description", content: "Universo de clientes da Agência Brandcast: visualize saúde, performance e prioridade de cada conta numa visão estratégica." },
      { property: "og:title", content: "Constelação de Clientes — Brandcast" },
      { property: "og:description", content: "Central de comando da operação Brandcast." },
    ],
  }),
  component: GalaxyDashboard,
});

// ──────────────────────────────────────────────────────────────
// Tipos & dados
// ──────────────────────────────────────────────────────────────
type Status = "saudavel" | "crescimento" | "atencao" | "critico" | "premium" | "novo";
type Mode = "padrao" | "radar" | "performance" | "financeiro";

type Client = {
  id: string;
  name: string;
  segment: string;
  status: Status;
  investment: number;     // R$/mês
  leads: number;
  cpa: number;
  roas: number | null;
  revenue: number;
  owner: string;
  sentiment: "Promotor" | "Neutro" | "Detrator";
  churnRisk: "Baixo" | "Médio" | "Alto";
  nextAction: string;
  services: string[];     // satélites
  pending: number;
};

const SERVICES_ALL = [
  "Tráfego Pago", "Criativos", "Social Media", "Landing Page",
  "CRM", "SEO", "Relatórios", "Reuniões", "WhatsApp", "Comercial",
];

const CLIENTS: Client[] = [
  { id: "orbi", name: "ORBI Telecom", segment: "Telecom / ISP", status: "crescimento", investment: 3500, leads: 184, cpa: 19.02, roas: null, revenue: 92000, owner: "Equipe Brandcast", sentiment: "Promotor", churnRisk: "Baixo", nextAction: "Criar campanha de plano promocional", services: ["Tráfego Pago", "Criativos", "CRM", "WhatsApp"], pending: 2 },
  { id: "nova", name: "Nova Estética Clinic", segment: "Estética", status: "premium", investment: 18000, leads: 412, cpa: 43.69, roas: 6.8, revenue: 280000, owner: "Lívia M.", sentiment: "Promotor", churnRisk: "Baixo", nextAction: "Revisar funil pós-consulta", services: ["Tráfego Pago", "Criativos", "Social Media", "CRM", "Landing Page"], pending: 1 },
  { id: "atlas", name: "Atlas Imobiliária", segment: "Imobiliário", status: "saudavel", investment: 9500, leads: 230, cpa: 41.30, roas: 4.2, revenue: 156000, owner: "Rafael T.", sentiment: "Neutro", churnRisk: "Baixo", nextAction: "Aprovar criativos lançamento Setor B", services: ["Tráfego Pago", "Landing Page", "Criativos"], pending: 3 },
  { id: "vita", name: "Vita Suplementos", segment: "E-commerce", status: "saudavel", investment: 12200, leads: 1840, cpa: 6.63, roas: 5.1, revenue: 198000, owner: "Camila S.", sentiment: "Promotor", churnRisk: "Baixo", nextAction: "Escalar campanha Advantage+", services: ["Tráfego Pago", "Criativos", "SEO", "Relatórios"], pending: 0 },
  { id: "kron", name: "Kron Engenharia", segment: "B2B Indústria", status: "atencao", investment: 5400, leads: 38, cpa: 142.1, roas: 1.8, revenue: 48000, owner: "Diego P.", sentiment: "Neutro", churnRisk: "Médio", nextAction: "Reunião de alinhamento — meta Q4", services: ["Tráfego Pago", "Relatórios", "Comercial"], pending: 4 },
  { id: "lume", name: "Lume Decor", segment: "Casa & Decoração", status: "critico", investment: 7800, leads: 52, cpa: 150.0, roas: 1.1, revenue: 41000, owner: "Lívia M.", sentiment: "Detrator", churnRisk: "Alto", nextAction: "Reverter churn — proposta de reestruturação", services: ["Tráfego Pago", "Social Media", "Criativos"], pending: 6 },
  { id: "fonte", name: "Fonte Educação", segment: "Educação", status: "crescimento", investment: 6300, leads: 311, cpa: 20.26, roas: 3.9, revenue: 88000, owner: "Camila S.", sentiment: "Promotor", churnRisk: "Baixo", nextAction: "Testar novo público lookalike", services: ["Tráfego Pago", "Criativos", "Landing Page", "CRM"], pending: 1 },
  { id: "porto", name: "Porto Advocacia", segment: "Serviços", status: "saudavel", investment: 4200, leads: 96, cpa: 43.75, roas: 3.2, revenue: 64000, owner: "Diego P.", sentiment: "Neutro", churnRisk: "Baixo", nextAction: "Atualizar página de captura", services: ["Tráfego Pago", "SEO", "Landing Page"], pending: 1 },
  { id: "raio", name: "Raio Solar", segment: "Energia Solar", status: "premium", investment: 22000, leads: 540, cpa: 40.74, roas: 7.4, revenue: 410000, owner: "Rafael T.", sentiment: "Promotor", churnRisk: "Baixo", nextAction: "Apresentar plano de expansão LATAM", services: ["Tráfego Pago", "Criativos", "Social Media", "CRM", "SEO", "Comercial"], pending: 2 },
  { id: "mira", name: "Mira Moda", segment: "E-commerce", status: "atencao", investment: 8800, leads: 412, cpa: 21.36, roas: 2.4, revenue: 71000, owner: "Lívia M.", sentiment: "Neutro", churnRisk: "Médio", nextAction: "Renovar criativos — fadiga detectada", services: ["Tráfego Pago", "Criativos", "Social Media"], pending: 3 },
  { id: "vert", name: "Vert Saúde", segment: "Saúde", status: "novo", investment: 2800, leads: 22, cpa: 127.27, roas: null, revenue: 9000, owner: "Camila S.", sentiment: "Promotor", churnRisk: "Baixo", nextAction: "Onboarding — semana 2", services: ["Tráfego Pago", "Landing Page"], pending: 2 },
  { id: "horiz", name: "Horizonte Turismo", segment: "Turismo", status: "saudavel", investment: 6900, leads: 178, cpa: 38.76, roas: 4.6, revenue: 102000, owner: "Diego P.", sentiment: "Promotor", churnRisk: "Baixo", nextAction: "Ativar campanha alta temporada", services: ["Tráfego Pago", "Criativos", "Social Media", "Relatórios"], pending: 1 },
  { id: "nexa", name: "Nexa Fitness", segment: "Saúde / Academia", status: "crescimento", investment: 4100, leads: 240, cpa: 17.08, roas: 5.6, revenue: 78000, owner: "Camila S.", sentiment: "Promotor", churnRisk: "Baixo", nextAction: "Lançar promoção matrículas", services: ["Tráfego Pago", "Criativos", "WhatsApp"], pending: 0 },
  { id: "blume", name: "Blume Joias", segment: "E-commerce", status: "critico", investment: 5600, leads: 28, cpa: 200.0, roas: 0.9, revenue: 18000, owner: "Rafael T.", sentiment: "Detrator", churnRisk: "Alto", nextAction: "Reunião de retenção urgente", services: ["Tráfego Pago", "Criativos"], pending: 7 },
  { id: "polar", name: "Polar Tech", segment: "SaaS B2B", status: "premium", investment: 26500, leads: 312, cpa: 84.93, roas: 8.2, revenue: 520000, owner: "Lívia M.", sentiment: "Promotor", churnRisk: "Baixo", nextAction: "Upsell — módulo enterprise", services: ["Tráfego Pago", "Criativos", "Landing Page", "CRM", "SEO", "Relatórios", "Comercial"], pending: 1 },
  { id: "soma", name: "Soma Restaurante", segment: "Food", status: "novo", investment: 1800, leads: 14, cpa: 128.57, roas: null, revenue: 6000, owner: "Diego P.", sentiment: "Neutro", churnRisk: "Médio", nextAction: "Configurar pixel + catálogo", services: ["Social Media", "WhatsApp"], pending: 3 },
];

// ──────────────────────────────────────────────────────────────
// Helpers
// ──────────────────────────────────────────────────────────────
const fmtBRL = (n: number) => n.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });
const fmtBRLc = (n: number) => n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
const fmtInt = (n: number) => n.toLocaleString("pt-BR");

const STATUS_META: Record<Status, { label: string; color: string; ring: string; glow: string }> = {
  saudavel:    { label: "Saudável",      color: "var(--primary)",     ring: "var(--primary)",     glow: "oklch(0.72 0.2 250 / 0.55)" },
  crescimento: { label: "Crescimento",   color: "var(--success)",     ring: "var(--success)",     glow: "oklch(0.78 0.2 145 / 0.55)" },
  atencao:     { label: "Em atenção",    color: "var(--warning)",     ring: "var(--warning)",     glow: "oklch(0.82 0.17 85 / 0.55)" },
  critico:     { label: "Crítico",       color: "var(--destructive)", ring: "var(--destructive)", glow: "oklch(0.62 0.24 25 / 0.6)" },
  premium:     { label: "Premium",       color: "var(--premium)",     ring: "var(--premium)",     glow: "oklch(0.62 0.24 320 / 0.6)" },
  novo:        { label: "Novo",          color: "var(--accent)",      ring: "var(--accent)",      glow: "oklch(0.78 0.18 200 / 0.5)" },
};

// ──────────────────────────────────────────────────────────────
// Componente principal
// ──────────────────────────────────────────────────────────────
function GalaxyDashboard() {
  const [selected, setSelected] = useState<Client | null>(CLIENTS[8]); // Raio Solar
  const [mode, setMode] = useState<Mode>("padrao");
  const [statusFilter, setStatusFilter] = useState<Status | "todos">("todos");
  const [segmentFilter, setSegmentFilter] = useState<string>("todos");
  const [query, setQuery] = useState("");

  const segments = useMemo(() => Array.from(new Set(CLIENTS.map(c => c.segment))), []);

  const filtered = useMemo(() => {
    return CLIENTS.filter(c =>
      (statusFilter === "todos" || c.status === statusFilter) &&
      (segmentFilter === "todos" || c.segment === segmentFilter) &&
      (query === "" || c.name.toLowerCase().includes(query.toLowerCase()))
    );
  }, [statusFilter, segmentFilter, query]);

  // KPIs topo
  const kpis = useMemo(() => ({
    ativos: CLIENTS.length,
    atencao: CLIENTS.filter(c => c.status === "atencao" || c.status === "critico").length,
    investimento: CLIENTS.reduce((s, c) => s + c.investment, 0),
    leads: CLIENTS.reduce((s, c) => s + c.leads, 0),
    crescimento: CLIENTS.filter(c => c.status === "crescimento" || c.status === "premium").length,
    alertas: CLIENTS.filter(c => c.status === "critico").length,
  }), []);

  return (
    <div className="dark flex h-screen w-screen flex-col overflow-hidden bg-background font-sans text-foreground">
      <TopBar kpis={kpis} />
      <div className="flex min-h-0 flex-1">
        <LeftRail
          mode={mode} setMode={setMode}
          statusFilter={statusFilter} setStatusFilter={setStatusFilter}
          segmentFilter={segmentFilter} setSegmentFilter={setSegmentFilter}
          segments={segments}
          query={query} setQuery={setQuery}
          countAll={CLIENTS.length} countShown={filtered.length}
        />
        <main className="relative min-w-0 flex-1">
          <Galaxy clients={filtered} mode={mode} selected={selected} onSelect={setSelected} />
          <Legend mode={mode} />
        </main>
        <DetailsPanel client={selected} onClose={() => setSelected(null)} />
      </div>
      <BottomBar />
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// Top bar
// ──────────────────────────────────────────────────────────────
function TopBar({ kpis }: { kpis: { ativos: number; atencao: number; investimento: number; leads: number; crescimento: number; alertas: number } }) {
  return (
    <header className="flex h-16 shrink-0 items-center gap-6 border-b border-border/60 bg-sidebar/70 px-6 backdrop-blur-xl">
      <div className="flex items-center gap-3">
        <div className="relative grid size-9 place-items-center">
          <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-primary to-accent opacity-90" />
          <span className="relative text-base font-bold text-primary-foreground">B</span>
          <div className="absolute -inset-1 rounded-xl bg-primary/30 blur-md" />
        </div>
        <div className="leading-tight">
          <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Brandcast Command</div>
          <div className="text-sm font-semibold tracking-tight">Constelação de Clientes</div>
        </div>
      </div>

      <div className="hidden flex-1 items-center gap-2 md:flex">
        <KpiPill icon={Users}        label="Ativos"        value={String(kpis.ativos)} />
        <KpiPill icon={AlertTriangle} label="Em atenção"   value={String(kpis.atencao)} tone="warning" />
        <KpiPill icon={DollarSign}   label="Investimento" value={fmtBRL(kpis.investimento)} />
        <KpiPill icon={Target}       label="Leads/mês"    value={fmtInt(kpis.leads)} />
        <KpiPill icon={TrendingUp}   label="Crescendo"    value={String(kpis.crescimento)} tone="success" />
        <KpiPill icon={Zap}          label="Alertas"      value={String(kpis.alertas)} tone="critical" />
      </div>

      <div className="ml-auto flex items-center gap-2">
        <button className="grid size-9 place-items-center rounded-md border border-border/60 bg-card/40 text-muted-foreground transition hover:text-foreground"><Bell className="size-4" /></button>
        <button className="grid size-9 place-items-center rounded-md border border-border/60 bg-card/40 text-muted-foreground transition hover:text-foreground"><Settings className="size-4" /></button>
        <div className="ml-1 grid size-9 place-items-center rounded-full bg-gradient-to-br from-primary to-accent text-[11px] font-semibold text-primary-foreground">BR</div>
      </div>
    </header>
  );
}

function KpiPill({ icon: Icon, label, value, tone }: { icon: any; label: string; value: string; tone?: "success" | "warning" | "critical" }) {
  const toneCls =
    tone === "success" ? "text-[color:var(--success)]"
    : tone === "warning" ? "text-[color:var(--warning)]"
    : tone === "critical" ? "text-[color:var(--destructive)]"
    : "text-accent";
  return (
    <div className="flex items-center gap-2 rounded-md border border-border/50 bg-card/40 px-3 py-1.5">
      <Icon className={`size-3.5 ${toneCls}`} />
      <div className="flex items-baseline gap-1.5">
        <span className="font-mono text-sm font-semibold tabular-nums">{value}</span>
        <span className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</span>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// Left rail (modos + filtros)
// ──────────────────────────────────────────────────────────────
function LeftRail(props: {
  mode: Mode; setMode: (m: Mode) => void;
  statusFilter: Status | "todos"; setStatusFilter: (s: Status | "todos") => void;
  segmentFilter: string; setSegmentFilter: (s: string) => void;
  segments: string[];
  query: string; setQuery: (q: string) => void;
  countAll: number; countShown: number;
}) {
  const { mode, setMode, statusFilter, setStatusFilter, segmentFilter, setSegmentFilter, segments, query, setQuery, countAll, countShown } = props;

  const modes: { id: Mode; label: string; icon: any; hint: string }[] = [
    { id: "padrao",      label: "Constelação", icon: Sparkles,  hint: "Visão padrão" },
    { id: "radar",       label: "Radar de Prioridades", icon: Radar, hint: "Foco no que importa hoje" },
    { id: "performance", label: "Por Performance", icon: BarChart3, hint: "Reorganiza por ROAS" },
    { id: "financeiro",  label: "Por Investimento", icon: Wallet, hint: "Reorganiza por verba" },
  ];

  const statuses: (Status | "todos")[] = ["todos", "premium", "saudavel", "crescimento", "atencao", "critico", "novo"];

  return (
    <aside className="hidden w-64 shrink-0 flex-col gap-5 border-r border-border/60 bg-sidebar/60 p-4 backdrop-blur-xl lg:flex">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar cliente…"
          className="w-full rounded-md border border-border/60 bg-card/40 py-2 pl-8 pr-3 text-xs outline-none placeholder:text-muted-foreground focus:border-accent/60"
        />
      </div>

      <section>
        <h4 className="mb-2 px-1 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Modo de visão</h4>
        <div className="space-y-1">
          {modes.map(m => {
            const active = mode === m.id;
            return (
              <button
                key={m.id}
                onClick={() => setMode(m.id)}
                className={`group flex w-full items-center gap-2.5 rounded-md border px-2.5 py-2 text-left text-xs transition ${
                  active
                    ? "border-accent/60 bg-accent/10 text-foreground"
                    : "border-transparent text-muted-foreground hover:bg-white/5 hover:text-foreground"
                }`}
              >
                <m.icon className={`size-4 ${active ? "text-accent" : ""}`} />
                <div className="flex-1 leading-tight">
                  <div className="font-medium">{m.label}</div>
                  <div className="text-[10px] text-muted-foreground/80">{m.hint}</div>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      <section>
        <h4 className="mb-2 flex items-center gap-1.5 px-1 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          <Filter className="size-3" /> Status
        </h4>
        <div className="flex flex-wrap gap-1.5">
          {statuses.map(s => {
            const active = statusFilter === s;
            const label = s === "todos" ? "Todos" : STATUS_META[s].label;
            const dot = s === "todos" ? "var(--muted-foreground)" : STATUS_META[s].color;
            return (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] transition ${
                  active ? "border-accent/60 bg-accent/10 text-foreground" : "border-border/60 bg-card/30 text-muted-foreground hover:text-foreground"
                }`}
              >
                <span className="size-1.5 rounded-full" style={{ background: dot, boxShadow: `0 0 6px ${dot}` }} />
                {label}
              </button>
            );
          })}
        </div>
      </section>

      <section>
        <h4 className="mb-2 px-1 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Segmento</h4>
        <select
          value={segmentFilter}
          onChange={(e) => setSegmentFilter(e.target.value)}
          className="w-full rounded-md border border-border/60 bg-card/40 px-2 py-1.5 text-xs outline-none focus:border-accent/60"
        >
          <option value="todos">Todos os segmentos</option>
          {segments.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </section>

      <div className="mt-auto rounded-lg border border-border/60 bg-card/30 p-3">
        <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Universo</div>
        <div className="mt-1 font-mono text-lg tabular-nums">
          <span className="text-foreground">{countShown}</span>
          <span className="text-muted-foreground">/{countAll}</span>
        </div>
        <div className="text-[10px] text-muted-foreground">astros visíveis</div>
      </div>
    </aside>
  );
}

// ──────────────────────────────────────────────────────────────
// Galaxy (SVG interativo)
// ──────────────────────────────────────────────────────────────
function Galaxy({ clients, mode, selected, onSelect }: {
  clients: Client[]; mode: Mode; selected: Client | null; onSelect: (c: Client) => void;
}) {
  // viewBox virtual; ResponsiveSVG ocupa o container
  const W = 1200;
  const H = 760;
  const cx = W / 2;
  const cy = H / 2;

  // posicionamento determinístico — distância depende do modo + status
  const positioned = useMemo(() => {
    const seed = (s: string) => {
      let h = 0; for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
      return h;
    };
    return clients.map((c, i) => {
      const h = seed(c.id);
      const angle = ((h % 360) + i * 7) * (Math.PI / 180);
      // distância normalizada 0..1 (0 = núcleo)
      let dn = 0.55;
      if (mode === "padrao" || mode === "radar") {
        dn = c.status === "premium" ? 0.18
          : c.status === "saudavel" ? 0.35
          : c.status === "crescimento" ? 0.45
          : c.status === "novo" ? 0.6
          : c.status === "atencao" ? 0.72
          : 0.88; // critico
      } else if (mode === "performance") {
        const r = c.roas ?? 2; // sem ROAS = neutro
        dn = 1 - Math.min(1, r / 9); // mais ROAS = mais perto
      } else if (mode === "financeiro") {
        const maxInv = 30000;
        dn = 1 - Math.min(1, c.investment / maxInv);
      }
      // jitter por seed
      const jitter = ((h % 1000) / 1000 - 0.5) * 0.06;
      dn = Math.max(0.12, Math.min(0.95, dn + jitter));

      const rx = (W / 2 - 60) * dn;
      const ry = (H / 2 - 60) * dn;
      const x = cx + Math.cos(angle) * rx;
      const y = cy + Math.sin(angle) * ry;

      // raio do astro: investimento + premium
      const base = 6 + Math.min(22, c.investment / 1500);
      const r = c.status === "premium" ? base + 4 : base;
      return { c, x, y, r, angle };
    });
  }, [clients, mode, cx, cy]);

  // conexões por segmento
  const links = useMemo(() => {
    const bySeg = new Map<string, typeof positioned>();
    positioned.forEach(p => {
      const arr = bySeg.get(p.c.segment) ?? [];
      arr.push(p); bySeg.set(p.c.segment, arr);
    });
    const out: { x1: number; y1: number; x2: number; y2: number }[] = [];
    bySeg.forEach(arr => {
      for (let i = 0; i < arr.length - 1; i++) {
        out.push({ x1: arr[i].x, y1: arr[i].y, x2: arr[i + 1].x, y2: arr[i + 1].y });
      }
    });
    return out;
  }, [positioned]);

  // radar sweep
  const [sweep, setSweep] = useState(0);
  useEffect(() => {
    if (mode !== "radar") return;
    let raf = 0; let last = performance.now();
    const tick = (t: number) => {
      const dt = (t - last) / 1000; last = t;
      setSweep(s => (s + dt * 60) % 360);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [mode]);

  // estrelas de fundo
  const stars = useMemo(() =>
    Array.from({ length: 140 }).map((_, i) => {
      const x = (Math.sin(i * 12.9898) * 43758.5453) % 1;
      const y = (Math.sin(i * 78.233) * 43758.5453) % 1;
      return {
        x: Math.abs(x) * W,
        y: Math.abs(y) * H,
        r: 0.3 + Math.abs((Math.cos(i * 5.1) % 1)) * 1.2,
        o: 0.25 + Math.abs((Math.sin(i * 3.7) % 1)) * 0.55,
      };
    }), []);

  const [hover, setHover] = useState<Client | null>(null);
  const [tip, setTip] = useState<{ x: number; y: number } | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  return (
    <div className="relative h-full w-full overflow-hidden">
      {/* gradiente de fundo */}
      <div className="pointer-events-none absolute inset-0"
        style={{
          background: "radial-gradient(60% 50% at 50% 50%, oklch(0.22 0.07 280 / 0.55) 0%, oklch(0.15 0.05 275 / 0.4) 40%, oklch(0.1 0.03 270 / 0.95) 100%)",
        }} />
      {/* vinheta */}
      <div className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(120% 80% at 50% 50%, transparent 60%, oklch(0.08 0.02 270 / 0.85) 100%)" }} />

      <svg
        ref={svgRef}
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
      >
        <defs>
          <radialGradient id="gCore" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="oklch(0.78 0.18 200)" stopOpacity="0.35" />
            <stop offset="60%" stopColor="oklch(0.62 0.24 320)" stopOpacity="0.12" />
            <stop offset="100%" stopColor="oklch(0.1 0.03 270)" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="gSweep" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="oklch(0.78 0.18 200)" stopOpacity="0.5" />
            <stop offset="100%" stopColor="oklch(0.78 0.18 200)" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="gLine" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="oklch(0.78 0.18 200 / 0.45)" />
            <stop offset="100%" stopColor="oklch(0.72 0.2 250 / 0.25)" />
          </linearGradient>
          <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="oklch(0.5 0.12 240 / 0.08)" strokeWidth="0.5" />
          </pattern>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        <rect width={W} height={H} fill="url(#grid)" />

        {/* anéis de profundidade */}
        {[0.25, 0.5, 0.75, 0.95].map((k, i) => (
          <ellipse key={i} cx={cx} cy={cy}
            rx={(W / 2 - 60) * k} ry={(H / 2 - 60) * k}
            fill="none" stroke="oklch(0.78 0.18 200 / 0.08)" strokeWidth="0.6"
            strokeDasharray="2 6" />
        ))}

        {/* estrelas */}
        {stars.map((s, i) => (
          <circle key={i} cx={s.x} cy={s.y} r={s.r} fill="oklch(0.95 0.02 240)" opacity={s.o} />
        ))}

        {/* núcleo */}
        <circle cx={cx} cy={cy} r={120} fill="url(#gCore)" />
        <circle cx={cx} cy={cy} r={3.5} fill="oklch(0.95 0.05 200)" filter="url(#glow)" />

        {/* sweep do radar */}
        {mode === "radar" && (
          <g transform={`rotate(${sweep} ${cx} ${cy})`} style={{ mixBlendMode: "screen" }}>
            <path
              d={`M ${cx} ${cy} L ${cx + 600} ${cy} A 600 600 0 0 1 ${cx + Math.cos(Math.PI / 4) * 600} ${cy + Math.sin(Math.PI / 4) * 600} Z`}
              fill="url(#gSweep)" opacity="0.35"
            />
          </g>
        )}

        {/* conexões de segmento */}
        <g opacity={mode === "radar" ? 0.25 : 0.55}>
          {links.map((l, i) => (
            <line key={i} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
              stroke="url(#gLine)" strokeWidth="0.8" />
          ))}
        </g>

        {/* astros */}
        {positioned.map(({ c, x, y, r }) => {
          const meta = STATUS_META[c.status];
          const isSelected = selected?.id === c.id;
          const isHover = hover?.id === c.id;
          const emphasized = mode === "radar" ? (c.status === "critico" || c.status === "atencao") : true;
          return (
            <g key={c.id}
               onMouseEnter={(e) => {
                 setHover(c);
                 const rect = svgRef.current?.getBoundingClientRect();
                 if (rect) setTip({ x: e.clientX - rect.left, y: e.clientY - rect.top });
               }}
               onMouseMove={(e) => {
                 const rect = svgRef.current?.getBoundingClientRect();
                 if (rect) setTip({ x: e.clientX - rect.left, y: e.clientY - rect.top });
               }}
               onMouseLeave={() => { setHover(null); setTip(null); }}
               onClick={() => onSelect(c)}
               style={{ cursor: "pointer", opacity: emphasized ? 1 : 0.35, transition: "opacity 300ms" }}
            >
              {/* anel orbital — nº de serviços */}
              <ellipse cx={x} cy={y} rx={r + 6 + c.services.length * 0.6} ry={(r + 6 + c.services.length * 0.6) * 0.4}
                fill="none" stroke={meta.color} strokeOpacity="0.35" strokeWidth="0.8"
                transform={`rotate(${(c.id.charCodeAt(0) * 13) % 180} ${x} ${y})`} />
              {/* satélites (até 4 visíveis) */}
              {c.services.slice(0, 4).map((_, i) => {
                const a = ((c.id.charCodeAt(0) * 17) + i * 90) * (Math.PI / 180);
                const sx = x + Math.cos(a) * (r + 8 + i);
                const sy = y + Math.sin(a) * (r + 8 + i) * 0.4;
                return <circle key={i} cx={sx} cy={sy} r={1.2} fill={meta.color} opacity="0.8" />;
              })}
              {/* halo */}
              <circle cx={x} cy={y} r={r + 8} fill={meta.color} opacity={isSelected ? 0.25 : isHover ? 0.18 : 0.1}
                style={{ filter: `blur(8px)` }} />
              {/* astro */}
              <circle cx={x} cy={y} r={r}
                fill={meta.color}
                stroke={isSelected ? "oklch(0.98 0 0)" : "oklch(1 0 0 / 0.4)"}
                strokeWidth={isSelected ? 1.6 : 0.8}
                filter="url(#glow)" />
              {/* pulso para crítico/atenção */}
              {(c.status === "critico" || c.status === "atencao") && (
                <circle cx={x} cy={y} r={r} fill="none" stroke={meta.color} strokeWidth="1">
                  <animate attributeName="r" from={r} to={r + 14} dur={c.status === "critico" ? "1.4s" : "2.2s"} repeatCount="indefinite" />
                  <animate attributeName="opacity" from="0.7" to="0" dur={c.status === "critico" ? "1.4s" : "2.2s"} repeatCount="indefinite" />
                </circle>
              )}
              {/* nome */}
              <text x={x} y={y + r + 14} textAnchor="middle"
                className="fill-foreground" fontSize="10" fontFamily="Inter, sans-serif"
                opacity={isSelected || isHover ? 1 : 0.7}>
                {c.name}
              </text>
            </g>
          );
        })}
      </svg>

      {/* tooltip rápido */}
      {hover && tip && (
        <div className="pointer-events-none absolute z-20 -translate-x-1/2 -translate-y-[110%] rounded-md border border-border/70 bg-popover/90 px-3 py-2 text-xs shadow-xl backdrop-blur-md"
          style={{ left: tip.x, top: tip.y }}>
          <div className="font-semibold">{hover.name}</div>
          <div className="text-[10px] text-muted-foreground">{hover.segment} · {STATUS_META[hover.status].label}</div>
          <div className="mt-1 flex gap-3 font-mono text-[10px]">
            <span>{fmtBRL(hover.investment)}/mês</span>
            <span className="text-accent">{fmtInt(hover.leads)} leads</span>
            {hover.roas != null && <span className="text-[color:var(--success)]">ROAS {hover.roas.toFixed(1)}x</span>}
          </div>
          <div className="mt-1 text-[10px] text-muted-foreground">Clique para ver os detalhes da conta</div>
        </div>
      )}
    </div>
  );
}

function Legend({ mode }: { mode: Mode }) {
  const modeLabel = {
    padrao: "Distância = saúde da conta",
    radar: "Foco — somente prioridades hoje",
    performance: "Distância = inverso do ROAS",
    financeiro: "Distância = inverso do investimento",
  }[mode];
  return (
    <div className="pointer-events-none absolute bottom-4 left-4 right-4 z-10 flex flex-wrap items-center justify-between gap-2 rounded-lg border border-border/50 bg-card/40 px-3 py-2 text-[10px] backdrop-blur-md">
      <div className="flex flex-wrap items-center gap-3">
        {(["premium", "saudavel", "crescimento", "novo", "atencao", "critico"] as Status[]).map(s => (
          <span key={s} className="flex items-center gap-1.5 text-muted-foreground">
            <span className="size-2 rounded-full"
              style={{ background: STATUS_META[s].color, boxShadow: `0 0 8px ${STATUS_META[s].color}` }} />
            {STATUS_META[s].label}
          </span>
        ))}
      </div>
      <div className="font-mono uppercase tracking-[0.18em] text-muted-foreground/80">{modeLabel}</div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// Details panel (direita)
// ──────────────────────────────────────────────────────────────
const SERVICE_ICONS: Record<string, any> = {
  "Tráfego Pago": Target, "Criativos": ImageIcon, "Social Media": MessageSquare,
  "Landing Page": FileText, "CRM": Users, "SEO": Activity, "Relatórios": BarChart3,
  "Reuniões": Calendar, "WhatsApp": PhoneCall, "Comercial": Wallet,
};

function DetailsPanel({ client, onClose }: { client: Client | null; onClose: () => void }) {
  if (!client) {
    return (
      <aside className="hidden w-80 shrink-0 flex-col border-l border-border/60 bg-sidebar/60 p-6 backdrop-blur-xl xl:flex">
        <div className="m-auto text-center text-xs text-muted-foreground">
          Selecione um astro para abrir<br/>o detalhe da conta.
        </div>
      </aside>
    );
  }
  const meta = STATUS_META[client.status];
  const riskTone = client.churnRisk === "Alto" ? "text-[color:var(--destructive)]"
    : client.churnRisk === "Médio" ? "text-[color:var(--warning)]" : "text-[color:var(--success)]";

  return (
    <aside className="hidden w-80 shrink-0 flex-col gap-4 overflow-y-auto border-l border-border/60 bg-sidebar/60 p-5 backdrop-blur-xl xl:flex">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Conta selecionada</div>
          <h3 className="mt-0.5 text-base font-semibold tracking-tight">{client.name}</h3>
          <div className="text-xs text-muted-foreground">{client.segment}</div>
        </div>
        <button onClick={onClose} className="grid size-7 place-items-center rounded-md text-muted-foreground hover:bg-white/5 hover:text-foreground">
          <X className="size-4" />
        </button>
      </div>

      <div className="flex items-center gap-2 rounded-md border border-border/60 bg-card/40 px-3 py-2">
        <span className="size-2 rounded-full" style={{ background: meta.color, boxShadow: `0 0 10px ${meta.color}` }} />
        <span className="text-xs font-medium">{meta.label}</span>
        <span className="ml-auto font-mono text-[10px] text-muted-foreground">#{client.id.toUpperCase()}</span>
      </div>

      {client.status === "critico" && (
        <Alert tone="critical" icon={AlertTriangle} text="Conta precisa de atenção imediata" />
      )}
      {client.status === "crescimento" && (
        <Alert tone="success" icon={TrendingUp} text="Oportunidade de expansão identificada" />
      )}

      <div className="grid grid-cols-2 gap-2">
        <Metric label="Investimento/mês" value={fmtBRLc(client.investment)} />
        <Metric label="Leads" value={fmtInt(client.leads)} accent />
        <Metric label="CPA" value={fmtBRLc(client.cpa)} />
        <Metric label="ROAS" value={client.roas != null ? `${client.roas.toFixed(1)}x` : "—"} success={client.roas != null && client.roas >= 3} />
        <Metric label="Faturamento atribuído" value={fmtBRL(client.revenue)} wide />
      </div>

      <section>
        <h4 className="mb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Serviços ativos</h4>
        <div className="flex flex-wrap gap-1.5">
          {SERVICES_ALL.map(s => {
            const on = client.services.includes(s);
            const Icon = SERVICE_ICONS[s] ?? Sparkles;
            return (
              <span key={s} className={`flex items-center gap-1.5 rounded-full border px-2 py-1 text-[10px] ${
                on ? "border-accent/60 bg-accent/10 text-foreground" : "border-border/60 bg-card/30 text-muted-foreground/60"
              }`}>
                <Icon className="size-3" /> {s}
              </span>
            );
          })}
        </div>
      </section>

      <section className="rounded-lg border border-border/60 bg-card/40 p-3">
        <h4 className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Próxima ação</h4>
        <p className="mt-1 text-xs leading-relaxed">{client.nextAction}</p>
        <button className="mt-2 inline-flex items-center gap-1 text-[11px] font-medium text-accent hover:underline">
          Abrir tarefa <ChevronRight className="size-3" />
        </button>
      </section>

      <section className="space-y-1.5 rounded-lg border border-border/60 bg-card/40 p-3 text-xs">
        <Row k="Responsável"    v={client.owner} />
        <Row k="Sentimento"     v={client.sentiment} />
        <Row k="Risco de churn" v={<span className={`font-medium ${riskTone}`}>{client.churnRisk}</span>} />
        <Row k="Pendências"     v={<span className="font-mono">{client.pending}</span>} />
      </section>
    </aside>
  );
}

function Alert({ tone, icon: Icon, text }: { tone: "critical" | "success"; icon: any; text: string }) {
  const cls = tone === "critical"
    ? "border-[color:var(--destructive)]/40 bg-[color:var(--destructive)]/10 text-[color:var(--destructive)]"
    : "border-[color:var(--success)]/40 bg-[color:var(--success)]/10 text-[color:var(--success)]";
  return (
    <div className={`flex items-center gap-2 rounded-md border px-3 py-2 text-xs ${cls}`}>
      <Icon className="size-4" /> {text}
    </div>
  );
}

function Metric({ label, value, accent, success, wide }: { label: string; value: string; accent?: boolean; success?: boolean; wide?: boolean }) {
  const tone = success ? "text-[color:var(--success)]" : accent ? "text-accent" : "text-foreground";
  return (
    <div className={`${wide ? "col-span-2" : ""} rounded-md border border-border/60 bg-card/40 p-2.5`}>
      <div className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground">{label}</div>
      <div className={`mt-0.5 font-mono text-sm font-semibold tabular-nums ${tone}`}>{value}</div>
    </div>
  );
}

function Row({ k, v }: { k: string; v: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-muted-foreground">{k}</span>
      <span>{v}</span>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// Bottom bar (prioridades do dia)
// ──────────────────────────────────────────────────────────────
function BottomBar() {
  const items = [
    { icon: Calendar,    label: "Reuniões hoje",            value: "4",  tone: "accent" },
    { icon: FileText,    label: "Relatórios pendentes",     value: "7",  tone: "warning" },
    { icon: ImageIcon,   label: "Criativos em atraso",      value: "3",  tone: "warning" },
    { icon: TrendingDown,label: "Campanhas em queda",       value: "5",  tone: "critical" },
    { icon: PhoneCall,   label: "Clientes sem contato 7d+", value: "9",  tone: "warning" },
    { icon: Sparkles,    label: "Oportunidades abertas",    value: "12", tone: "success" },
  ];
  const toneCls = (t: string) =>
    t === "success" ? "text-[color:var(--success)]"
    : t === "warning" ? "text-[color:var(--warning)]"
    : t === "critical" ? "text-[color:var(--destructive)]"
    : "text-accent";
  return (
    <footer className="flex h-14 shrink-0 items-center gap-2 overflow-x-auto border-t border-border/60 bg-sidebar/70 px-4 backdrop-blur-xl">
      <span className="mr-1 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Prioridades do dia</span>
      {items.map((it, i) => (
        <div key={i} className="flex items-center gap-2 rounded-md border border-border/50 bg-card/40 px-3 py-1.5 text-xs">
          <it.icon className={`size-3.5 ${toneCls(it.tone)}`} />
          <span className="text-muted-foreground">{it.label}</span>
          <span className={`font-mono font-semibold tabular-nums ${toneCls(it.tone)}`}>{it.value}</span>
        </div>
      ))}
      <div className="ml-auto hidden items-center gap-2 md:flex">
        <span className="size-1.5 animate-pulse rounded-full bg-[color:var(--success)]" />
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Sincronizado · agora</span>
      </div>
    </footer>
  );
}