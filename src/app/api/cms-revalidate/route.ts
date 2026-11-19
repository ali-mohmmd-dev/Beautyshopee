import { timingSafeEqual } from "node:crypto";
import { revalidatePath, revalidateTag } from "next/cache";
import { PUBLISHED_CONTENT_TAG } from "@/lib/cms";

export async function POST(request: Request) {
  const secret = process.env["CMS_CONTENT_TOKEN"];
  const supplied = request.headers.get("authorization") ?? "";
  const expected = "Bearer " + secret;
  if (
    !secret ||
    Buffer.byteLength(supplied) !== Buffer.byteLength(expected) ||
    !timingSafeEqual(Buffer.from(supplied), Buffer.from(expected))
  ) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  // Expire immediately so the next visitor waits for fresh published content.
  revalidateTag(PUBLISHED_CONTENT_TAG, { expire: 0 });
  revalidatePath("/", "layout");
  return Response.json({ revalidated: true });
}
