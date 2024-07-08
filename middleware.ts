import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";


export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value || null;
  const passwordStatus = request.cookies.get("pwd_status")?.value || null;
  const userType = request.cookies.get("user_type")?.value || null;
  const currentURL = request.nextUrl.pathname;
  // Public routes
  const publicRoutes = ["/login", "/forgot-password", "/set-password"];

  if (token && passwordStatus === "0" && currentURL !== "/set-password") {
    return NextResponse.redirect(new URL("/set-password", request.url));
  }

  // Handle public routes
  if (publicRoutes.includes(currentURL)) {
    if (token) {
      return redirectToDashboard(userType, request);
    } else {
      return NextResponse.next();
    }
  }

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return handleRouteAccess(userType, currentURL, request);
}

function redirectToDashboard(userType: string | null, request: NextRequest) {
  if (userType === "admin" || userType === "supervisor") {
    return NextResponse.redirect(new URL("/", request.url));
  } else if (userType === "client") {
    return NextResponse.redirect(new URL("/client/dashboard", request.url));
  } else if (userType === "staff") {
    return NextResponse.redirect(new URL("/staff/dashboard", request.url));
  } else {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

function handleRouteAccess(
  userType: string | null,
  currentURL: string,
  request: NextRequest
) {
  if (userType === "admin" || userType === "supervisor") {
    return NextResponse.next();
  } else if (userType === "client") {
    if (currentURL.startsWith("/client/")) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL("/client/dashboard", request.url));
    }
  } else if (userType === "staff") {
    if (currentURL.startsWith("/staff/")) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL("/staff/dashboard", request.url));
    }
  } else {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: [
    "/",
    "/reports/:path*",
    "/cash-advance/:path*",
    "/consultants/:path*",
    "/contractors/:path*",
    "/facility/:path*",
    "/inventory/:path*",
    "/manage-client/:path*",
    "/manage-staff/:path*",
    "/project/:path*",
    "/reports/:path*",
    "/requests/:path*",
    "/settings/:path*",
    "/stakeholders/:path*",
    "/suppliers/:path*",
    "/workers/:path*",
    "/client/:path*",
    "/staff/:path*",
    "/login",
    "/forgot-password",
  ],
};
