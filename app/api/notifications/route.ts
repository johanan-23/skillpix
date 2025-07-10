import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { notification } from "@/db/schema";
import { eq, desc, and, or, like } from "drizzle-orm";
import { auth } from "@/utils/auth";
import { headers } from "next/headers";

export async function GET(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const userId = session.user.id; // Use actual user ID from session
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const type = searchParams.get("type");
    const category = searchParams.get("category");
    const isRead = searchParams.get("isRead");
    const search = searchParams.get("search");

    const offset = (page - 1) * limit;

    const whereConditions = [eq(notification.userId, userId)];

    if (type && type !== "all") {
      whereConditions.push(eq(notification.type, type));
    }

    if (category && category !== "all") {
      whereConditions.push(eq(notification.category, category));
    }

    if (isRead === "true") {
      whereConditions.push(eq(notification.isRead, true));
    } else if (isRead === "false") {
      whereConditions.push(eq(notification.isRead, false));
    }

    if (search) {
      whereConditions.push(
        or(
          like(notification.title, `%${search}%`),
          like(notification.message, `%${search}%`)
        )!
      );
    }

    // Fetch notifications
    const notifications = await db
      .select()
      .from(notification)
      .where(and(...whereConditions))
      .orderBy(desc(notification.createdAt))
      .limit(limit)
      .offset(offset);

    // Get total count for pagination
    const totalCount = await db
      .select({ count: db.$count(notification) })
      .from(notification)
      .where(and(...whereConditions));

    // Get unread count
    const unreadCount = await db
      .select({ count: db.$count(notification) })
      .from(notification)
      .where(
        and(eq(notification.userId, userId), eq(notification.isRead, false))
      );

    return NextResponse.json({
      notifications,
      pagination: {
        page,
        limit,
        total: totalCount[0]?.count || 0,
        totalPages: Math.ceil((totalCount[0]?.count || 0) / limit),
      },
      unreadCount: unreadCount[0]?.count || 0,
    });
  } catch (error) {
    console.error("Error fetching notifications:", error);
    return NextResponse.json(
      { error: "Failed to fetch notifications" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const {
      title,
      message,
      type = "info",
      category = "general",
      priority = "medium",
      userId = session.user.id, // Default to current user
      actionUrl,
      actionLabel,
      metadata,
      expiresAt,
    } = body;

    if (!title || !message || !userId) {
      return NextResponse.json(
        { error: "Title, message, and userId are required" },
        { status: 400 }
      );
    }

    const newNotification = await db
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
        expiresAt: expiresAt ? new Date(expiresAt) : undefined,
        isRead: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning();

    return NextResponse.json(newNotification[0], { status: 201 });
  } catch (error) {
    console.error("Error creating notification:", error);
    return NextResponse.json(
      { error: "Failed to create notification" },
      { status: 500 }
    );
  }
}
