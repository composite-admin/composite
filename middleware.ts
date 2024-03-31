import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";


export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value || null;
  const userType = request.cookies.get('user_type')?.value || null;
  const currentURL = request.nextUrl.pathname;

  console.log('Middleware called for:', currentURL);
  console.log('Token:', token);
  console.log('User Type:', userType);

  // Public routes
  const publicRoutes = ['/login', '/forgot-password'];

  // Handle public routes
  if (publicRoutes.includes(currentURL)) {
    if (token) {
      // Redirect authenticated users to the appropriate dashboard
      console.log('Redirecting authenticated user to dashboard');
      return redirectToDashboard(userType, request);
    } else {
      // Allow access to public routes for unauthenticated users
      console.log('Allowing access to public route');
      return NextResponse.next();
    }
  }

  // Handle protected routes
  if (!token) {
    // Redirect unauthenticated users to the login page
    console.log('Redirecting unauthenticated user to login');
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Handle route access based on user type
  console.log('Checking route access for user type:', userType);
  return handleRouteAccess(userType, currentURL, request);
}

function redirectToDashboard(userType: string | null, request: NextRequest) {
  if (userType === 'admin') {
    return NextResponse.redirect(new URL('/', request.url));
  } else if (userType === 'client') {
    return NextResponse.redirect(new URL('/client/dashboard', request.url));
  } else if (userType === 'staff') {
    return NextResponse.redirect(new URL('/staff/dashboard', request.url));
  } else {
    // Handle invalid user type
    console.log('Invalid user type:', userType);
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

function handleRouteAccess(userType: string | null, currentURL: string, request: NextRequest) {
  if (userType === 'admin') {
    // Admins can access all routes
    console.log('Allowing admin access to route:', currentURL);
    return NextResponse.next();
  } else if (userType === 'client') {
    // Clients can only access routes starting with '/client/'
    if (currentURL.startsWith('/client/')) {
      console.log('Allowing client access to route:', currentURL);
      return NextResponse.next();
    } else {
      console.log('Redirecting client to /client/dashboard');
      return NextResponse.redirect(new URL('/client/dashboard', request.url));
    }
  } else if (userType === 'staff') {
    // Staff can only access routes starting with '/staff/'
    if (currentURL.startsWith('/staff/')) {
      console.log('Allowing staff access to route:', currentURL);
      return NextResponse.next();
    } else {
      console.log('Redirecting staff to /staff/dashboard');
      return NextResponse.redirect(new URL('/staff/dashboard', request.url));
    }
  } else {
    // Handle invalid user type
    console.log('Invalid user type:', userType);
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

export const config = {
  matcher: ['/', '/client/:path*', '/staff/:path*', '/login', '/forgot-password'],
};

// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// export function middleware(request: NextRequest) {
//   const token = request.cookies.get("token")?.value || null;
//   const user_type = request.cookies.get("user_type")?.value || null;
//   console.log({
//     user_type: user_type,
//     token: token,
//   });
//   const currentURL = request.nextUrl.pathname;

//   const protectedRoutes = ["/", "/client/dashboard", "/staff/dashboard"];
//   const publicRoutes = ["/login", "/forgot-password"];

//   if (publicRoutes.includes(currentURL) && token) {
//     console.log(token);
//     return NextResponse.redirect(new URL("/", request.url));
//   }

//   if (!publicRoutes.includes(currentURL) && !token) {
//     return NextResponse.redirect(new URL("/login", request.url));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/", "/client/", "/staff/", "/login", "/forgot-password"],
// };
