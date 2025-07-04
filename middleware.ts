import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/utils/auth";
import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
} from "@/routes";

export async function middleware(request: NextRequest) {
  const reqHeaders = await headers();
  const session = await auth.api.getSession({ headers: reqHeaders });
  const pathname = request.nextUrl.pathname;
  const isLoggedIn = !!session?.user;
  const isApiAuthRoute = pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(pathname);
  const isAuthRoute = authRoutes.includes(pathname);

  if (isApiAuthRoute) {
    return NextResponse.next();
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return NextResponse.redirect(
        new URL(DEFAULT_LOGIN_REDIRECT, request.nextUrl)
      );
    }
    return NextResponse.next();
  }

  if (!isLoggedIn && !isPublicRoute) {
    let callBackUrl = pathname;
    if (request.nextUrl.search) {
      callBackUrl += request.nextUrl.search;
    }
    const encodedCallBackUrl = encodeURIComponent(callBackUrl);
    // Redirect to login with callback URL
    return NextResponse.redirect(
      new URL(`/login?callbackUrl=${encodedCallBackUrl}`, request.nextUrl)
    );
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
