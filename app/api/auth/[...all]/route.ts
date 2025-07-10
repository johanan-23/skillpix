import { auth } from "@/utils/auth";
import { toNextJsHandler } from "better-auth/next-js";
import { NextRequest, NextResponse } from "next/server";

const { POST: originalPOST, GET: originalGET } = toNextJsHandler(auth);

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const pathname = url.pathname;

  // Check if this is an OAuth callback
  if (pathname.includes("/callback/")) {
    try {
      const response = await originalGET(request);

      // Check if the response indicates a banned user
      if (response.status === 403) {
        const responseClone = response.clone();
        const responseText = await responseClone.text();

        // Check if the response contains the banned user error
        if (
          responseText.includes("BANNED_USER") ||
          responseText.includes("banned")
        ) {
          // Redirect to banned page instead of showing JSON error
          return NextResponse.redirect(new URL("/banned", request.url));
        }
      }

      return response;
    } catch (error) {
      console.error("OAuth callback error:", error);

      // Check if the error is about banned user
      if (
        error instanceof Error &&
        (error.message.includes("BANNED_USER") ||
          error.message.includes("banned"))
      ) {
        return NextResponse.redirect(new URL("/banned", request.url));
      }

      return originalGET(request);
    }
  }

  return originalGET(request);
}

export const POST = originalPOST;
