import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth?.token;


    // Not logged in
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    // // Logged in but not admin
    if (token.role !== "admin") {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    // Allow access
    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token, // this ensures middleware runs only when a token exists
    },
  }
);

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*"],
};
