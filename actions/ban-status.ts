"use server";
import { db } from "@/db";
import { user } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getBanStatusByEmail(email: string) {
  if (!email) return { error: "Email is required." };
  const u = await db.select().from(user).where(eq(user.email, email)).limit(1);
  if (!u.length) return { error: "No user found with this email." };
  const userData = u[0];
  return {
    banned: userData.banned,
    banReason: userData.banReason,
    banExpires: userData.banExpires,
    email: userData.email,
    username: userData.username,
  };
}
