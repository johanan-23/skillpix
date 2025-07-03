// import { NextRequest, NextResponse } from "next/server";
// import { headers } from "next/headers";
// import { auth } from "@/utils/auth";
// import { getCookieCache } from "better-auth/cookies";

// import {
//   DEFAULT_LOGIN_REDIRECT,
//   apiAuthPrefix,
//   authRoutes,
//   publicRoutes,
// } from "@/routes";

// export async function middleware(request: NextRequest) {
//   const session = getCookieCache(request);
//   const isLoggedIn = !!session?.user;
//   const { nextUrl } = request;
// const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
// const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
// const isAuthRoute = authRoutes.includes(nextUrl.pathname);

//   // Allow public routes without authentication
// if (isPublicRoute) {
//   return NextResponse.next();
// }

//   // Allow API auth routes without authentication
//   if (isApiAuthRoute) {
//     return NextResponse.next();
//   }

//   if (isLoggedIn && isAuthRoute) {
//     // Prevent access to auth routes (like /login, /register) if already authenticated
//     return NextResponse.redirect(DEFAULT_LOGIN_REDIRECT, request.nextUrl);
//   }

//   // If not authenticated and not on a public/auth/api route, redirect to login
//   if (!session) {
//     return NextResponse.redirect(new URL("/login", request.url));
//   }

//   return NextResponse.next();
// }

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
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const isLoggedIn = !!session?.user;
  const isApiAuthRoute = request.nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(request.nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(request.nextUrl.pathname);

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
    let callBackUrl = request.nextUrl.pathname;
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
