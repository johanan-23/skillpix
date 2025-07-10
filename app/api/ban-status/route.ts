import { NextRequest, NextResponse } from "next/server";
import { getBanStatusByEmail } from "@/actions/ban-status";

export async function POST(req: NextRequest) {
  const { email } = await req.json();
  if (!email)
    return NextResponse.json({ error: "Email is required." }, { status: 400 });
  const result = await getBanStatusByEmail(email);
  if (result.error) return NextResponse.json(result, { status: 404 });
  return NextResponse.json(result);
}
