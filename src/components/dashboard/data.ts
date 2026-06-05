export type Period = "7d" | "30d" | "q1";

export const periodLabels: Record<Period, string> = {
  "7d": "Últimos 7 dias",
  "30d": "Últimos 30 dias",
  q1: "Q1 2024",
};

// KPI values per period
export const kpisByPeriod: Record<
  Period,
  { spend: number; spendDelta: number; cpr: number; cprDelta: number; roas: number; roasDelta: number; budgetPct: number; budgetTotal: number }
> = {
  "7d": { spend: 9840.5, spendDelta: 8.2, cpr: 4.41, cprDelta: 3.1, roas: 4.92, roasDelta: -0.2, budgetPct: 21.4, budgetTotal: 46000 },
  "30d": { spend: 42840.12, spendDelta: 12.4, cpr: 4.22, cprDelta: 2.1, roas: 5.82, roasDelta: 0.4, budgetPct: 84.2, budgetTotal: 50880 },
  q1: { spend: 124320.88, spendDelta: 18.6, cpr: 4.08, cprDelta: -1.4, roas: 6.12, roasDelta: 0.6, budgetPct: 71.5, budgetTotal: 174000 },
};

// 30 days cost evolution
export const costSeries: Record<Period, { day: string; spend: number; conv: number }[]> = {
  "7d": Array.from({ length: 7 }).map((_, i) => ({
    day: `D${i + 1}`,
    spend: 900 + Math.round(Math.sin(i) * 200 + Math.random() * 400),
    conv: 180 + Math.round(Math.cos(i) * 30 + Math.random() * 60),
  })),
  "30d": Array.from({ length: 30 }).map((_, i) => ({
    day: `${i + 1}`,
    spend: 1200 + Math.round(Math.sin(i / 2) * 600 + (i > 20 ? 1200 : 0) + Math.random() * 400),
    conv: 220 + Math.round(Math.cos(i / 2) * 80 + Math.random() * 90),
  })),
  q1: Array.from({ length: 12 }).map((_, i) => ({
    day: `W${i + 1}`,
    spend: 8000 + Math.round(Math.sin(i / 2) * 2000 + Math.random() * 1500),
    conv: 1400 + Math.round(Math.cos(i / 2) * 300 + Math.random() * 400),
  })),
};

export const channels = [
  { name: "Meta Advantage+", roas: 6.4, spend: 18200 },
  { name: "Google PMax", roas: 5.1, spend: 14800 },
  { name: "TikTok Spark", roas: 4.8, spend: 6200 },
  { name: "YouTube Shorts", roas: 3.2, spend: 3640 },
];

export type CampaignRow = {
  name: string;
  status: "Active" | "Paused" | "Learning";
  strategy: string;
  spend: number;
  cpr: number;
  roas: number;
};

export const campaigns: CampaignRow[] = [
  { name: "Spring_24_Scale_Core", status: "Active", strategy: "Bid Cap / LAL 1%", spend: 12450, cpr: 3.12, roas: 7.2 },
  { name: "Retargeting_DABA_HighIntent", status: "Active", strategy: "Lowest Cost / Catalog", spend: 4200.5, cpr: 5.8, roas: 12.4 },
  { name: "Prospecting_Video_V1_Testing", status: "Paused", strategy: "CBO / Broad Targeting", spend: 1120, cpr: 8.45, roas: 1.2 },
  { name: "Search_Brand_Keywords_Global", status: "Active", strategy: "Target CPA / Keyword", spend: 8900.22, cpr: 2.04, roas: 5.5 },
  { name: "Pmax_NewCustomer_LATAM", status: "Learning", strategy: "Max Conversion Value", spend: 5320.4, cpr: 6.12, roas: 3.4 },
  { name: "TikTok_Spark_UGC_Wave2", status: "Active", strategy: "Lowest Cost", spend: 3210.0, cpr: 4.9, roas: 4.8 },
];

export const fmtMoney = (n: number) =>
  `$${n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;