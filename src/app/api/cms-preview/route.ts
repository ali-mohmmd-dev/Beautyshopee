import { draftMode } from "next/headers";
import { NextResponse } from "next/server";
import { timingSafeEqual } from "node:crypto";
export async function GET(request: Request) {
  const url = new URL(request.url);
  const secret = process.env["CMS_CONTENT_TOKEN"],
    token = url.searchParams.get("token") ?? "";
  if (
    !secret ||
    secret.length !== token.length ||
    !timingSafeEqual(Buffer.from(secret), Buffer.from(token))
  )
    return new NextResponse("Unauthorized", { status: 401 });
  const path = url.searchParams.get("path") ?? "/";
  if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\"))
    return new NextResponse("Invalid preview path", { status: 400 });
  if (url.searchParams.get("exit") === "1") (await draftMode()).disable();
  else (await draftMode()).enable();
  return NextResponse.redirect(new URL(path, request.url));
}
