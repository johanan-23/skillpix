import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { notification } from "@/db/schema";
import { inArray, eq, and } from "drizzle-orm";

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { notificationIds, action, userId } = body;

    if (
      !notificationIds ||
      !Array.isArray(notificationIds) ||
      notificationIds.length === 0
    ) {
      return NextResponse.json(
        { error: "notificationIds array is required" },
        { status: 400 }
      );
    }

    if (!action) {
      return NextResponse.json(
        { error: "action is required" },
        { status: 400 }
      );
    }

    const updates: Partial<typeof notification.$inferSelect> = {
      updatedAt: new Date(),
    };

    switch (action) {
      case "read":
        updates.isRead = true;
        updates.readAt = new Date();
        break;
      case "unread":
        updates.isRead = false;
        updates.readAt = null;
        break;
      case "archive":
        updates.isArchived = true;
        break;
      default:
        return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }

    const whereCondition = userId
      ? and(
          inArray(notification.id, notificationIds),
          eq(notification.userId, userId)
        )
      : inArray(notification.id, notificationIds);

    const updatedNotifications = await db
      .update(notification)
      .set(updates)
      .where(whereCondition)
      .returning();

    return NextResponse.json({
      message: `${updatedNotifications.length} notifications updated`,
      updatedCount: updatedNotifications.length,
    });
  } catch (error) {
    console.error("Error bulk updating notifications:", error);
    return NextResponse.json(
      { error: "Failed to update notifications" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();
    const { notificationIds, userId } = body;

    if (
      !notificationIds ||
      !Array.isArray(notificationIds) ||
      notificationIds.length === 0
    ) {
      return NextResponse.json(
        { error: "notificationIds array is required" },
        { status: 400 }
      );
    }

    const whereCondition = userId
      ? and(
          inArray(notification.id, notificationIds),
          eq(notification.userId, userId)
        )
      : inArray(notification.id, notificationIds);

    const deletedNotifications = await db
      .delete(notification)
      .where(whereCondition)
      .returning();

    return NextResponse.json({
      message: `${deletedNotifications.length} notifications deleted`,
      deletedCount: deletedNotifications.length,
    });
  } catch (error) {
    console.error("Error bulk deleting notifications:", error);
    return NextResponse.json(
      { error: "Failed to delete notifications" },
      { status: 500 }
    );
  }
}
