import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value || null;
  const user_type = request.cookies.get("user_type")?.value || null;
  console.log({
    user_type: user_type,
    token: token,
  });
  const currentURL = request.nextUrl.pathname;

  const protectedRoutes = ["/", "/client/dashboard", "/staff/dashboard"];
  const publicRoutes = ["/login", "/forgot-password"];

  if (publicRoutes.includes(currentURL) && token) {
    console.log(token);
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (!publicRoutes.includes(currentURL) && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/client/", "/staff/", "/login", "/forgot-password"],
};