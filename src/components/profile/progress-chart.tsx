"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

const config = {
  percent: { label: "Progress", color: "var(--chart-1)" },
} satisfies ChartConfig;

export function ProgressChart({
  data,
}: {
  data: { title: string; percent: number }[];
}) {
  return (
    <ChartContainer config={config} className="aspect-auto h-64 w-full">
      <BarChart
        data={data}
        layout="vertical"
        margin={{ left: 0, right: 16 }}
        accessibilityLayer
      >
        <CartesianGrid horizontal={false} />
        <XAxis
          type="number"
          domain={[0, 100]}
          tickFormatter={(v) => `${v}%`}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          type="category"
          dataKey="title"
          width={140}
          tickLine={false}
          axisLine={false}
          tickFormatter={(v: string) => (v.length > 20 ? `${v.slice(0, 19)}…` : v)}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideIndicator formatter={(v) => `${v}% complete`} />}
        />
        <Bar dataKey="percent" fill="var(--color-percent)" radius={6} barSize={18} />
      </BarChart>
    </ChartContainer>
  );
}
