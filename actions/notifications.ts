"use server";
import { db } from "@/db";
import { notification } from "@/db/schema";

export const createNotification = async ({
  title,
  message,
  type = "info",
  category = "general",
  priority = "medium",
  userId,
  actionUrl,
  actionLabel,
  metadata,
}: {
  title: string;
  message: string;
  type?: string;
  category?: string;
  priority?: string;
  userId: string;
  actionUrl?: string;
  actionLabel?: string;
  metadata?: any;
}) => {
  return await db
    .insert(notification)
    .values({
      id: crypto.randomUUID(),
      title,
      message,
      type,
      category,
      priority,
      userId,
      actionUrl,
      actionLabel,
      metadata: metadata ? JSON.stringify(metadata) : undefined,
      isRead: false,
      isStarred: false,
      isArchived: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    .returning();
};
