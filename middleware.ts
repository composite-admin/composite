import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token");
  const currentURL = request.nextUrl.pathname;

  // Define a list of protected routes that require authentication
  const protectedRoutes = ["/", "/client", "/staff"];

  // Check if the current URL is a protected route and if the token is missing
  if (protectedRoutes.includes(currentURL) && !token) {
    // Redirect to the login page
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // If the token exists or the current URL is not a protected route, proceed with the request
  return NextResponse.next();
}
