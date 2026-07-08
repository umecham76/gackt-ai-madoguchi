import { NextResponse } from "next/server";

const ACCESS_COOKIE = "access_granted";
const AUTH_PAGE = "/auth";
const ALLOWED_API = "/api/auth";

export function middleware(request) {
  const { pathname, searchParams, origin } = request.nextUrl;
  const accessCookie = request.cookies.get(ACCESS_COOKIE);
  const linkToken = process.env.LINK_TOKEN;

  if (pathname.startsWith("/_next") || pathname.startsWith("/favicon.ico")) {
    return;
  }

  const token = searchParams.get("access_token");
  if (token && linkToken && token === linkToken) {
    const redirectUrl = new URL(pathname, origin);
    redirectUrl.searchParams.delete("access_token");
    const response = NextResponse.redirect(redirectUrl);
    response.cookies.set(ACCESS_COOKIE, "1", {
      httpOnly: true,
      path: "/",
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24,
    });
    return response;
  }

  if (pathname === AUTH_PAGE || pathname.startsWith(ALLOWED_API)) {
    return;
  }

  if (accessCookie?.value === "1") {
    return;
  }

  if (pathname === "/api/chat") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.redirect(new URL(AUTH_PAGE, request.url));
}

export const config = {
  matcher: ["/", "/auth", "/api/chat", "/api/auth"],
};
