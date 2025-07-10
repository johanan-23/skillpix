"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

import { useEffect, useState } from "react";
import { authClient } from "@/utils/auth-client";
import { Loader2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type User = {
  createdAt?: string | Date;
};


export function Overview() {
  const [rawUsers, setRawUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [timeframe, setTimeframe] = useState<"7" | "14" | "30" | "365">("30");
  // Polling logic for user data
  useEffect(() => {
    let isMounted = true;

    const fetchUsers = async (isBackground = false) => {
      if (!isBackground) setLoading(true);
      setError(null);
      try {
        const usersRes = await authClient.admin.listUsers({
          query: { limit: 1000 },
        });
        let users: User[] = [];
        if (Array.isArray(usersRes)) users = usersRes;
        else if (Array.isArray((usersRes as { users?: User[] })?.users))
          users = (usersRes as { users?: User[] }).users!;
        else if (
          Array.isArray(
            (usersRes as { data?: { users?: User[] } })?.data?.users
          )
        )
          users = (usersRes as { data?: { users?: User[] } }).data!.users!;
        if (isMounted) setRawUsers(users);
      } catch {
        if (isMounted) setError("Failed to load user data");
      } finally {
        if (!isBackground && isMounted) setLoading(false);
      }
    };

    fetchUsers(); // initial load
    const intervalId = setInterval(() => fetchUsers(true), 10000); // poll every 10s
    return () => {
      isMounted = false;
      clearInterval(intervalId);
    };
  }, []);

  function computeData(): { name: string; total: number }[] {
    const now = new Date();
    if (timeframe === "365") {
      // Last 12 months
      const labels: string[] = [];
      const dataMap: Record<string, number> = {};
      for (let i = 11; i >= 0; i--) {
        const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
        const label = d.toLocaleString("default", {
          month: "short",
          year: "2-digit",
        });
        labels.push(label);
        dataMap[label] = 0;
      }
      rawUsers.forEach((u) => {
        if (!u.createdAt) return;
        const d = new Date(u.createdAt);
        const label = d.toLocaleString("default", {
          month: "short",
          year: "2-digit",
        });
        if (label in dataMap) dataMap[label]++;
      });
      return labels.map((name) => ({ name, total: dataMap[name] }));
    }
    // Days view (7,14,30)
    const days = parseInt(timeframe, 10);
    const labels: string[] = [];
    const dataMap: Record<string, number> = {};
    for (let i = days - 1; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(now.getDate() - i);
      const label = d.toLocaleDateString("default", {
        month: "short",
        day: "numeric",
      });
      labels.push(label);
      dataMap[label] = 0;
    }
    rawUsers.forEach((u) => {
      if (!u.createdAt) return;
      const d = new Date(u.createdAt);
      const label = d.toLocaleDateString("default", {
        month: "short",
        day: "numeric",
      });
      if (label in dataMap) dataMap[label]++;
    });
    return labels.map((name) => ({ name, total: dataMap[name] }));
  }

  return (
    <Tabs
      value={timeframe}
      onValueChange={(v: string) =>
        setTimeframe(v as "7" | "14" | "30" | "365")
      }
      className="space-y-4"
    >
      <TabsList>
        <TabsTrigger value="7">1W</TabsTrigger>
        <TabsTrigger value="14">2W</TabsTrigger>
        <TabsTrigger value="30">1M</TabsTrigger>
        <TabsTrigger value="365">1Y</TabsTrigger>
      </TabsList>
      <TabsContent value={timeframe}>
        {loading ? (
          <div className="flex items-center justify-center h-[350px] w-full">
            <Loader2 className="animate-spin h-8 w-8 text-muted-foreground mr-2" />
            <span className="text-muted-foreground">Loading chart…</span>
          </div>
        ) : error ? (
          <div className="flex items-center justify-center h-[350px] w-full">
            <span className="text-red-600 font-medium">{error}</span>
          </div>
        ) : (
          <ResponsiveContainer width="100%" minHeight={200}>
            <BarChart data={computeData()}>
              <XAxis
                dataKey="name"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                fontSize={12}
                tickLine={false}
                axisLine={false}
                allowDecimals={false}
                tickFormatter={(value) => `${value}`}
              />
              <Bar
                dataKey="total"
                fill="var(--chart-accent, #2563eb)"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </TabsContent>
    </Tabs>
  );
}
