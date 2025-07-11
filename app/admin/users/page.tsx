"use client";

import { useState } from "react";

// Type definitions
interface User {
  id: string;
  name?: string | null;
  email?: string | null;
  username?: string | null;
  institution?: string | null;
  gradeLevel?: string | null;
  role?: string | null;
  banned?: boolean | null;
  banReason?: string | null;
  emailVerified?: boolean | null;
  createdAt?: string | Date | null;
  updatedAt?: string | Date | null;
  enrolledCourses?: string | null;
  achievements?: string | null;
  image?: string | null;
  bio?: string | null;
}

interface Session {
  id: string;
  createdAt?: string | Date;
  expiresAt?: string | Date;
  ipAddress?: string | null;
  userAgent?: string | null;
  userId?: string;
  updatedAt?: Date;
  token?: string;
}

interface ApiResponse {
  users?: User[];
  total?: number;
  data?: {
    users?: User[];
    total?: number;
    sessions?: Session[];
  };
}
import { useForm } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  MoreHorizontal,
  Plus,
  Search,
  UserCheck,
  UserX,
  Shield,
  Trash2,
  User,
} from "lucide-react";
import { toast } from "sonner";

import { useEffect } from "react";
import { authClient } from "@/utils/auth-client";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import GppMaybeIcon from "@mui/icons-material/GppMaybe";
import { useRouter, useSearchParams } from "next/navigation";

