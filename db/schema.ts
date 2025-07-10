import { pgTable, text, timestamp, boolean } from "drizzle-orm/pg-core";

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  username: text("username").unique(),
  role: text("role").default("student"),
  institution: text("institution"),
  banned: boolean("banned"),
  banReason: text("ban_reason"),
  banExpires: timestamp("ban_expires"),
  image: text("image"),
  bio: text("bio"),
  gradeLevel: text("grade_level"),
  enrolledCourses: text("enrolled_courses"),
  achievements: text("achievements"),
  createdAt: timestamp("created_at")
  .$defaultFn(() => /* @__PURE__ */ new Date())
  .notNull(),
  updatedAt: timestamp("updated_at")
  .$defaultFn(() => /* @__PURE__ */ new Date())
  .notNull(),
  emailVerified: boolean("email_verified")
    .$defaultFn(() => false)
    .notNull(),
  progressJson: text("progress_json"),
  preferencesJson: text("preferences_json"),
});

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  impersonatedBy: text("impersonated_by"),
});

export const account = pgTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").$defaultFn(
    () => /* @__PURE__ */ new Date()
  ),
  updatedAt: timestamp("updated_at").$defaultFn(
    () => /* @__PURE__ */ new Date()
  ),
});

export const notification = pgTable("notification", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  message: text("message").notNull(),
  type: text("type").notNull(), // 'info', 'success', 'warning', 'error', 'achievement', 'system'
  category: text("category").notNull(), // 'general', 'course', 'achievement', 'admin', 'security'
  priority: text("priority").default("medium"), // 'low', 'medium', 'high', 'urgent'
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  isRead: boolean("is_read").default(false).notNull(),
  readAt: timestamp("read_at"),
  isStarred: boolean("is_starred").default(false).notNull(),
  isArchived: boolean("is_archived").default(false).notNull(),
  actionUrl: text("action_url"), // URL to navigate when clicked
  actionLabel: text("action_label"), // Button text for action
  metadata: text("metadata"), // JSON for additional data
  expiresAt: timestamp("expires_at"), // Auto-delete after this date
  createdAt: timestamp("created_at")
    .$defaultFn(() => new Date())
    .notNull(),
  updatedAt: timestamp("updated_at")
    .$defaultFn(() => new Date())
    .notNull(),
});

export const notificationPreferences = pgTable("notification_preferences", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  emailNotifications: boolean("email_notifications").default(true).notNull(),
  pushNotifications: boolean("push_notifications").default(true).notNull(),
  courseUpdates: boolean("course_updates").default(true).notNull(),
  achievementAlerts: boolean("achievement_alerts").default(true).notNull(),
  adminMessages: boolean("admin_messages").default(true).notNull(),
  securityAlerts: boolean("security_alerts").default(true).notNull(),
  marketingEmails: boolean("marketing_emails").default(false).notNull(),
  weeklyDigest: boolean("weekly_digest").default(true).notNull(),
  createdAt: timestamp("created_at")
    .$defaultFn(() => new Date())
    .notNull(),
  updatedAt: timestamp("updated_at")
    .$defaultFn(() => new Date())
    .notNull(),
});

export const authSchema = {
  user,
  session,
  account,
  verification,
  notification,
  notificationPreferences,
};
