import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { notification } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { isRead, isStarred, isArchived } = body;

    const updates: Partial<typeof notification.$inferInsert> = {
      updatedAt: new Date(),
    };

    if (typeof isRead === "boolean") {
      updates.isRead = isRead;
      updates.readAt = isRead ? new Date() : null;
    }

    if (typeof isStarred === "boolean") {
      updates.isStarred = isStarred;
    }

    if (typeof isArchived === "boolean") {
      updates.isArchived = isArchived;
    }

    const updatedNotification = await db
      .update(notification)
      .set(updates)
      .where(eq(notification.id, params.id))
      .returning();

    if (updatedNotification.length === 0) {
      return NextResponse.json(
        { error: "Notification not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedNotification[0]);
  } catch (error) {
    console.error("Error updating notification:", error);
    return NextResponse.json(
      { error: "Failed to update notification" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const deletedNotification = await db
      .delete(notification)
      .where(eq(notification.id, params.id))
      .returning();

    if (deletedNotification.length === 0) {
      return NextResponse.json(
        { error: "Notification not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Notification deleted successfully" });
  } catch (error) {
    console.error("Error deleting notification:", error);
    return NextResponse.json(
      { error: "Failed to delete notification" },
      { status: 500 }
    );
  }
}
