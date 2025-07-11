"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
import { formatDistanceToNow } from "date-fns";
import NotificationsIcon from "@mui/icons-material/Notifications";
import VisibilityIcon from "@mui/icons-material/Visibility";
import MarkChatReadIcon from "@mui/icons-material/MarkChatRead";
import SettingsIcon from "@mui/icons-material/Settings";
interface Notification {
  id: string;
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "error" | "achievement" | "system";
  category: string;
  priority: "low" | "medium" | "high" | "urgent";
  isRead: boolean;
  actionUrl?: string;
  actionLabel?: string;
  createdAt: Date;
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

export function NotificationDropdown() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  // Fetch notifications from API
  const fetchNotifications = async () => {
    try {
      const response = await fetch("/api/notifications?limit=5");
      if (!response.ok) {
        throw new Error("Failed to fetch notifications");
      }
      const data = await response.json();
      setNotifications(
        data.notifications.map((n: Notification) => ({
          ...n,
          createdAt: new Date(n.createdAt),
        }))
      );
      setUnreadCount(data.unreadCount);
    } catch (error) {
      console.error("Error fetching notifications:", error);
      // Fallback to empty state
      setNotifications([]);
      setUnreadCount(0);
    }
  };

  useEffect(() => {
    let isMounted = true;
    // Initial fetch
    fetchNotifications();

    // Set up interval to refresh every 15 seconds
    const interval = setInterval(() => {
      // Only fetch if still mounted (user not signed out)
      if (isMounted) fetchNotifications();
    }, 15000);

    // Cleanup interval on component unmount or signout
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  const handleNotificationClick = async (notification: Notification) => {
    // Mark as read in database
    if (!notification.isRead) {
      try {
        await fetch(`/api/notifications/${notification.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ isRead: true }),
        });

        // Update local state
        setNotifications((prev) =>
          prev.map((n) =>
            n.id === notification.id ? { ...n, isRead: true } : n
          )
        );
        setUnreadCount((prev) => prev - 1);
      } catch (error) {
        console.error("Error marking notification as read:", error);
      }
    }

    // Always navigate to the notifications page with the notification id
    router.push(`/admin/notifications?id=${notification.id}`);
    setIsOpen(false);
  };

  const markAllAsRead = async () => {
    const unreadIds = notifications.filter((n) => !n.isRead).map((n) => n.id);

    if (unreadIds.length === 0) return;

    try {
      await fetch("/api/notifications/bulk", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          notificationIds: unreadIds,
          action: "read",
        }),
      });

      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
      setUnreadCount(0);
    } catch (error) {
      console.error("Error marking all notifications as read:", error);
    }
  };

  const viewAllNotifications = () => {
    router.push("/admin/notifications");
    setIsOpen(false);
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-full relative">
          <NotificationsIcon fontSize="small" />
          {unreadCount > 0 && (
            <span className="absolute -top-2 -right-2 h-3 w-3 bg-blue-500 rounded-full border-2 border-background" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80 max-w-sm" align="end" sideOffset={5}>
        <div className="flex items-center justify-between px-4 py-2">
          <DropdownMenuLabel className="text-base font-semibold">
            Notifications
          </DropdownMenuLabel>
          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <Button
                variant="link"
                size="icon"
                onClick={markAllAsRead}
                className="h-fit text-xs"
              >
                <MarkChatReadIcon fontSize="small" className="mr-1" />
              </Button>
            )}
            <Button
              variant="link"
              size="icon"
              onClick={viewAllNotifications}
              className="h-6 w-6"
            >
              <SettingsIcon fontSize="small" />
            </Button>
          </div>
        </div>
        <Separator />

        <ScrollArea className="h-96">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
              <NotificationsIcon fontSize="small" className="mb-2 opacity-50" />
              <p className="text-sm">No notifications</p>
            </div>
          ) : (
            <div className="space-y-1">
              {notifications.slice(0, 5).map((notification) => (
                <div
                  key={notification.id}
                  className={`px-4 py-3 cursor-pointer hover:bg-muted/50 transition-colors ${
                    !notification.isRead ? "bg-muted/30" : ""
                  }`}
                  onClick={() => handleNotificationClick(notification)}
                >
                  <div className="flex items-start gap-3">
                    <div className="text-lg mt-0.5">
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
                        <Badge
                          variant="secondary"
                          className={`text-xs ${
                            notification.priority === "urgent"
                              ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                              : notification.priority === "high"
                              ? "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200"
                              : ""
                          }`}
                        >
                          {notification.category}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>

        <Separator />
        <div className="p-2">
          <Button
            variant="ghost"
            className="w-full justify-center text-sm"
            onClick={viewAllNotifications}
          >
            <VisibilityIcon fontSize="small" className="mr-2" />
            View all notifications
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