export default function UsersPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  // Read initial values from URL search params
  const initialSearch = searchParams.get("search") || "";
  const initialRole =
    (searchParams.get("role") as "all" | "admin" | "student") || "all";
  const initialPage = parseInt(searchParams.get("page") || "1", 10);
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(
    Number.isNaN(initialPage) ? 1 : initialPage
  );
  const [totalUsers, setTotalUsers] = useState(0);
  const pageSize = 10;
  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "student",
      institution: "",
      gradeLevel: "",
      username: "",
    },
  });
  const [addUserLoading, setAddUserLoading] = useState(false);
  const [addUserError, setAddUserError] = useState<string | null>(null);
  const [roleFilter, setRoleFilter] = useState<"all" | "admin" | "student">(
    initialRole
  );
  const [banDialog, setBanDialog] = useState<{
    open: boolean;
    user: User | null;
  }>({ open: false, user: null });
  const [banReason, setBanReason] = useState("");
  const [banDuration, setBanDuration] = useState("");
  const [banLoading, setBanLoading] = useState(false);
  const [viewDetails, setViewDetails] = useState<User | null>(null);
  const [sessionsDialog, setSessionsDialog] = useState<{
    open: boolean;
    user: User | null;
    sessions: Session[];
  }>({ open: false, user: null, sessions: [] });
  const [sessionsLoading, setSessionsLoading] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState<{
    open: boolean;
    user: User | null;
  }>({ open: false, user: null });
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [impersonateDialog, setImpersonateDialog] = useState<{
    open: boolean;
    user: User | null;
  }>({ open: false, user: null });
  const [impersonateLoading, setImpersonateLoading] = useState(false);
  const [isImpersonating, setIsImpersonating] = useState(false);

  // Sync state to URL search params
  useEffect(() => {
    const params = new URLSearchParams();
    if (searchTerm) params.set("search", searchTerm);
    if (roleFilter && roleFilter !== "all") params.set("role", roleFilter);
    if (currentPage > 1) params.set("page", String(currentPage));
    // Only update if different
    const newUrl = `?${params.toString()}`;
    if (window.location.search !== newUrl) {
      router.replace(newUrl, { scroll: false });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, roleFilter, currentPage]);

  useEffect(() => {
    let isMounted = true;

    async function fetchUsers(isBackground = false) {
      if (!isBackground) setLoading(true);
      setError(null);
      try {
        const res = await authClient.admin.listUsers({
          query: {
            sortBy: "createdAt",
            sortDirection: "desc",
            limit: pageSize,
            offset: (currentPage - 1) * pageSize,
          },
        });
        if (!isMounted) return;
        if (Array.isArray((res as ApiResponse)?.users)) {
          setUsers((res as ApiResponse).users as User[]);
          setTotalUsers(
            (res as ApiResponse).total ||
              (res as ApiResponse).users?.length ||
              0
          );
        } else if (Array.isArray(res?.data?.users)) {
          setUsers(res.data.users as User[]);
          setTotalUsers(res.data.total || res.data.users.length);
        } else if (Array.isArray(res)) {
          setUsers(res as User[]);
          setTotalUsers(res.length);
        } else {
          setUsers([]);
          setTotalUsers(0);
        }
      } catch {
        if (isMounted) setError("Failed to load users");
      } finally {
        if (!isBackground && isMounted) setLoading(false);
      }
    }
    fetchUsers();
    const intervalId = setInterval(() => fetchUsers(true), 15000); // Poll every 15 seconds, background
    return () => {
      isMounted = false;
      clearInterval(intervalId);
    };
  }, [currentPage, pageSize]);

  // Since pagination is now server-side, client-side filtering is limited to the current page only
  const filteredUsers = users.filter((user) => {
    const search = searchTerm.toLowerCase();
    const matches =
      user.name?.toLowerCase().includes(search) ||
      user.email?.toLowerCase().includes(search) ||
      user.username?.toLowerCase().includes(search) ||
      (user.institution || "").toLowerCase().includes(search) ||
      (user.gradeLevel || "").toLowerCase().includes(search) ||
      (user.bio || "").toLowerCase().includes(search);
    if (roleFilter === "admin") return matches && user.role === "admin";
    if (roleFilter === "student") return matches && user.role !== "admin";
    return matches;
  });

  const totalPages = Math.ceil(totalUsers / pageSize);

  const handleBanUser = async (
    userId: string,
    reason?: string,
    duration?: string
  ) => {
    setBanLoading(true);
    try {
      await authClient.admin.banUser({
        userId,
        banReason: reason,
        banExpiresIn: duration ? Number(duration) : undefined,
      });
      setUsers((prev) =>
        prev.map((u) => (u.id === userId ? { ...u, banned: true } : u))
      );
      setBanDialog({ open: false, user: null });
      setBanReason("");
      setBanDuration("");
    } catch {
      alert("Failed to ban user");
    } finally {
      setBanLoading(false);
    }
  };

  const handleUnbanUser = async (userId: string) => {
    try {
      await authClient.admin.unbanUser({ userId });
      setUsers((prev) =>
        prev.map((u) => (u.id === userId ? { ...u, banned: false } : u))
      );
    } catch {
      alert("Failed to unban user");
    }
  };

  const handleChangeRole = async (userId: string, newRole: string) => {
    try {
      // Only allow "user" or "admin"
      const validRole = newRole === "admin" ? "admin" : "user";
      await authClient.admin.setRole({ userId, role: validRole });
      setUsers((prev) =>
        prev.map((u) => (u.id === userId ? { ...u, role: validRole } : u))
      );
    } catch {
      alert("Failed to change role");
    }
  };

  const handleDeleteUser = async (userId: string) => {
    setDeleteLoading(true);
    try {
      await authClient.admin.removeUser({
        userId,
      });
      setUsers((prev) => prev.filter((u) => u.id !== userId));
      setDeleteDialog({ open: false, user: null });
    } catch {
      alert("Failed to delete user");
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleImpersonateUser = async (userId: string) => {
    const user = users.find((u) => u.id === userId);
    if (user?.banned) {
      toast.error("Cannot impersonate a banned user.");
      return;
    }
    setImpersonateLoading(true);
    try {
      await authClient.admin.impersonateUser({
        userId,
      });
      setIsImpersonating(true);
      setImpersonateDialog({ open: false, user: null });
      toast.success(
        "Successfully started impersonating user. You can now navigate as this user."
      );
      window.open("/", "_blank");
    } catch {
      toast.error("Failed to impersonate user");
    } finally {
      setImpersonateLoading(false);
    }
  };

  const handleStopImpersonating = async () => {
    try {
      await authClient.admin.stopImpersonating();
      setIsImpersonating(false);
      toast.success("Stopped impersonating user");
    } catch {
      toast.error("Failed to stop impersonating");
    }
  };

  return (
    <>
      <main className="mx-auto max-w-6xl h-fit px-4 py-8">
        <div className="space-y-6">
          {isImpersonating && (
            <Card className="border-yellow-500 bg-yellow-50 dark:bg-yellow-950">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Shield className="h-4 w-4 text-yellow-600" />
                    <span className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                      You are currently impersonating a user
                    </span>
                  </div>
                  <Button
                    onClick={handleStopImpersonating}
                    variant="outline"
                    size="sm"
                    className="text-yellow-800 dark:text-yellow-200 border-yellow-300"
                  >
                    Stop Impersonating
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Users</h1>
              <p className="text-muted-foreground">
                Manage user accounts and permissions
              </p>
            </div>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" /> Add User
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New User</DialogTitle>
                  <DialogDescription>
                    Fill in the details to create a new user.
                  </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(async (values) => {
                      setAddUserLoading(true);
                      setAddUserError(null);
                      try {
                        const newUser = await authClient.admin.createUser({
                          name: values.name,
                          email: values.email,
                          password: values.password,
                          role: values.role as "user" | "admin",
                          data: {
                            institution: values.institution,
                            gradeLevel: values.gradeLevel,
                            username: values.username,
                          },
                        });
                        setUsers((prev) => [
                          newUser as unknown as User,
                          ...prev,
                        ]);
                        setOpen(false);
                        form.reset();
                      } catch (e: unknown) {
                        const error = e as Error;
                        setAddUserError(error?.message || "Failed to add user");
                      } finally {
                        setAddUserLoading(false);
                      }
                    })}
                    className="space-y-4"
                  >
                    <FormField
                      name="name"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Full Name"
                              {...field}
                              required
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      name="email"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="Email"
                              {...field}
                              required
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      name="password"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              placeholder="Password"
                              {...field}
                              required
                              minLength={6}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      name="role"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Role</FormLabel>
                          <FormControl>
                            <Select
                              value={field.value}
                              onValueChange={field.onChange}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select role" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="student">Student</SelectItem>
                                <SelectItem value="admin">Admin</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      name="institution"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Institution</FormLabel>
                          <FormControl>
                            <Input placeholder="Institution" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      name="gradeLevel"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Grade</FormLabel>
                          <FormControl>
                            <Input placeholder="Grade" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      name="username"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Username</FormLabel>
                          <FormControl>
                            <Input placeholder="Username" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {addUserError && (
                      <div className="text-red-600 text-sm">{addUserError}</div>
                    )}
                    <DialogFooter>
                      <Button type="submit" disabled={addUserLoading}>
                        {addUserLoading ? "Adding..." : "Add User"}
                      </Button>
                      <DialogClose asChild>
                        <Button type="button" variant="outline">
                          Cancel
                        </Button>
                      </DialogClose>
                    </DialogFooter>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </div>

          <Card className="p-4">
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>
                View and manage all registered users
              </CardDescription>
            </CardHeader>
            <div className="flex items-center space-x-2 mb-4">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />{" "}
                <Input
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1); // Reset to first page when searching
                  }}
                  className="pl-8"
                />
              </div>
              <Select
                value={roleFilter}
                onValueChange={(v) => {
                  setRoleFilter(v as "all" | "admin" | "student");
                  setCurrentPage(1); // Reset to first page when filtering
                }}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="admin">Admins Only</SelectItem>
                  <SelectItem value="student">Students Only</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <CardContent>
              <div className="rounded-md border overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="border-r min-w-[180px] sticky left-0 z-20 bg-background">
                        User
                      </TableHead>
                      <TableHead className="border-r min-w-[240px]">
                        Email
                      </TableHead>
                      <TableHead className="border-r min-w-[80px]">
                        Role
                      </TableHead>
                      <TableHead className="border-r min-w-[80px]">
                        Status
                      </TableHead>
                      <TableHead className="border-r min-w-[150px]">
                        Username
                      </TableHead>
                      <TableHead className="border-r min-w-[200px]">
                        User ID
                      </TableHead>
                      <TableHead className="border-r min-w-[200px]">
                        Institution
                      </TableHead>
                      <TableHead className="border-r min-w-[80px]">
                        Grade
                      </TableHead>
                      <TableHead className="border-r min-w-[80px]">
                        Email Verified
                      </TableHead>
                      <TableHead className="border-r min-w-[140px]">
                        Joined
                      </TableHead>
                      <TableHead className="border-r min-w-[140px]">
                        Updated
                      </TableHead>
                      <TableHead className="border-r min-w-[160px]">
                        Enrolled Courses
                      </TableHead>
                      <TableHead className="border-r min-w-[120px]">
                        Achievements
                      </TableHead>
                      <TableHead className="text-right sticky right-0 bg-background z-10 min-w-[90px] border-l">
                        Actions
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {loading ? (
                      // Skeleton loading rows
                      Array.from({ length: 6 }).map((_, i) => (
                        <TableRow key={i}>
                          <TableCell className="border-r min-w-[180px] sticky left-0 z-20 bg-background">
                            <div className="flex items-center space-x-2">
                              <Skeleton className="h-8 w-8 rounded-full animate-pulse" />
                              <Skeleton className="h-4 w-24 rounded animate-pulse" />
                            </div>
                          </TableCell>
                          <TableCell className="border-r min-w-[200px]">
                            <Skeleton className="h-4 w-32 rounded animate-pulse" />
                          </TableCell>
                          <TableCell className="border-r min-w-[150px]">
                            <Skeleton className="h-4 w-20 rounded animate-pulse" />
                          </TableCell>
                          <TableCell className="border-r min-w-[240px]">
                            <Skeleton className="h-4 w-32 rounded animate-pulse" />
                          </TableCell>
                          <TableCell className="border-r min-w-[200px]">
                            <Skeleton className="h-4 w-24 rounded animate-pulse" />
                          </TableCell>
                          <TableCell className="border-r min-w-[80px]">
                            <Skeleton className="h-4 w-10 rounded animate-pulse" />
                          </TableCell>
                          <TableCell className="border-r min-w-[80px]">
                            <Skeleton className="h-4 w-10 rounded animate-pulse" />
                          </TableCell>
                          <TableCell className="border-r min-w-[80px]">
                            <Skeleton className="h-4 w-10 rounded animate-pulse" />
                          </TableCell>
                          <TableCell className="border-r min-w-[80px]">
                            <Skeleton className="h-4 w-10 rounded animate-pulse" />
                          </TableCell>
                          <TableCell className="border-r min-w-[140px]">
                            <Skeleton className="h-4 w-16 rounded animate-pulse" />
                          </TableCell>
                          <TableCell className="border-r min-w-[140px]">
                            <Skeleton className="h-4 w-16 rounded animate-pulse" />
                          </TableCell>
                          <TableCell className="border-r min-w-[160px]">
                            <Skeleton className="h-4 w-20 rounded animate-pulse" />
                          </TableCell>
                          <TableCell className="border-r min-w-[120px]">
                            <Skeleton className="h-4 w-14 rounded animate-pulse" />
                          </TableCell>
                          <TableCell className="text-right sticky right-0 bg-background z-10 min-w-[90px] border-l">
                            <Skeleton className="h-8 w-8 rounded-full mx-auto animate-pulse" />
                          </TableCell>
                        </TableRow>
                      ))
                    ) : error ? (
                      <TableRow>
                        <TableCell colSpan={14} className="text-red-600">
                          {error}
                        </TableCell>
                      </TableRow>
                    ) : filteredUsers.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={14}>No users found.</TableCell>
                      </TableRow>
                    ) : (
                      filteredUsers.map((user) => (
                        // ...existing code...
                        <TableRow key={user.id}>
                          {/* User */}
                          <TableCell className="font-medium border-r max-w-[160px] truncate sticky left-0 z-10 bg-background">
                            <div className="flex items-center space-x-2">
                              <Avatar className="h-8 w-8">
                                <AvatarImage
                                  src={user.image || "/placeholder.svg"}
                                />
                                <AvatarFallback>
                                  {user.name
                                    ? user.name
                                        .split(" ")
                                        .map((n: string) => n[0])
                                        .join("")
                                    : "?"}
                                </AvatarFallback>
                              </Avatar>
                              <div className="font-medium truncate max-w-[100px]">
                                {user.name || (
                                  <span className="text-xs text-red-500">
                                    No name
                                  </span>
                                )}
                              </div>
                            </div>
                          </TableCell>
                          {/* Email */}
                          <TableCell className="border-r max-w-[240px]">
                            {user.email || (
                              <span className="text-xs text-muted-foreground">
                                -
                              </span>
                            )}
                          </TableCell>
                          {/* Role */}
                          <TableCell className="border-r max-w-[80px] truncate">
                            <Badge
                              variant={
                                user.role === "admin" ? "default" : "secondary"
                              }
                            >
                              {user.role || "student"}
                            </Badge>
                          </TableCell>
                          {/* Status */}
                          <TableCell className="border-r max-w-[80px] truncate">
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
                          {/* Username */}
                          <TableCell className="border-r max-w-[120px] truncate">
                            {user.username && user.username.length > 16 ? (
                              <Popover>
                                <PopoverTrigger asChild>
                                  <span className="cursor-pointer underline text-blue-600">
                                    {user.username.slice(0, 16)}…
                                  </span>
                                </PopoverTrigger>
                                <PopoverContent>{user.username}</PopoverContent>
                              </Popover>
                            ) : (
                              user.username || (
                                <span className="text-xs text-muted-foreground">
                                  -
                                </span>
                              )
                            )}
                          </TableCell>
                          {/* User ID */}
                          <TableCell className="border-r max-w-[200px]">
                            {user.id && user.id.length > 24 ? (
                              <Popover>
                                <PopoverTrigger asChild>
                                  <span className="cursor-pointer underline text-blue-600 font-mono text-xs">
                                    {user.id.slice(0, 24)}…
                                  </span>
                                </PopoverTrigger>
                                <PopoverContent>
                                  <div className="font-mono text-xs break-all">
                                    {user.id}
                                  </div>
                                </PopoverContent>
                              </Popover>
                            ) : (
                              <span className="font-mono text-xs">
                                {user.id || (
                                  <span className="text-xs text-muted-foreground">
                                    -
                                  </span>
                                )}
                              </span>
                            )}
                          </TableCell>
                          {/* Institution */}
                          <TableCell className="border-r max-w-[140px] truncate">
                            {user.institution &&
                            user.institution.length > 16 ? (
                              <Popover>
                                <PopoverTrigger asChild>
                                  <span className="cursor-pointer underline text-blue-600">
                                    {user.institution.slice(0, 16)}…
                                  </span>
                                </PopoverTrigger>
                                <PopoverContent>
                                  {user.institution}
                                </PopoverContent>
                              </Popover>
                            ) : (
                              user.institution || (
                                <span className="text-xs text-muted-foreground">
                                  -
                                </span>
                              )
                            )}
                          </TableCell>
                          {/* Grade */}
                          <TableCell className="border-r max-w-[80px] truncate">
                            {user.gradeLevel && user.gradeLevel.length > 10 ? (
                              <Popover>
                                <PopoverTrigger asChild>
                                  <span className="cursor-pointer underline text-blue-600">
                                    {user.gradeLevel.slice(0, 10)}…
                                  </span>
                                </PopoverTrigger>
                                <PopoverContent>
                                  {user.gradeLevel}
                                </PopoverContent>
                              </Popover>
                            ) : (
                              user.gradeLevel || (
                                <span className="text-xs text-muted-foreground">
                                  -
                                </span>
                              )
                            )}
                          </TableCell>
                          {/* Email Verified */}
                          <TableCell className="border-r max-w-[80px] truncate">
                            <div className="flex items-center justify-center">
                              {user.emailVerified ? (
                                <VerifiedUserIcon fontSize="small" className="text-green-600" />
                              ) : (
                                <GppMaybeIcon fontSize="small" className="text-red-600" />
                              )}
                            </div>
                          </TableCell>
                          {/* Joined */}
                          <TableCell className="border-r max-w-[140px] truncate">
                            {user.createdAt ? (
                              new Date(user.createdAt).toLocaleString()
                            ) : (
                              <span className="text-xs text-muted-foreground">
                                -
                              </span>
                            )}
                          </TableCell>
                          {/* Updated */}
                          <TableCell className="border-r max-w-[140px] truncate">
                            {user.updatedAt ? (
                              new Date(user.updatedAt).toLocaleString()
                            ) : (
                              <span className="text-xs text-muted-foreground">
                                -
                              </span>
                            )}
                          </TableCell>
                          {/* Enrolled Courses */}
                          <TableCell className="border-r max-w-[160px] truncate">
                            {user.enrolledCourses &&
                            user.enrolledCourses.length > 16 ? (
                              <Popover>
                                <PopoverTrigger asChild>
                                  <span className="cursor-pointer underline text-blue-600">
                                    {user.enrolledCourses.slice(0, 16)}…
                                  </span>
                                </PopoverTrigger>
                                <PopoverContent>
                                  {user.enrolledCourses}
                                </PopoverContent>
                              </Popover>
                            ) : (
                              user.enrolledCourses || (
                                <span className="text-xs text-muted-foreground">
                                  -
                                </span>
                              )
                            )}
                          </TableCell>
                          {/* Achievements */}
                          <TableCell className="border-r max-w-[120px] truncate">
                            {user.achievements &&
                            user.achievements.length > 12 ? (
                              <Popover>
                                <PopoverTrigger asChild>
                                  <span className="cursor-pointer underline text-blue-600">
                                    {user.achievements.slice(0, 12)}…
                                  </span>
                                </PopoverTrigger>
                                <PopoverContent>
                                  {user.achievements}
                                </PopoverContent>
                              </Popover>
                            ) : (
                              user.achievements || (
                                <span className="text-xs text-muted-foreground">
                                  -
                                </span>
                              )
                            )}
                          </TableCell>
                          {/* Actions */}
                          <TableCell className="text-right sticky right-0 bg-background z-10 min-w-[120px] border-l">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                  <span className="sr-only">Open menu</span>
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem
                                  onClick={() => setViewDetails(user)}
                                >
                                  View Details
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={async () => {
                                    setSessionsDialog({
                                      open: true,
                                      user,
                                      sessions: [],
                                    });
                                    setSessionsLoading(true);
                                    try {
                                      const res =
                                        await authClient.admin.listUserSessions(
                                          { userId: user.id }
                                        );
                                      const sessions = Array.isArray(
                                        res?.data?.sessions
                                      )
                                        ? res.data.sessions
                                        : Array.isArray(res)
                                        ? res
                                        : [];
                                      setSessionsDialog({
                                        open: true,
                                        user,
                                        sessions,
                                      });
                                    } catch {
                                      setSessionsDialog({
                                        open: true,
                                        user,
                                        sessions: [],
                                      });
                                    } finally {
                                      setSessionsLoading(false);
                                    }
                                  }}
                                >
                                  View Sessions
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                  onClick={() =>
                                    handleChangeRole(
                                      user.id,
                                      user.role === "admin"
                                        ? "student"
                                        : "admin"
                                    )
                                  }
                                >
                                  <Shield className="mr-2 h-4 w-4" />
                                  {user.role === "admin"
                                    ? "Remove Admin"
                                    : "Make Admin"}
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                  onClick={() =>
                                    setImpersonateDialog({ open: true, user })
                                  }
                                  className="text-blue-600"
                                >
                                  <User className="mr-2 h-4 w-4" />
                                  Impersonate User
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                {user.banned ? (
                                  <DropdownMenuItem
                                    onClick={() => handleUnbanUser(user.id)}
                                    className="text-green-600"
                                  >
                                    <UserCheck className="mr-2 h-4 w-4" /> Unban
                                    User
                                  </DropdownMenuItem>
                                ) : (
                                  <DropdownMenuItem
                                    onClick={() =>
                                      setBanDialog({ open: true, user })
                                    }
                                    className="text-red-600"
                                  >
                                    <UserX className="mr-2 h-4 w-4" /> Ban User
                                  </DropdownMenuItem>
                                )}
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                  onClick={() =>
                                    setDeleteDialog({ open: true, user })
                                  }
                                  className="text-red-600"
                                >
                                  <Trash2 className="mr-2 h-4 w-4" /> Delete
                                  User
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between px-2 py-4">
                  <div className="text-sm text-muted-foreground">
                    Showing{" "}
                    {Math.min((currentPage - 1) * pageSize + 1, totalUsers)} to{" "}
                    {Math.min(currentPage * pageSize, totalUsers)} of{" "}
                    {totalUsers} users
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
                        { length: Math.min(5, totalPages) },
                        (_, i) => {
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

                      {totalPages > 5 && currentPage < totalPages - 2 && (
                        <PaginationItem>
                          <PaginationEllipsis />
                        </PaginationItem>
                      )}

                      <PaginationItem>
                        <PaginationNext
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            if (currentPage < totalPages) {
                              setCurrentPage(currentPage + 1);
                            }
                          }}
                          className={
                            currentPage >= totalPages
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

          {/* Ban User Dialog */}
          <Dialog
            open={banDialog.open}
            onOpenChange={(open) =>
              setBanDialog({ open, user: open ? banDialog.user : null })
            }
          >
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Ban User</DialogTitle>
                <DialogDescription>
                  Optionally provide a reason and duration for the ban.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-2">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Reason
                  </label>
                  <Input
                    value={banReason}
                    onChange={(e) => setBanReason(e.target.value)}
                    placeholder="Reason (optional)"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Ban Duration (hours, optional)
                  </label>
                  <Input
                    value={banDuration}
                    onChange={(e) =>
                      setBanDuration(e.target.value.replace(/[^0-9]/g, ""))
                    }
                    placeholder="e.g. 24 for 1 day"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  onClick={() =>
                    banDialog.user &&
                    handleBanUser(banDialog.user.id, banReason, banDuration)
                  }
                  disabled={banLoading}
                >
                  {banLoading ? "Banning..." : "Ban User"}
                </Button>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* View Details Dialog */}
          <Dialog
            open={!!viewDetails}
            onOpenChange={(open) => setViewDetails(open ? viewDetails : null)}
          >
            <DialogContent>
              <DialogHeader>
                <DialogTitle>User Details</DialogTitle>
              </DialogHeader>
              {viewDetails && (
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="font-semibold">Name:</span>{" "}
                    {viewDetails.name || (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </div>
                  <div>
                    <span className="font-semibold">Username:</span>{" "}
                    {viewDetails.username || (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </div>
                  <div>
                    <span className="font-semibold">Email:</span>{" "}
                    {viewDetails.email || (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </div>
                  <div>
                    <span className="font-semibold">Institution:</span>{" "}
                    {viewDetails.institution || (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </div>
                  <div>
                    <span className="font-semibold">Grade:</span>{" "}
                    {viewDetails.gradeLevel || (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </div>
                  <div>
                    <span className="font-semibold">Role:</span>{" "}
                    {viewDetails.role || (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </div>
                  <div>
                    <span className="font-semibold">Status:</span>{" "}
                    {viewDetails.banned ? (
                      <span className="text-red-600 font-bold">Banned</span>
                    ) : (
                      <span className="text-green-600">Active</span>
                    )}
                  </div>
                  <div>
                    <span className="font-semibold">Email Verified:</span>{" "}
                    {viewDetails.emailVerified ? "Yes" : "No"}
                  </div>
                  <div>
                    <span className="font-semibold">Joined:</span>{" "}
                    {viewDetails.createdAt
                      ? new Date(viewDetails.createdAt).toLocaleString()
                      : "-"}
                  </div>
                  <div>
                    <span className="font-semibold">Updated:</span>{" "}
                    {viewDetails.updatedAt
                      ? new Date(viewDetails.updatedAt).toLocaleString()
                      : "-"}
                  </div>
                  <div>
                    <span className="font-semibold">Enrolled Courses:</span>{" "}
                    {viewDetails.enrolledCourses || (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </div>
                  <div>
                    <span className="font-semibold">Achievements:</span>{" "}
                    {viewDetails.achievements || (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </div>
                  {viewDetails.banned && viewDetails.banReason && (
                    <div>
                      <span className="font-semibold">Ban Reason:</span>{" "}
                      {viewDetails.banReason}
                    </div>
                  )}
                </div>
              )}
            </DialogContent>
          </Dialog>

          {/* Sessions Dialog */}
          <Dialog
            open={sessionsDialog.open}
            onOpenChange={(open) =>
              setSessionsDialog({ ...sessionsDialog, open })
            }
          >
            <DialogContent>
              <DialogHeader>
                <DialogTitle>User Sessions</DialogTitle>
              </DialogHeader>
              {sessionsLoading ? (
                <div>Loading sessions…</div>
              ) : (
                <div className="space-y-2 text-xs max-h-96 overflow-y-auto">
                  {sessionsDialog.sessions.length === 0 ? (
                    <div>No sessions found.</div>
                  ) : (
                    sessionsDialog.sessions.map((s, i) => (
                      <div key={s.id || i} className="border rounded p-2 mb-2">
                        <div>
                          <span className="font-semibold">Session ID:</span>{" "}
                          {s.id}
                        </div>
                        <div>
                          <span className="font-semibold">Created:</span>{" "}
                          {s.createdAt
                            ? new Date(s.createdAt).toLocaleString()
                            : "-"}
                        </div>
                        <div>
                          <span className="font-semibold">Expires:</span>{" "}
                          {s.expiresAt
                            ? new Date(s.expiresAt).toLocaleString()
                            : "-"}
                        </div>
                        <div>
                          <span className="font-semibold">IP:</span>{" "}
                          {s.ipAddress || "-"}
                        </div>
                        <div>
                          <span className="font-semibold">User Agent:</span>{" "}
                          {s.userAgent || "-"}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </DialogContent>
          </Dialog>

          {/* Delete User Dialog */}
          <Dialog
            open={deleteDialog.open}
            onOpenChange={(open) =>
              setDeleteDialog({ open, user: open ? deleteDialog.user : null })
            }
          >
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Delete User</DialogTitle>
                <DialogDescription>
                  Are you sure you want to permanently delete this user? This
                  action cannot be undone.
                </DialogDescription>
              </DialogHeader>
              {deleteDialog.user && (
                <div className="p-4 bg-red-50 dark:bg-red-950/20 rounded-lg border border-red-200 dark:border-red-800">
                  <div className="flex items-center space-x-2 mb-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={deleteDialog.user.image || "/placeholder.svg"}
                      />
                      <AvatarFallback>
                        {deleteDialog.user.name
                          ? deleteDialog.user.name
                              .split(" ")
                              .map((n: string) => n[0])
                              .join("")
                          : "?"}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">
                        {deleteDialog.user.name || "Unknown User"}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {deleteDialog.user.email}
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <DialogFooter>
                <Button
                  onClick={() =>
                    deleteDialog.user && handleDeleteUser(deleteDialog.user.id)
                  }
                  disabled={deleteLoading}
                  variant="destructive"
                >
                  {deleteLoading ? "Deleting..." : "Delete User"}
                </Button>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Impersonate User Dialog */}
          <Dialog
            open={impersonateDialog.open}
            onOpenChange={(open) =>
              setImpersonateDialog({
                open,
                user: open ? impersonateDialog.user : null,
              })
            }
          >
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Impersonate User</DialogTitle>
                <DialogDescription>
                  You will start a session as this user. You can stop
                  impersonating at any time.
                </DialogDescription>
              </DialogHeader>
              {impersonateDialog.user && (
                <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
                  <div className="flex items-center space-x-2 mb-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={impersonateDialog.user.image || "/placeholder.svg"}
                      />
                      <AvatarFallback>
                        {impersonateDialog.user.name
                          ? impersonateDialog.user.name
                              .split(" ")
                              .map((n: string) => n[0])
                              .join("")
                          : "?"}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">
                        {impersonateDialog.user.name || "Unknown User"}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {impersonateDialog.user.email}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Role: {impersonateDialog.user.role || "student"}
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <DialogFooter>
                <Button
                  onClick={() =>
                    impersonateDialog.user &&
                    handleImpersonateUser(impersonateDialog.user.id)
                  }
                  disabled={impersonateLoading}
                >
                  {impersonateLoading ? "Starting..." : "Start Impersonating"}
                </Button>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </main>
    </>
  );
}
