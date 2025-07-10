"use client";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis } from "recharts";

type SessionsPerDayData = { date: string; sessions: number };

export function SessionsPerDayChart({ data }: { data: SessionsPerDayData[] }) {
  return (
    <ChartContainer
      config={{ sessions: { label: "Sessions", color: "#22c55e" } }}
    >
      <BarChart data={data} margin={{ top: 8, right: 16, left: 8, bottom: 8 }}>
        <XAxis dataKey="date" />
        <YAxis allowDecimals={false} />
        <Bar dataKey="sessions" fill="#22c55e" radius={[4, 4, 0, 0]} />
        <ChartTooltip formatter={(value: number) => `${value} sessions`} />
      </BarChart>
    </ChartContainer>
  );
}
