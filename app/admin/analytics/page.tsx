"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Users,
  ShieldUser,
  AlertTriangle,
  BarChart3,
  BookOpen,
  Award,
  UserCheck,
  UserX,
} from "lucide-react";
// Chart components for richer analytics (implement as needed)

import { useEffect, useState } from "react";

// Types
interface User {
  id: string;
  name?: string;
  createdAt?: string;
  updatedAt?: string;
  enrolledCourses?: string;
  banned?: boolean;
  role?: string;
  institution?: string;
  achievements?: string;
}
interface Session {
  id: string;
  userId: string;
  [key: string]: unknown;
}

interface RetentionData {
  day: number | string;
  percent: number;
}

interface SessionsPerDayData {
  date: string;
  sessions: number;
}

interface InstitutionGrowthData {
  institution: string;
  users: number;
}

interface AchievementsDistData {
  count: number | string;
  users: number;
}

import { authClient } from "@/utils/auth-client";
import { RetentionChart } from "../components/retention-chart";
import { SessionsPerDayChart } from "../components/sessions-per-day-chart";
import { InstitutionGrowthChart } from "../components/institution-growth-chart";
import { AchievementsDistributionChart } from "../components/achievements-distribution-chart";
import { AlertCircle } from "lucide-react";

export default function AnalyticsPage() {
  const [stats, setStats] = useState<{
    totalUsers: number;
    retentionRate: number;
    avgCourses: number;
    bannedRatio: number;
    adminRatio: number;
    topInstitution: string | null;
    avgAchievements: number;
    inactiveUsers: number;
    mostActiveUser: string | null;
    avgSessionPerUser: number;
    topAchiever: string | null;
  }>({
    totalUsers: 0,
    retentionRate: 0,
    avgCourses: 0,
    bannedRatio: 0,
    adminRatio: 0,
    topInstitution: null,
    avgAchievements: 0,
    inactiveUsers: 0,
    mostActiveUser: null,
    avgSessionPerUser: 0,
    topAchiever: null,
  });
  // Chart data states
  const [retentionData, setRetentionData] = useState<RetentionData[]>([]);
  const [sessionsPerDayData, setSessionsPerDayData] = useState<
    SessionsPerDayData[]
  >([]);
  const [institutionGrowthData, setInstitutionGrowthData] = useState<
    InstitutionGrowthData[]
  >([]);
  const [achievementsDistData, setAchievementsDistData] = useState<
    AchievementsDistData[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAnalytics() {
      setLoading(true);
      setError(null);
      try {
        // Fetch all users
        const usersRes = await authClient.admin.listUsers({
          query: { limit: 10000 },
        });
        let users: User[] = [];
        if (Array.isArray((usersRes as unknown as { users?: User[] })?.users)) {
          users = (usersRes as unknown as { users: User[] }).users;
        } else if (
          Array.isArray(
            (usersRes as unknown as { data?: { users?: User[] } })?.data?.users
          )
        ) {
          users = (usersRes as unknown as { data: { users: User[] } }).data
            .users;
        } else if (Array.isArray(usersRes)) {
          users = usersRes as User[];
        }
        const now = new Date();
        const totalUsers = users.length;
        // Defensive: parse dates, handle nulls
        const parseDate = (d: string | undefined) =>
          d ? new Date(d) : new Date(0);
        // Retention: users who signed up >30d ago and have updated in last 30d
        const thirtyDaysAgo = new Date(
          now.getTime() - 30 * 24 * 60 * 60 * 1000
        );
        const retained = users.filter(
          (u) =>
            parseDate(u.createdAt) < thirtyDaysAgo &&
            parseDate(u.updatedAt) > thirtyDaysAgo
        ).length;
        const retentionRate = totalUsers ? (retained / totalUsers) * 100 : 0;
        // Average courses per user
        const avgCourses = totalUsers
          ? users.reduce((acc: number, u: User) => {
              if (!u.enrolledCourses) return acc;
              if (typeof u.enrolledCourses === "string") {
                return (
                  acc +
                  u.enrolledCourses.split(",").filter((c: string) => c.trim())
                    .length
                );
              }
              return acc;
            }, 0) / totalUsers
          : 0;
        // Banned user ratio
        const banned = users.filter((u) => !!u.banned).length;
        const bannedRatio = totalUsers ? (banned / totalUsers) * 100 : 0;
        // Admin ratio
        const admins = users.filter((u) => u.role === "admin").length;
        const adminRatio = totalUsers ? (admins / totalUsers) * 100 : 0;
        // Top institution
        const institutionCounts: Record<string, number> = {};
        users.forEach((u) => {
          if (u.institution && typeof u.institution === "string")
            institutionCounts[u.institution] =
              (institutionCounts[u.institution] || 0) + 1;
        });
        const topInstitution =
          Object.entries(institutionCounts).sort(
            (a, b) => b[1] - a[1]
          )[0]?.[0] || null;
        // Average achievements per user
        const avgAchievements = totalUsers
          ? users.reduce((acc: number, u: User) => {
              if (!u.achievements) return acc;
              if (typeof u.achievements === "string") {
                return (
                  acc +
                  u.achievements.split(",").filter((a: string) => a.trim())
                    .length
                );
              }
              return acc;
            }, 0) / totalUsers
          : 0;
        // Inactive users (no update in last 30d)
        const inactiveUsers = users.filter(
          (u) => parseDate(u.updatedAt) < thirtyDaysAgo
        ).length;
        // Sessions: count all sessions and per-user session counts
        let allSessions: Session[] = [];
        const userSessionCounts: Record<string, number> = {};
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
              sessionsArr = (res as unknown as { sessions: Session[] })
                .sessions;
            else if (
              Array.isArray(
                (res as unknown as { data?: { sessions?: Session[] } })?.data
                  ?.sessions
              )
            )
              sessionsArr = (
                res as unknown as { data: { sessions: Session[] } }
              ).data.sessions;
            else if (Array.isArray(res)) sessionsArr = res as Session[];
            allSessions = allSessions.concat(
              sessionsArr.map((s) => ({ ...s, userId: user.id }))
            );
            userSessionCounts[user.id] = sessionsArr.length;
          } catch {
            userSessionCounts[user.id] = 0;
          }
        }
        // Average sessions per user
        const avgSessionPerUser = totalUsers
          ? allSessions.length / totalUsers
          : 0;
        // Most active user (by session count)
        let mostActiveUser: string | null = null;
        if (Object.keys(userSessionCounts).length > 0) {
          const maxSessions = Math.max(...Object.values(userSessionCounts));
          const userId = Object.keys(userSessionCounts).find(
            (id) => userSessionCounts[id] === maxSessions
          );
          mostActiveUser = users.find((u) => u.id === userId)?.name || null;
        }
        // Top achiever (most achievements)
        let topAchiever: string | null = null;
        let maxAch = 0;
        users.forEach((u) => {
          let achCount = 0;
          if (u.achievements && typeof u.achievements === "string") {
            achCount = u.achievements
              .split(",")
              .filter((a: string) => a.trim()).length;
          }
          if (achCount > maxAch) {
            maxAch = achCount;
            topAchiever = u.name || null;
          }
        });
        // Chart data: Retention (only 30d value possible)
        setRetentionData([{ day: "30d", percent: retentionRate }]);

        // Chart data: Sessions (only total possible)
        setSessionsPerDayData([
          { date: "Total", sessions: allSessions.length },
        ]);

        // Chart data: Institution user counts (top 5)
        const sortedInstitutions = Object.entries(institutionCounts)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 5)
          .map(([institution, users]) => ({ institution, users }));
        setInstitutionGrowthData(sortedInstitutions);

        // Chart data: Achievements distribution (real, up to 3+)
        const achDist: Record<string, number> = {};
        users.forEach((u) => {
          let count = 0;
          if (u.achievements && typeof u.achievements === "string") {
            count = u.achievements
              .split(",")
              .filter((a: string) => a.trim()).length;
          }
          const key = count >= 3 ? "3+" : String(count);
          achDist[key] = (achDist[key] || 0) + 1;
        });
        setAchievementsDistData(
          Object.entries(achDist)
            .sort(
              (a, b) =>
                Number(a[0].replace("+", "")) - Number(b[0].replace("+", ""))
            )
            .map(([count, users]) => ({ count, users }))
        );
        setStats({
          totalUsers,
          retentionRate,
          avgCourses,
          bannedRatio,
          adminRatio,
          topInstitution,
          avgAchievements,
          inactiveUsers,
          mostActiveUser,
          avgSessionPerUser,
          topAchiever,
        });
      } catch {
        setError("Failed to load analytics");
      } finally {
        setLoading(false);
      }
    }
    fetchAnalytics();
  }, []);

  if (loading) {
    // Animated skeletons for loading state
    return (
      <div className="space-y-6">
        <div>
          <div className="h-8 w-48 bg-accent animate-pulse rounded mb-2" />
          <div className="h-4 w-64 bg-accent animate-pulse rounded" />
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="rounded-lg border bg-card p-4">
              <div className="h-4 w-24 bg-accent animate-pulse rounded mb-2" />
              <div className="h-8 w-20 bg-accent animate-pulse rounded mb-1" />
            </div>
          ))}
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mt-8">
          {Array.from({ length: 2 }).map((_, i) => (
            <div
              key={i}
              className="col-span-4 rounded-lg border bg-card p-6 flex flex-col items-center justify-center min-h-[200px]"
            >
              <div className="h-6 w-32 bg-accent animate-pulse rounded mb-4" />
              <div className="h-32 w-full bg-accent animate-pulse rounded" />
            </div>
          ))}
        </div>
      </div>
    );
  }
  if (error) {
    return <div className="p-8 text-lg text-red-600">{error}</div>;
  }
  return (
    <>
      <main className="mx-auto w-full max-w-6xl px-4 py-8">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
            <p className="text-muted-foreground">
              Deep insights and actionable metrics for Skillpix
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Users
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalUsers}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Retention Rate (30d)
                </CardTitle>
                <UserCheck className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {stats.retentionRate.toFixed(1)}%
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Avg. Courses/User
                </CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {stats.avgCourses.toFixed(2)}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Banned User Ratio
                </CardTitle>
                <AlertTriangle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {stats.bannedRatio.toFixed(1)}%
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Admin Ratio
                </CardTitle>
                <ShieldUser className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {stats.adminRatio.toFixed(1)}%
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Top Institution
                </CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {stats.topInstitution || "-"}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Avg. Achievements/User
                </CardTitle>
                <Award className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {stats.avgAchievements.toFixed(2)}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Inactive Users (30d)
                </CardTitle>
                <UserX className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.inactiveUsers}</div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="retention" className="space-y-4">
            <TabsList>
              <TabsTrigger value="retention">Retention</TabsTrigger>
              <TabsTrigger value="sessions">Sessions</TabsTrigger>
              <TabsTrigger value="institutions">Institutions</TabsTrigger>
              <TabsTrigger value="achievements">Achievements</TabsTrigger>
            </TabsList>

            <TabsContent value="retention" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Retention Curve</CardTitle>
                  <CardDescription>
                    Percentage of users returning after signup (30d cohort)
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {retentionData &&
                  retentionData.length > 0 &&
                  retentionData[0].percent > 0 ? (
                    <RetentionChart data={retentionData} />
                  ) : (
                    <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
                      <AlertCircle className="w-8 h-8 mb-2 text-yellow-500" />
                      <span>Not enough data to display retention chart.</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="sessions" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Sessions</CardTitle>
                  <CardDescription>
                    Total sessions on the platform
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {sessionsPerDayData &&
                  sessionsPerDayData.length > 0 &&
                  sessionsPerDayData[0].sessions > 0 ? (
                    <SessionsPerDayChart data={sessionsPerDayData} />
                  ) : (
                    <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
                      <AlertCircle className="w-8 h-8 mb-2 text-yellow-500" />
                      <span>Not enough data to display sessions chart.</span>
                    </div>
                  )}
                  <div className="mt-4">
                    <b>Avg. Sessions/User:</b>{" "}
                    {stats.avgSessionPerUser.toFixed(2)}
                    <br />
                    <b>Most Active User:</b> {stats.mostActiveUser || "-"}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="institutions" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>User Growth by Institution</CardTitle>
                  <CardDescription>
                    Top institutions and their user growth
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {institutionGrowthData && institutionGrowthData.length > 0 ? (
                    <InstitutionGrowthChart data={institutionGrowthData} />
                  ) : (
                    <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
                      <AlertCircle className="w-8 h-8 mb-2 text-yellow-500" />
                      <span>Not enough data to display institution chart.</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="achievements" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Achievements Distribution</CardTitle>
                  <CardDescription>
                    How many users have 0, 1, 2, 3+ achievements
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {achievementsDistData &&
                  achievementsDistData.length > 0 &&
                  achievementsDistData.some((d) => d.users > 0) ? (
                    <AchievementsDistributionChart
                      data={achievementsDistData}
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
                      <AlertCircle className="w-8 h-8 mb-2 text-yellow-500" />
                      <span>
                        Not enough data to display achievements chart.
                      </span>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </>
  );
}
