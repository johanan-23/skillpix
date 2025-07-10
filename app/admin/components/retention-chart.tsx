"use client";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis } from "recharts";

type RetentionData = { day: number | string; percent: number };

export function RetentionChart({ data }: { data: RetentionData[] }) {
  return (
    <ChartContainer
      config={{ retention: { label: "Retention", color: "#2563eb" } }}
    >
      <LineChart data={data} margin={{ top: 8, right: 16, left: 8, bottom: 8 }}>
        <XAxis dataKey="day" tickFormatter={(d) => `${d}d`} />
        <YAxis domain={[0, 100]} tickFormatter={(v) => `${v}%`} />
        <Line
          type="monotone"
          dataKey="percent"
          stroke="#2563eb"
          strokeWidth={2}
          dot
        />
        <ChartTooltip formatter={(value: number) => `${value.toFixed(1)}%`} />
      </LineChart>
    </ChartContainer>
  );
}
