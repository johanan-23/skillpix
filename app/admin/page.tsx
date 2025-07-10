"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/utils/auth-client";
import { Activity, AlertTriangle, ShieldUser, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Overview } from "@/app/admin/components/overview";

interface User {
  id: string;
  banned?: boolean;
  role?: string;
}

interface Session {
  // Define properties as needed, or leave as unknown for now
  [key: string]: unknown;
}

interface DashboardStat {
  title: string;
  value: number;
  icon: React.ElementType;
}

export default function AdminDashboard() {
  const [dashboardStats, setDashboardStats] = useState<DashboardStat[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // fetchStats accepts isBackground to control loading state
  const fetchStats = async (isBackground = false) => {
    if (!isBackground) setLoading(true);
    setError(null);
    try {
      // TODO: Replace with direct DB count queries if available (Drizzle, etc.)
      // For now, use admin API
      const usersRes = await authClient.admin.listUsers({
        query: { limit: 1000 },
      });
      let users: User[] = [];
      if (Array.isArray(usersRes)) users = usersRes as User[];
      else if (
        Array.isArray((usersRes as unknown as { users?: User[] })?.users)
      )
        users = (usersRes as unknown as { users: User[] }).users;
      else if (
        Array.isArray((usersRes as { data?: { users?: User[] } })?.data?.users)
      )
        users = (usersRes as { data: { users: User[] } }).data.users;
      const totalUsers = users.length;
      const bannedUsers = users.filter((u: User) => u.banned).length;
      const adminUsers = users.filter((u: User) => u.role === "admin").length;
      // Sessions: count all sessions (could be optimized with a count query)
      let allSessions: Session[] = [];
      for (const user of users) {
        try {
          const res = await authClient.admin.listUserSessions({
            userId: user.id,
          });
          let sessionsArr: Session[] = [];
          if (
            Array.isArray(
              (res as unknown as { sessions?: Session[] })?.sessions
            )
          )
            sessionsArr = (res as unknown as { sessions: Session[] }).sessions;
          else if (
            Array.isArray(
              (res as { data?: { sessions?: Session[] } })?.data?.sessions
            )
          )
            sessionsArr = (res as { data: { sessions: Session[] } }).data
              .sessions;
          else if (Array.isArray(res)) sessionsArr = res as Session[];
          allSessions = allSessions.concat(sessionsArr);
        } catch {
          // ignore
        }
      }
      const activeSessions = allSessions.length;
      setDashboardStats([
        {
          title: "Total Users",
          value: totalUsers,
          icon: Users,
        },
        {
          title: "Active Sessions",
          value: activeSessions,
          icon: Activity,
        },
        {
          title: "Admins",
          value: adminUsers,
          icon: ShieldUser,
        },
        {
          title: "Banned Users",
          value: bannedUsers,
          icon: AlertTriangle,
        },
      ]);
    } catch {
      setError("Failed to load dashboard stats");
    } finally {
      if (!isBackground) setLoading(false);
    }
  };

  useEffect(() => {
    let isMounted = true;

    const fetchAndSet = async (isBackground = false) => {
      if (!isMounted) return;
      await fetchStats(isBackground);
    };
    const intervalId = setInterval(() => fetchAndSet(true), 10000); // Poll every 10 seconds, background
    fetchAndSet(); // initial load
    return () => {
      isMounted = false;
      clearInterval(intervalId);
    };
  }, []);
  return (
    <>
      <div className="space-y-6 mt-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {loading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <Card key={i}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div className="w-24 h-4">
                    <span className="sr-only">Loading</span>
                    <span className="block bg-accent animate-pulse rounded-md w-full h-full" />
                  </div>
                  <span className="block bg-accent animate-pulse rounded-full h-4 w-4" />
                </CardHeader>
                <CardContent>
                  <div className="h-8 w-20 bg-accent animate-pulse rounded-md mb-2" />
                  <div className="h-3 w-24 bg-accent animate-pulse rounded-md" />
                </CardContent>
              </Card>
            ))
          ) : error ? (
            <Card>
              <CardContent className="text-red-600">{error}</CardContent>
            </Card>
          ) : (
            dashboardStats.map((stat) => (
              <Card key={stat.title}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {stat.title}
                  </CardTitle>
                  <stat.icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
        <div>
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>User Growth Overview</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              <Overview />
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
