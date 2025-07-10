"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Search, Trash2, Eye } from "lucide-react";

import { useEffect } from "react";
import { authClient } from "@/utils/auth-client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import Image from "next/image";

// Type definitions
interface User {
  id?: string;
  name?: string;
  email?: string;
  username?: string;
  institution?: string;
  gradeLevel?: string;
  role?: "admin" | "student";
  banned?: boolean;
  banReason?: string;
  image?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface Session {
  id: string;
  token?: string;
  ipAddress?: string;
  userAgent?: string;
  createdAt?: string;
  updatedAt?: string;
  expiresAt?: string;
  user?: User;
}

interface UsersResponse {
  users?: User[];
  data?: {
    users: User[];
    total?: number;
  };
  total?: number;
}

interface SessionsResponse {
  sessions?: Session[];
  data?: {
    sessions: Session[];
  };
}

export default function SessionsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalSessions, setTotalSessions] = useState(0);
  const pageSize = 10;

  // Dialog state
  const [dialog, setDialog] = useState<
    | null
    | {
        type: "revoke-session";
        sessionId: string;
      }
    | {
        type: "revoke-all";
        userId: string;
      }
  >(null);

  useEffect(() => {
    let isMounted = true;
    async function fetchSessions(isBackground = false) {
      if (!isBackground) setLoading(true);
      setError(null);
      try {
        const usersRes = await authClient.admin.listUsers({
          query: {
            limit: pageSize,
            offset: (currentPage - 1) * pageSize,
            sortBy: "createdAt",
            sortDirection: "desc",
          },
        });

        let users: User[] = [];
        let total = 0;
        const typedUsersRes = usersRes as UsersResponse | User[];

        if (Array.isArray(typedUsersRes)) {
          users = typedUsersRes;
          total = users.length;
        } else if (Array.isArray(typedUsersRes?.users)) {
          users = typedUsersRes.users;
          total = typedUsersRes.total || users.length;
        } else if (Array.isArray(typedUsersRes?.data?.users)) {
          users = typedUsersRes.data.users;
          total = typedUsersRes.data.total || users.length;
        }

        let allSessions: Session[] = [];
        for (const user of users) {
          if (!user.id) continue; // Skip users without id
          try {
            const res = await authClient.admin.listUserSessions({
              userId: user.id,
            });
            let sessionsArr: Session[] = [];
            const typedRes = res as unknown as SessionsResponse | Session[];

            if (Array.isArray(typedRes)) {
              sessionsArr = typedRes;
            } else if (Array.isArray(typedRes?.sessions)) {
              sessionsArr = typedRes.sessions;
            } else if (Array.isArray(typedRes?.data?.sessions)) {
              sessionsArr = typedRes.data.sessions;
            }

            allSessions = allSessions.concat(
              sessionsArr.map((s: Session) => ({ ...s, user }))
            );
          } catch (err) {
            console.error("Error fetching sessions for user", user, err);
          }
        }
        if (!isMounted) return;
        setSessions(allSessions);
        setTotalSessions(total); // Note: this represents users with sessions, not total sessions
      } catch (e) {
        if (isMounted) {
          console.error("Error fetching users or sessions:", e);
          setError("Failed to load sessions");
        }
      } finally {
        if (!isBackground && isMounted) setLoading(false);
      }
    }
    fetchSessions();
    const intervalId = setInterval(() => fetchSessions(true), 15000); // Poll every 15 seconds, background
    return () => {
      isMounted = false;
      clearInterval(intervalId);
    };
  }, [currentPage, pageSize]);

  // Client-side filtering only works on the current page since we're using server-side pagination
  const filteredSessions = sessions.filter((session) => {
    const search = searchTerm.toLowerCase();
    return (
      session.user?.name?.toLowerCase().includes(search) ||
      session.user?.email?.toLowerCase().includes(search) ||
      session.user?.username?.toLowerCase().includes(search) ||
      (session.ipAddress || "").toLowerCase().includes(search) ||
      (session.user?.institution || "").toLowerCase().includes(search) ||
      (session.user?.gradeLevel || "").toLowerCase().includes(search)
    );
  });

  const handleRevokeSession = async (sessionId: string) => {
    try {
      await authClient.admin.revokeUserSession({ sessionToken: sessionId });
      setSessions((prev) => prev.filter((s) => s.id !== sessionId));
    } catch (err) {
      console.error("Error revoking session", sessionId, err);
      toast("Failed to revoke session");
    }
  };

  const handleRevokeAllUserSessions = async (userId: string) => {
    try {
      await authClient.admin.revokeUserSessions({ userId });
      setSessions((prev) => prev.filter((s) => s.user?.id !== userId));
    } catch (err) {
      console.error("Error revoking all sessions for user", userId, err);
      toast("Failed to revoke all sessions for user");
    }
  };

  return (
    <>
      <main className="mx-auto max-w-6xl h-fit px-4 py-8">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Sessions</h1>
            <p className="text-muted-foreground">
              Monitor and manage user sessions
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Active Sessions</CardTitle>
              <CardDescription>
                View and manage all user sessions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2 mb-4">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search sessions..."
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setCurrentPage(1); // Reset to first page when searching
                    }}
                    className="pl-8"
                  />
                </div>
              </div>

              <div className="rounded-md border overflow-x-auto">
                <Table className="border-collapse w-full">
                  <TableHeader>
                    <TableRow>
                      <TableHead
                        className="sticky left-0 z-10 bg-background border border-r border-b font-bold min-w-[180px]"
                        style={{ boxShadow: "2px 0 0 0 var(--border)" }}
                      >
                        User
                      </TableHead>
                      <TableHead className="border border-b font-bold">
                        Username
                      </TableHead>
                      <TableHead className="border border-b font-bold">
                        Email
                      </TableHead>
                      <TableHead className="border border-b font-bold">
                        Institution
                      </TableHead>
                      <TableHead className="border border-b font-bold">
                        Role
                      </TableHead>
                      <TableHead className="border border-b font-bold">
                        Status
                      </TableHead>
                      <TableHead className="border border-b font-bold">
                        Session Token
                      </TableHead>
                      <TableHead className="border border-b font-bold">
                        IP Address
                      </TableHead>
                      <TableHead className="border border-b font-bold">
                        Created
                      </TableHead>
                      <TableHead className="border border-b font-bold">
                        Expires
                      </TableHead>
                      <TableHead
                        className="sticky right-0 z-10 bg-background border border-l border-b text-right font-bold min-w-[120px]"
                        style={{ boxShadow: "-2px 0 0 0 var(--border)" }}
                      >
                        Actions
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {loading ? (
                      // Animated skeleton rows for loading state
                      Array.from({ length: 6 }).map((_, i) => (
                        <TableRow key={i}>
                          <TableCell className="sticky left-0 z-10 bg-background border border-r">
                            <div className="flex items-center gap-2">
                              <Skeleton className="w-8 h-8 rounded-full" />
                              <div>
                                <Skeleton className="h-4 w-24 mb-1" />
                                <Skeleton className="h-3 w-16" />
                              </div>
                            </div>
                          </TableCell>
                          {Array.from({ length: 8 }).map((_, j) => (
                            <TableCell key={j} className="border">
                              <Skeleton className="h-4 w-full" />
                            </TableCell>
                          ))}
                          <TableCell className="sticky right-0 z-10 bg-background border border-l text-right">
                            <Skeleton className="h-8 w-8 rounded-full mx-auto" />
                          </TableCell>
                        </TableRow>
                      ))
                    ) : error ? (
                      <TableRow>
                        <TableCell colSpan={11} className="text-red-600 border">
                          {error}
                        </TableCell>
                      </TableRow>
                    ) : filteredSessions.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={11} className="border">
                          No sessions found.
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredSessions.map((session) => {
                        const user: User = session.user || {};
                        return (
                          <TableRow key={session.id}>
                            <TableCell className="sticky left-0 z-10 bg-background border border-r font-medium min-w-[180px]">
                              <div className="flex items-center gap-2">
                                {user.image && (
                                  <img
                                    src={user.image}
                                    alt={user.name || user.email || "User"}
                                    className="w-8 h-8 rounded-full border"
                                  />
                                )}
                                <div>
                                  <div className="font-medium">
                                    {user.name || (
                                      <span className="text-xs text-red-500">
                                        No name
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell className="border">
                              {user.username || (
                                <span className="text-xs text-muted-foreground">
                                  -
                                </span>
                              )}
                            </TableCell>
                            <TableCell className="border">
                              {user.email || (
                                <span className="text-xs text-muted-foreground">
                                  -
                                </span>
                              )}
                            </TableCell>
                            <TableCell className="border">
                              {user.institution || (
                                <span className="text-xs text-muted-foreground">
                                  -
                                </span>
                              )}
                            </TableCell>
                            <TableCell className="border">
                              <Badge
                                variant={
                                  user.role === "admin"
                                    ? "default"
                                    : "secondary"
                                }
                              >
                                {user.role || "student"}
                              </Badge>
                            </TableCell>
                            <TableCell className="border">
                              {user.banned ? (
                                <span className="text-red-600 font-bold">
                                  Banned
                                </span>
                              ) : (
                                <span className="text-green-600">Active</span>
                              )}
                              {user.banned && user.banReason && (
                                <div className="text-xs text-muted-foreground">
                                  {user.banReason}
                                </div>
                              )}
                            </TableCell>
                            <TableCell className="border">
                              <span className="text-xs break-all">
                                {session.token || (
                                  <span className="text-muted-foreground">
                                    -
                                  </span>
                                )}
                              </span>
                            </TableCell>
                            <TableCell className="border">
                              {session.ipAddress || (
                                <span className="text-xs text-muted-foreground">
                                  -
                                </span>
                              )}
                            </TableCell>
                            <TableCell className="border">
                              {session.createdAt ? (
                                new Date(session.createdAt).toLocaleString()
                              ) : (
                                <span className="text-xs text-muted-foreground">
                                  -
                                </span>
                              )}
                            </TableCell>
                            <TableCell className="border">
                              {session.expiresAt ? (
                                new Date(session.expiresAt).toLocaleString()
                              ) : (
                                <span className="text-xs text-muted-foreground">
                                  -
                                </span>
                              )}
                            </TableCell>
                            <TableCell className="sticky right-0 z-10 bg-background border border-l text-right min-w-[120px]">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    className="h-8 w-8 p-0"
                                  >
                                    <span className="sr-only">Open menu</span>
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                  <DropdownMenuItem
                                    onClick={() =>
                                      window.alert(
                                        JSON.stringify(
                                          {
                                            user: {
                                              id: user.id,
                                              name: user.name,
                                              email: user.email,
                                              username: user.username,
                                              institution: user.institution,
                                              gradeLevel: user.gradeLevel,
                                              role: user.role,
                                              banned: user.banned,
                                              banReason: user.banReason,
                                              createdAt: user.createdAt,
                                              updatedAt: user.updatedAt,
                                            },
                                            session: {
                                              id: session.id,
                                              token: session.token,
                                              ipAddress: session.ipAddress,
                                              userAgent: session.userAgent,
                                              createdAt: session.createdAt,
                                              updatedAt: session.updatedAt,
                                              expiresAt: session.expiresAt,
                                            },
                                          },
                                          null,
                                          2
                                        )
                                      )
                                    }
                                  >
                                    <Eye className="mr-2 h-4 w-4" />
                                    View Details
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    onClick={() =>
                                      setDialog({
                                        type: "revoke-session",
                                        sessionId: session.id,
                                      })
                                    }
                                    className="text-red-600"
                                  >
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Revoke Session
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    onClick={() => {
                                      if (user.id) {
                                        setDialog({
                                          type: "revoke-all",
                                          userId: user.id,
                                        });
                                      }
                                    }}
                                    className="text-red-600"
                                  >
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Revoke All User Sessions
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        );
                      })
                    )}
                  </TableBody>
                </Table>
              </div>

              {/* Pagination */}
              {Math.ceil(totalSessions / pageSize) > 1 && (
                <div className="flex items-center justify-between px-2 py-4">
                  <div className="text-sm text-muted-foreground">
                    Showing page {currentPage} of{" "}
                    {Math.ceil(totalSessions / pageSize)}({totalSessions} users
                    with sessions)
                  </div>
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            if (currentPage > 1) {
                              setCurrentPage(currentPage - 1);
                            }
                          }}
                          className={
                            currentPage <= 1
                              ? "pointer-events-none opacity-50"
                              : ""
                          }
                        />
                      </PaginationItem>

                      {/* Page numbers */}
                      {Array.from(
                        {
                          length: Math.min(
                            5,
                            Math.ceil(totalSessions / pageSize)
                          ),
                        },
                        (_, i) => {
                          const totalPages = Math.ceil(
                            totalSessions / pageSize
                          );
                          let pageNum;
                          if (totalPages <= 5) {
                            pageNum = i + 1;
                          } else if (currentPage <= 3) {
                            pageNum = i + 1;
                          } else if (currentPage >= totalPages - 2) {
                            pageNum = totalPages - 4 + i;
                          } else {
                            pageNum = currentPage - 2 + i;
                          }

                          return (
                            <PaginationItem key={pageNum}>
                              <PaginationLink
                                href="#"
                                isActive={currentPage === pageNum}
                                onClick={(e) => {
                                  e.preventDefault();
                                  setCurrentPage(pageNum);
                                }}
                              >
                                {pageNum}
                              </PaginationLink>
                            </PaginationItem>
                          );
                        }
                      )}

                      {Math.ceil(totalSessions / pageSize) > 5 &&
                        currentPage <
                          Math.ceil(totalSessions / pageSize) - 2 && (
                          <PaginationItem>
                            <PaginationEllipsis />
                          </PaginationItem>
                        )}

                      <PaginationItem>
                        <PaginationNext
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            if (
                              currentPage < Math.ceil(totalSessions / pageSize)
                            ) {
                              setCurrentPage(currentPage + 1);
                            }
                          }}
                          className={
                            currentPage >= Math.ceil(totalSessions / pageSize)
                              ? "pointer-events-none opacity-50"
                              : ""
                          }
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Confirmation Dialogs */}
          <Dialog
            open={!!dialog}
            onOpenChange={(open) => !open && setDialog(null)}
          >
            {dialog?.type === "revoke-session" && (
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Revoke Session</DialogTitle>
                  <DialogDescription>
                    Are you sure you want to revoke this session? This action
                    cannot be undone.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button variant="secondary" onClick={() => setDialog(null)}>
                    Cancel
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={async () => {
                      if (dialog?.type === "revoke-session") {
                        await handleRevokeSession(dialog.sessionId);
                        setDialog(null);
                      }
                    }}
                  >
                    Revoke
                  </Button>
                </DialogFooter>
              </DialogContent>
            )}
            {dialog?.type === "revoke-all" && (
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Revoke All User Sessions</DialogTitle>
                  <DialogDescription>
                    Are you sure you want to revoke <b>all</b> sessions for this
                    user? This cannot be undone.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button variant="secondary" onClick={() => setDialog(null)}>
                    Cancel
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={async () => {
                      if (dialog?.type === "revoke-all") {
                        await handleRevokeAllUserSessions(dialog.userId);
                        setDialog(null);
                      }
                    }}
                  >
                    Revoke All
                  </Button>
                </DialogFooter>
              </DialogContent>
            )}
          </Dialog>
        </div>
      </main>
    </>
  );
}
