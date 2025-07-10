"use client";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis } from "recharts";

type InstitutionGrowthData = { institution: string; users: number };

export function InstitutionGrowthChart({
  data,
}: {
  data: InstitutionGrowthData[];
}) {
  return (
    <ChartContainer config={{ users: { label: "Users", color: "#a21caf" } }}>
      <BarChart data={data} margin={{ top: 8, right: 16, left: 8, bottom: 8 }}>
        <XAxis dataKey="institution" />
        <YAxis allowDecimals={false} />
        <Bar dataKey="users" fill="#a21caf" radius={[4, 4, 0, 0]} />
        <ChartTooltip formatter={(value: number) => `${value} users`} />
      </BarChart>
    </ChartContainer>
  );
}
