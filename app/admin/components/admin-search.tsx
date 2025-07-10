"use client";

import { useState, useCallback, useEffect } from "react";

interface User {
  id: string;
  name?: string;
  email?: string;
  image?: string | null;
  role?: string;
  createdAt: string;
  updatedAt: string;
  banned?: boolean;
  banReason?: string;
  banExpires?: string;
}

interface Session {
  id: string;
  userId: string;
  ipAddress?: string;
  createdAt: string;
  expiresAt: string;
  userAgent?: string;
}
import { Search, Loader2, User, Calendar } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { authClient } from "@/utils/auth-client";

export function AdminSearch() {
  // State for search functionality
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [sessions, setSessions] = useState<Session[]>([]);

  // State for dialog
  const [selectedItem, setSelectedItem] = useState<User | Session | null>(null);
  const [showDialog, setShowDialog] = useState(false);
  const [selectedType, setSelectedType] = useState<"user" | "session">("user");

  // Function to fetch search results
  const fetchSearchResults = useCallback(async (query: string) => {
    if (!query.trim()) {
      setUsers([]);
      setSessions([]);
      return;
    }

    setLoading(true);
    try {
      // Fetch users with search term in name
      const usersResponse = await authClient.admin.listUsers({
        query: {
          searchValue: query,
          searchField: "name",
          searchOperator: "contains",
        },
      });

      // Get another set of users searching by email
      const emailUsersResponse = await authClient.admin.listUsers({
        query: {
          searchValue: query,
          searchField: "email",
          searchOperator: "contains",
        },
      });

      // Extract users from responses
      const nameUsers = usersResponse?.data?.users || [];
      const emailUsers = emailUsersResponse?.data?.users || [];

      // Fetch sessions for users by ID (simplified approach)
      const allSessions: Session[] = [];

      // Get sessions for users found by name
      for (const user of nameUsers) {
        try {
          const userSessions = await authClient.admin.listUserSessions({
            userId: user.id,
          });
          if (userSessions?.data && Array.isArray(userSessions.data)) {
            allSessions.push(...(userSessions.data as Session[]));
          }
        } catch (err) {
          console.error("Error fetching sessions for user:", err);
        }
      }

      // Get sessions for users found by email (if not already included)
      for (const user of emailUsers) {
        // Skip if we already fetched sessions for this user
        if (nameUsers.some((u) => u.id === user.id)) continue;

        try {
          const userSessions = await authClient.admin.listUserSessions({
            userId: user.id,
          });
          if (userSessions?.data && Array.isArray(userSessions.data)) {
            allSessions.push(...(userSessions.data as Session[]));
          }
        } catch (err) {
          console.error("Error fetching sessions for user:", err);
        }
      }

      // Also try to directly search sessions if query might be a session id
      if (query.length >= 4) {
        try {
          // Get all active sessions and filter them
          const allActiveUsers = await authClient.admin.listUsers({
            query: { limit: 20 },
          });

          if (allActiveUsers?.data?.users) {
            for (const activeUser of allActiveUsers.data.users) {
              try {
                const userAllSessions = await authClient.admin.listUserSessions(
                  {
                    userId: activeUser.id,
                  }
                );

                if (
                  userAllSessions?.data &&
                  Array.isArray(userAllSessions.data)
                ) {
                  // Filter sessions that match the query in id, IP, or userAgent
                  const matchingSessions = (
                    userAllSessions.data as Session[]
                  ).filter(
                    (session) =>
                      session.id?.toLowerCase().includes(query.toLowerCase()) ||
                      session.ipAddress
                        ?.toLowerCase()
                        .includes(query.toLowerCase()) ||
                      session.userAgent
                        ?.toLowerCase()
                        .includes(query.toLowerCase())
                  );

                  if (matchingSessions.length > 0) {
                    allSessions.push(...matchingSessions);
                  }
                }
              } catch (err) {
                console.error("Error fetching all sessions for user:", err);
              }
            }
          }
        } catch (err) {
          console.error("Error fetching active users for session search:", err);
        }
      }

      // Combine users from both searches and remove duplicates
      const combinedUsers = [...nameUsers, ...emailUsers];

      // Remove duplicate users by ID
      const uniqueUsers = combinedUsers.filter(
        (user, index, self) => index === self.findIndex((u) => u.id === user.id)
      );

      // Map to User[] with string dates and image fallback
      setUsers(
        uniqueUsers.map((user) => ({
          ...user,
          createdAt: user.createdAt?.toString?.() ?? "",
          updatedAt: user.updatedAt?.toString?.() ?? "",
          image: user.image ?? undefined,
          banned: user.banned === null ? undefined : user.banned,
          banReason: user.banReason === null ? undefined : user.banReason,
          banExpires:
            user.banExpires === null
              ? undefined
              : user.banExpires?.toString?.() ?? undefined,
        }))
      );
      setSessions(allSessions);
    } catch (error) {
      console.error("Error fetching search results:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Handle search change with debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      if (search) {
        fetchSearchResults(search);
      } else {
        setUsers([]);
        setSessions([]);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [search, fetchSearchResults]);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      // Close dropdown if click is outside search area
      if (!target.closest(".admin-search-container") && open) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  // Handle escape key to close dropdown
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && open) {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscKey);
    return () => {
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [open]);

  // Handle showing details dialog
  const showDetails = (item: User | Session, type: "user" | "session") => {
    setSelectedItem(item);
    setSelectedType(type);
    setShowDialog(true);
    // Close the dropdown when showing details
    setOpen(false);
  };

  // Type guards for rendering
  function isUser(item: User | Session | null): item is User {
    return !!item && "email" in item;
  }
  function isSession(item: User | Session | null): item is Session {
    return !!item && "userId" in item;
  }

  // Format date for display
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <>
      <div className="relative flex-1 max-w-md admin-search-container">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search users, sessions..."
          className="pl-8"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onFocus={() => setOpen(true)}
        />
        {open && (
          <div className="absolute mt-1 w-full bg-background border rounded-md shadow-lg z-50 max-h-80 overflow-y-auto">
            {loading && (
              <div className="flex items-center justify-center p-4">
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
              </div>
            )}

            {!loading &&
              search !== "" &&
              users.length === 0 &&
              sessions.length === 0 && (
                <div className="p-2 text-sm text-muted-foreground text-center">
                  No results found.
                </div>
              )}

            {users.length > 0 && (
              <div className="py-1">
                <div className="px-2 py-1.5 text-xs font-medium text-muted-foreground">
                  Users
                </div>
                {users.map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center px-2 py-1.5 hover:bg-accent cursor-pointer"
                    onClick={() => showDetails(user, "user")}
                  >
                    <Avatar className="h-6 w-6 mr-2">
                      <AvatarImage src={user.image ?? undefined} />
                      <AvatarFallback>
                        {user.name?.charAt(0) || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 overflow-hidden">
                      <p className="truncate text-sm">{user.name}</p>
                      <p className="text-xs text-muted-foreground truncate">
                        {user.email}
                      </p>
                    </div>
                    <User className="ml-2 h-4 w-4 text-muted-foreground" />
                  </div>
                ))}
              </div>
            )}

            {sessions.length > 0 && (
              <div className="py-1">
                <div className="px-2 py-1.5 text-xs font-medium text-muted-foreground">
                  Sessions
                </div>
                {sessions.map((session) => (
                  <div
                    key={session.id}
                    className="flex items-center px-2 py-1.5 hover:bg-accent cursor-pointer"
                    onClick={() => showDetails(session, "session")}
                  >
                    <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                    <div className="flex-1 overflow-hidden">
                      <p className="truncate text-sm">
                        Session {session.id.substring(0, 8)}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {formatDate(session.createdAt)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Details dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {selectedType === "user" ? "User Details" : "Session Details"}
            </DialogTitle>
            <DialogDescription>
              {selectedType === "user" && isUser(selectedItem)
                ? `User information for ${selectedItem.name || "Unknown User"}`
                : selectedType === "session" && isSession(selectedItem)
                ? `Session details for ID ${
                    selectedItem.id?.substring(0, 8) || "Unknown"
                  }`
                : null}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            {selectedType === "user" && isUser(selectedItem) && (
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={selectedItem.image ?? undefined} />
                    <AvatarFallback>
                      {selectedItem.name?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{selectedItem.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {selectedItem.email}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">User ID</p>
                    <p className="text-xs text-muted-foreground break-all">
                      {selectedItem.id}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Role</p>
                    <p className="text-xs text-muted-foreground">
                      {selectedItem.role || "N/A"}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Created</p>
                    <p className="text-xs text-muted-foreground">
                      {formatDate(selectedItem.createdAt)}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Last Updated</p>
                    <p className="text-xs text-muted-foreground">
                      {formatDate(selectedItem.updatedAt)}
                    </p>
                  </div>
                  <div className="space-y-1 col-span-2">
                    <p className="text-sm font-medium">Status</p>
                    <p className="text-xs text-muted-foreground">
                      {selectedItem.banned ? "Banned" : "Active"}
                      {selectedItem.banned &&
                        selectedItem.banReason &&
                        ` - ${selectedItem.banReason}`}
                      {selectedItem.banned &&
                        selectedItem.banExpires &&
                        ` until ${formatDate(selectedItem.banExpires)}`}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {selectedType === "session" && isSession(selectedItem) && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Session ID</p>
                    <p className="text-xs text-muted-foreground break-all">
                      {selectedItem.id}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">User ID</p>
                    <p className="text-xs text-muted-foreground break-all">
                      {selectedItem.userId}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">IP Address</p>
                    <p className="text-xs text-muted-foreground">
                      {selectedItem.ipAddress || "N/A"}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Created</p>
                    <p className="text-xs text-muted-foreground">
                      {formatDate(selectedItem.createdAt)}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Expires</p>
                    <p className="text-xs text-muted-foreground">
                      {formatDate(selectedItem.expiresAt)}
                    </p>
                  </div>
                  <div className="space-y-1 col-span-2">
                    <p className="text-sm font-medium">User Agent</p>
                    <p className="text-xs text-muted-foreground break-all">
                      {selectedItem.userAgent || "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
