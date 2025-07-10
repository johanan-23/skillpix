"use client";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis } from "recharts";

type AchievementDistributionDatum = {
  count: number | string;
  users: number;
};

export function AchievementsDistributionChart({
  data,
}: {
  data: AchievementDistributionDatum[];
}) {
  // Map count 3+ to a single bar
  const chartData = [
    ...data.filter((d) => typeof d.count === "number" && d.count < 3),
    {
      count: "3+",
      users: data
        .filter((d) => typeof d.count === "number" && d.count >= 3)
        .reduce((acc, d) => acc + d.users, 0),
    },
  ];
  return (
    <ChartContainer config={{ users: { label: "Users", color: "#f59e42" } }}>
      <BarChart
        data={chartData}
        margin={{ top: 8, right: 16, left: 8, bottom: 8 }}
      >
        <XAxis dataKey="count" />
        <YAxis allowDecimals={false} />
        <Bar dataKey="users" fill="#f59e42" radius={[4, 4, 0, 0]} />
        <ChartTooltip formatter={(value: number) => `${value} users`} />
      </BarChart>
    </ChartContainer>
  );
}
