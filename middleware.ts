import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const session = request.cookies.get("jp-admin-session")?.value;
  const isLoginPage = pathname === "/jp-guest-admin";

  if (isLoginPage) {
    if (session) {
      return NextResponse.redirect(
        new URL("/jp-guest-admin/dashboard", request.url),
      );
    }
    return NextResponse.next();
  }

  if (!session) {
    return NextResponse.redirect(new URL("/jp-guest-admin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/jp-guest-admin/:path*"],
};
