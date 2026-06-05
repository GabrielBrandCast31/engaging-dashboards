import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type Point = { day: string; spend: number; conv: number };

export function CostChart({ data }: { data: Point[] }) {
  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 8, left: -10, bottom: 0 }}>
          <defs>
            <linearGradient id="spendFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="oklch(0.62 0.21 280)" stopOpacity={0.5} />
              <stop offset="100%" stopColor="oklch(0.62 0.21 280)" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="convFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="oklch(0.7 0.17 162)" stopOpacity={0.35} />
              <stop offset="100%" stopColor="oklch(0.7 0.17 162)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="oklch(0.27 0.01 285)" strokeDasharray="3 6" vertical={false} />
          <XAxis
            dataKey="day"
            stroke="oklch(0.62 0.01 285)"
            fontSize={10}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="oklch(0.62 0.01 285)"
            fontSize={10}
            tickLine={false}
            axisLine={false}
            tickFormatter={(v) => `R$${(v / 1000).toFixed(1)}k`}
          />
          <Tooltip
            cursor={{ stroke: "oklch(0.62 0.21 280)", strokeWidth: 1, strokeDasharray: "4 4" }}
            contentStyle={{
              background: "oklch(0.185 0.005 285)",
              border: "1px solid oklch(0.27 0.01 285)",
              borderRadius: 8,
              fontSize: 12,
              fontFamily: "IBM Plex Mono, monospace",
            }}
            labelStyle={{ color: "oklch(0.985 0 0)", fontWeight: 600 }}
            formatter={(value: number, name) =>
              name === "spend"
                ? [value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }), "Investimento"]
                : [value.toLocaleString("pt-BR"), "Conversões"]
            }
          />
          <Area
            type="monotone"
            dataKey="spend"
            stroke="oklch(0.62 0.21 280)"
            strokeWidth={2}
            fill="url(#spendFill)"
          />
          <Area
            type="monotone"
            dataKey="conv"
            stroke="oklch(0.7 0.17 162)"
            strokeWidth={2}
            fill="url(#convFill)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}