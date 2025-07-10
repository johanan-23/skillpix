"use client";
import React, { useState } from "react";
import {
  Bell,
  Mail,
  Smartphone,
  Shield,
  Save,
  ArrowLeft,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface NotificationPreferences {
  emailNotifications: boolean;
  pushNotifications: boolean;
  courseUpdates: boolean;
  achievementAlerts: boolean;
  adminMessages: boolean;
  securityAlerts: boolean;
  marketingEmails: boolean;
  weeklyDigest: boolean;
}

export default function NotificationSettingsPage() {
  const [preferences, setPreferences] = useState<NotificationPreferences>({
    emailNotifications: true,
    pushNotifications: true,
    courseUpdates: true,
    achievementAlerts: true,
    adminMessages: true,
    securityAlerts: true,
    marketingEmails: false,
    weeklyDigest: true,
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handlePreferenceChange = (
    key: keyof NotificationPreferences,
    value: boolean
  ) => {
    setPreferences((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSave = async () => {
    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast.success("Settings saved", {
      description:
        "Your notification preferences have been updated successfully.",
    });

    setIsLoading(false);
  };

  const notificationTypes = [
    {
      key: "courseUpdates" as keyof NotificationPreferences,
      title: "Course Updates",
      description:
        "Notifications about new courses, assignments, and deadlines",
      icon: "📚",
      category: "Learning",
    },
    {
      key: "achievementAlerts" as keyof NotificationPreferences,
      title: "Achievement Alerts",
      description:
        "Notifications when you or your students unlock achievements",
      icon: "🏆",
      category: "Learning",
    },
    {
      key: "adminMessages" as keyof NotificationPreferences,
      title: "Admin Messages",
      description: "Important announcements and administrative updates",
      icon: "📋",
      category: "Administrative",
    },
    {
      key: "securityAlerts" as keyof NotificationPreferences,
      title: "Security Alerts",
      description: "Login attempts, security updates, and account changes",
      icon: "🔒",
      category: "Security",
      required: true,
    },
    {
      key: "marketingEmails" as keyof NotificationPreferences,
      title: "Marketing Emails",
      description:
        "Product updates, feature announcements, and promotional content",
      icon: "📧",
      category: "Marketing",
    },
    {
      key: "weeklyDigest" as keyof NotificationPreferences,
      title: "Weekly Digest",
      description: "Summary of platform activity and your weekly progress",
      icon: "📊",
      category: "Summary",
    },
  ];

  const deliveryMethods = [
    {
      key: "emailNotifications" as keyof NotificationPreferences,
      title: "Email Notifications",
      description: "Receive notifications via email",
      icon: <Mail className="h-5 w-5" />,
    },
    {
      key: "pushNotifications" as keyof NotificationPreferences,
      title: "Push Notifications",
      description: "Receive browser and mobile push notifications",
      icon: <Smartphone className="h-5 w-5" />,
    },
  ];

  const groupedNotifications = notificationTypes.reduce((acc, notification) => {
    if (!acc[notification.category]) {
      acc[notification.category] = [];
    }
    acc[notification.category].push(notification);
    return acc;
  }, {} as Record<string, typeof notificationTypes>);

  return (
    <div className="space-y-6 max-w-6xl mt-4 ml-4">
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => router.back()}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
      </div>

      {/* Delivery Methods */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Delivery Methods
          </CardTitle>
          <CardDescription>
            Choose how you want to receive notifications
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {deliveryMethods.map((method) => (
            <div
              key={method.key}
              className="flex items-center justify-between p-4 border rounded-lg"
            >
              <div className="flex items-center gap-3">
                {method.icon}
                <div>
                  <Label htmlFor={method.key} className="text-sm font-medium">
                    {method.title}
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    {method.description}
                  </p>
                </div>
              </div>
              <Switch
                id={method.key}
                checked={preferences[method.key]}
                onCheckedChange={(checked) =>
                  handlePreferenceChange(method.key, checked)
                }
              />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Notification Types */}
      <Card>
        <CardHeader>
          <CardTitle>Notification Types</CardTitle>
          <CardDescription>
            Control which types of notifications you receive
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {Object.entries(groupedNotifications).map(
            ([category, notifications]) => (
              <div key={category} className="space-y-4">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-semibold">{category}</h3>
                  {category === "Security" && (
                    <Badge
                      variant="secondary"
                      className="flex items-center gap-1"
                    >
                      <Shield className="h-3 w-3" />
                      Required
                    </Badge>
                  )}
                </div>
                <div className="space-y-3">
                  {notifications.map((notification) => (
                    <div
                      key={notification.key}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-lg">{notification.icon}</span>
                        <div className="flex-1">
                          <Label
                            htmlFor={notification.key}
                            className="text-sm font-medium"
                          >
                            {notification.title}
                            {notification.required && (
                              <Badge variant="outline" className="ml-2 text-xs">
                                Required
                              </Badge>
                            )}
                          </Label>
                          <p className="text-xs text-muted-foreground mt-1">
                            {notification.description}
                          </p>
                        </div>
                      </div>
                      <Switch
                        id={notification.key}
                        checked={preferences[notification.key]}
                        onCheckedChange={(checked) =>
                          handlePreferenceChange(notification.key, checked)
                        }
                        disabled={notification.required}
                      />
                    </div>
                  ))}
                </div>
                {category !== "Summary" && <Separator />}
              </div>
            )
          )}
        </CardContent>
      </Card>

      {/* Notification Schedule */}
      <Card>
        <CardHeader>
          <CardTitle>Notification Schedule</CardTitle>
          <CardDescription>
            Configure when you want to receive notifications
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 border rounded-lg bg-muted/50">
            <div className="flex items-center justify-between mb-2">
              <Label className="text-sm font-medium">Quiet Hours</Label>
              <Switch defaultChecked />
            </div>
            <p className="text-xs text-muted-foreground mb-3">
              Reduce notifications during specified hours
            </p>
            <div className="flex items-center gap-4 text-sm">
              <div>
                <Label className="text-xs text-muted-foreground">From</Label>
                <p className="font-medium">10:00 PM</p>
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">To</Label>
                <p className="font-medium">7:00 AM</p>
              </div>
            </div>
          </div>

          <div className="p-4 border rounded-lg bg-muted/50">
            <div className="flex items-center justify-between mb-2">
              <Label className="text-sm font-medium">
                Weekend Notifications
              </Label>
              <Switch defaultChecked={false} />
            </div>
            <p className="text-xs text-muted-foreground">
              Receive non-urgent notifications on weekends
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={isLoading} className="min-w-32">
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              Saving...
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Save className="h-4 w-4" />
              Save Changes
            </div>
          )}
        </Button>
      </div>
    </div>
  );
}
