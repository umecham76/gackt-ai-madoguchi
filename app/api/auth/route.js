import { NextResponse } from "next/server";

export async function POST(request) {
  const body = await request.json();
  const token = body?.token;
  const linkToken = process.env.LINK_TOKEN;

  if (!token || !linkToken || token !== linkToken) {
    return NextResponse.json({ error: "Invalid access token." }, { status: 401 });
  }

  const response = NextResponse.json({ success: true });
  response.cookies.set("access_granted", "1", {
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24,
  });

  return response;
}
