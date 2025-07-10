"use client";
import React, { useState, useEffect } from "react";
import {
  Bell,
  Search,
  Trash2,
  Archive,
  Star,
  Eye,
  EyeOff,
  Settings,
  ChevronDown,
  X,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import { useRouter, useSearchParams } from "next/navigation";
import { formatDistanceToNow, format } from "date-fns";

interface Notification {
  id: string;
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "error" | "achievement" | "system";
  category: string;
  priority: "low" | "medium" | "high" | "urgent";
  isRead: boolean;
  readAt?: Date;
  actionUrl?: string;
  actionLabel?: string;
  metadata?: string;
  createdAt: Date;
  isStarred?: boolean;
  isArchived?: boolean;
}

const getNotificationIcon = (type: string) => {
  switch (type) {
    case "success":
      return "🎉";
    case "warning":
      return "⚠️";
    case "error":
      return "❌";
    case "achievement":
      return "🏆";
    case "system":
      return "⚙️";
    default:
      return "💡";
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "urgent":
      return "border-l-red-500 bg-red-50 dark:bg-red-950/30";
    case "high":
      return "border-l-orange-500 bg-orange-50 dark:bg-orange-950/30";
    case "medium":
      return "border-l-blue-500 bg-blue-50 dark:bg-blue-950/30";
    case "low":
      return "border-l-gray-500 bg-gray-50 dark:bg-gray-950/30";
    default:
      return "border-l-blue-500 bg-blue-50 dark:bg-blue-950/30";
  }
};

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [selectedNotifications, setSelectedNotifications] = useState<
    Set<string>
  >(new Set());
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [selectedNotification, setSelectedNotification] =
    useState<Notification | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  // Fetch notifications from API with polling for dynamic updates
  useEffect(() => {
    let isMounted = true;

    const fetchNotifications = async () => {
      try {
        const params = new URLSearchParams({
          page: "1",
          limit: "50",
          ...(filterType !== "all" && { type: filterType }),
          ...(filterStatus !== "all" && {
            isRead:
              filterStatus === "read"
                ? "true"
                : filterStatus === "unread"
                ? "false"
                : undefined,
          }),
          ...(searchQuery && { search: searchQuery }),
        });

        const response = await fetch(`/api/notifications?${params}`);
        if (!response.ok) {
          throw new Error("Failed to fetch notifications");
        }

        type ApiNotification = Omit<Notification, "createdAt" | "readAt"> & {
          createdAt: string;
          readAt?: string;
        };

        const data: { notifications: ApiNotification[] } =
          await response.json();
        const formattedNotifications: Notification[] = data.notifications.map(
          (n) => ({
            ...n,
            createdAt: new Date(n.createdAt),
            readAt: n.readAt ? new Date(n.readAt) : undefined,
          })
        );

        if (isMounted) {
          setNotifications(formattedNotifications);

          // Check if there's a specific notification to show
          const notificationId = searchParams.get("id");
          if (notificationId) {
            const notification = formattedNotifications.find(
              (n) => n.id === notificationId
            );
            if (notification) {
              setSelectedNotification(notification);
              // Mark as read if not already
              if (!notification.isRead) {
                await markAsRead([notificationId]);
              }
            }
          }
        }
      } catch (error) {
        if (isMounted) {
          console.error("Error fetching notifications:", error);
          setNotifications([]);
        }
      }
    };

    fetchNotifications();
    const intervalId = setInterval(fetchNotifications, 15000); // Poll every 15 seconds

    return () => {
      isMounted = false;
      clearInterval(intervalId);
    };
  }, [filterType, filterStatus, searchQuery, searchParams]);

  const filteredNotifications = notifications.filter((notification) => {
    const matchesSearch =
      notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notification.message.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesType =
      filterType === "all" || notification.type === filterType;
    const matchesStatus =
      filterStatus === "all" ||
      (filterStatus === "unread" && !notification.isRead) ||
      (filterStatus === "read" && notification.isRead) ||
      (filterStatus === "starred" && notification.isStarred) ||
      (filterStatus === "archived" && notification.isArchived);

    return (
      matchesSearch && matchesType && matchesStatus && !notification.isArchived
    );
  });

  const handleNotificationClick = async (notification: Notification) => {
    setSelectedNotification(notification);

    // Mark as read in database
    if (!notification.isRead) {
      await markAsRead([notification.id]);
    }

    // Update URL
    const url = new URL(window.location.href);
    url.searchParams.set("id", notification.id);
    window.history.pushState(null, "", url.toString());
  };

  const markAsRead = async (notificationIds: string[]) => {
    try {
      await fetch("/api/notifications/bulk", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          notificationIds,
          action: "read",
        }),
      });

      setNotifications((prev) =>
        prev.map((n) =>
          notificationIds.includes(n.id)
            ? { ...n, isRead: true, readAt: new Date() }
            : n
        )
      );
    } catch (error) {
      console.error("Error marking notifications as read:", error);
    }
  };

  const markAsUnread = async (notificationIds: string[]) => {
    try {
      await fetch("/api/notifications/bulk", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          notificationIds,
          action: "unread",
        }),
      });

      setNotifications((prev) =>
        prev.map((n) =>
          notificationIds.includes(n.id)
            ? { ...n, isRead: false, readAt: undefined }
            : n
        )
      );
    } catch (error) {
      console.error("Error marking notifications as unread:", error);
    }
  };

  const toggleStar = async (notificationId: string) => {
    const notification = notifications.find((n) => n.id === notificationId);
    if (!notification) return;

    try {
      await fetch(`/api/notifications/${notificationId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          isStarred: !notification.isStarred,
        }),
      });

      setNotifications((prev) =>
        prev.map((n) =>
          n.id === notificationId ? { ...n, isStarred: !n.isStarred } : n
        )
      );
    } catch (error) {
      console.error("Error toggling star:", error);
    }
  };

  const archiveNotifications = async (notificationIds: string[]) => {
    try {
      await fetch("/api/notifications/bulk", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          notificationIds,
          action: "archive",
        }),
      });

      setNotifications((prev) =>
        prev.map((n) =>
          notificationIds.includes(n.id) ? { ...n, isArchived: true } : n
        )
      );
      setSelectedNotifications(new Set());
    } catch (error) {
      console.error("Error archiving notifications:", error);
    }
  };

  const deleteNotifications = async (notificationIds: string[]) => {
    try {
      await fetch("/api/notifications/bulk", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notificationIds }),
      });

      setNotifications((prev) =>
        prev.filter((n) => !notificationIds.includes(n.id))
      );
      setSelectedNotifications(new Set());
    } catch (error) {
      console.error("Error deleting notifications:", error);
    }
  };

  const handleBulkAction = (action: string) => {
    const selectedIds = Array.from(selectedNotifications);

    switch (action) {
      case "read":
        markAsRead(selectedIds);
        break;
      case "unread":
        markAsUnread(selectedIds);
        break;
      case "archive":
        archiveNotifications(selectedIds);
        break;
      case "delete":
        deleteNotifications(selectedIds);
        break;
    }

    setSelectedNotifications(new Set());
  };

  const unreadCount = notifications.filter(
    (n) => !n.isRead && !n.isArchived
  ).length;

  return (
    <div className="flex h-full gap-4 mt-4">
      {/* Notifications List */}
      <div className="flex-1 space-y-4">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notifications
                {unreadCount > 0 && (
                  <Badge variant="destructive" className="ml-2">
                    {unreadCount} unread
                  </Badge>
                )}
              </CardTitle>
              <Button
                variant="outline"
                size="sm"
                onClick={() => router.push("/admin/notifications/settings")}
              >
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </div>

            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row gap-2 mt-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search notifications..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="info">Info</SelectItem>
                  <SelectItem value="success">Success</SelectItem>
                  <SelectItem value="warning">Warning</SelectItem>
                  <SelectItem value="error">Error</SelectItem>
                  <SelectItem value="achievement">Achievement</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="unread">Unread</SelectItem>
                  <SelectItem value="read">Read</SelectItem>
                  <SelectItem value="starred">Starred</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Bulk Actions */}
            {selectedNotifications.size > 0 && (
              <div className="flex items-center gap-2 p-2 bg-muted rounded-lg">
                <span className="text-sm text-muted-foreground">
                  {selectedNotifications.size} selected
                </span>
                <Separator orientation="vertical" className="h-4" />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleBulkAction("read")}
                >
                  <Eye className="h-4 w-4 mr-1" />
                  Mark Read
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleBulkAction("unread")}
                >
                  <EyeOff className="h-4 w-4 mr-1" />
                  Mark Unread
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleBulkAction("archive")}
                >
                  <Archive className="h-4 w-4 mr-1" />
                  Archive
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleBulkAction("delete")}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Delete
                </Button>
              </div>
            )}
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[600px]">
              {filteredNotifications.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
                  <Bell className="h-12 w-12 mb-4 opacity-50" />
                  <p className="text-lg font-medium">No notifications found</p>
                  <p className="text-sm">
                    Try adjusting your search or filters
                  </p>
                </div>
              ) : (
                <div className="space-y-1">
                  {filteredNotifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`border-l-4 p-4 cursor-pointer hover:bg-muted/50 transition-colors ${
                        !notification.isRead ? "bg-muted/30" : ""
                      } ${getPriorityColor(notification.priority)} ${
                        selectedNotification?.id === notification.id
                          ? "bg-muted"
                          : ""
                      }`}
                      onClick={() => handleNotificationClick(notification)}
                    >
                      <div className="flex items-start gap-3">
                        <Checkbox
                          checked={selectedNotifications.has(notification.id)}
                          onCheckedChange={(checked) => {
                            const newSelected = new Set(selectedNotifications);
                            if (checked) {
                              newSelected.add(notification.id);
                            } else {
                              newSelected.delete(notification.id);
                            }
                            setSelectedNotifications(newSelected);
                          }}
                          onClick={(e) => e.stopPropagation()}
                        />
                        <div className="text-xl mt-0.5">
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="text-sm font-medium truncate">
                              {notification.title}
                            </p>
                            {!notification.isRead && (
                              <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0" />
                            )}
                            {notification.isStarred && (
                              <Star className="h-3 w-3 text-yellow-500 fill-yellow-500 flex-shrink-0" />
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                            {notification.message}
                          </p>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-muted-foreground">
                              {formatDistanceToNow(notification.createdAt, {
                                addSuffix: true,
                              })}
                            </span>
                            <div className="flex items-center gap-2">
                              <Badge variant="secondary" className="text-xs">
                                {notification.category}
                              </Badge>
                              <Badge
                                variant="outline"
                                className={`text-xs ${
                                  notification.priority === "urgent"
                                    ? "border-red-500 text-red-700"
                                    : notification.priority === "high"
                                    ? "border-orange-500 text-orange-700"
                                    : ""
                                }`}
                              >
                                {notification.priority}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleStar(notification.id);
                            }}
                            className="h-6 w-6"
                          >
                            <Star
                              className={`h-3 w-3 ${
                                notification.isStarred
                                  ? "text-yellow-500 fill-yellow-500"
                                  : "text-muted-foreground"
                              }`}
                            />
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={(e) => e.stopPropagation()}
                                className="h-6 w-6"
                              >
                                <ChevronDown className="h-3 w-3" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                onClick={() =>
                                  notification.isRead
                                    ? markAsUnread([notification.id])
                                    : markAsRead([notification.id])
                                }
                              >
                                {notification.isRead ? (
                                  <>
                                    <EyeOff className="h-4 w-4 mr-2" />
                                    Mark as unread
                                  </>
                                ) : (
                                  <>
                                    <Eye className="h-4 w-4 mr-2" />
                                    Mark as read
                                  </>
                                )}
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() =>
                                  archiveNotifications([notification.id])
                                }
                              >
                                <Archive className="h-4 w-4 mr-2" />
                                Archive
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                onClick={() =>
                                  deleteNotifications([notification.id])
                                }
                                className="text-destructive"
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      {/* Notification Detail Panel */}
      {selectedNotification && (
        <div className="w-96">
          <Card className="h-full">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <div className="text-2xl">
                    {getNotificationIcon(selectedNotification.type)}
                  </div>
                  <div>
                    <CardTitle className="text-lg">
                      {selectedNotification.title}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {format(selectedNotification.createdAt, "PPP 'at' p")}
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setSelectedNotification(null);
                    const url = new URL(window.location.href);
                    url.searchParams.delete("id");
                    window.history.pushState(null, "", url.toString());
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm leading-relaxed">
                  {selectedNotification.message}
                </p>
              </div>

              <Separator />

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Category</span>
                  <Badge variant="secondary">
                    {selectedNotification.category}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Priority</span>
                  <Badge
                    variant="outline"
                    className={
                      selectedNotification.priority === "urgent"
                        ? "border-red-500 text-red-700"
                        : selectedNotification.priority === "high"
                        ? "border-orange-500 text-orange-700"
                        : ""
                    }
                  >
                    {selectedNotification.priority}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Status</span>
                  <div className="flex items-center gap-2">
                    {selectedNotification.isRead ? (
                      <>
                        <Eye className="h-3 w-3 text-green-500" />
                        <span className="text-sm text-green-600">Read</span>
                      </>
                    ) : (
                      <>
                        <div className="w-2 h-2 bg-blue-500 rounded-full" />
                        <span className="text-sm text-blue-600">Unread</span>
                      </>
                    )}
                  </div>
                </div>
                {selectedNotification.readAt && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Read at</span>
                    <span className="text-sm text-muted-foreground">
                      {format(selectedNotification.readAt, "PPP 'at' p")}
                    </span>
                  </div>
                )}
              </div>

              <Separator />

              <div className="flex flex-col gap-2">
                {selectedNotification.actionUrl && (
                  <Button
                    onClick={() => router.push(selectedNotification.actionUrl!)}
                    className="w-full"
                  >
                    {selectedNotification.actionLabel || "Take Action"}
                  </Button>
                )}
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toggleStar(selectedNotification.id)}
                    className="flex-1"
                  >
                    <Star
                      className={`h-4 w-4 mr-2 ${
                        selectedNotification.isStarred
                          ? "text-yellow-500 fill-yellow-500"
                          : ""
                      }`}
                    />
                    {selectedNotification.isStarred ? "Unstar" : "Star"}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      archiveNotifications([selectedNotification.id])
                    }
                    className="flex-1"
                  >
                    <Archive className="h-4 w-4 mr-2" />
                    Archive
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
