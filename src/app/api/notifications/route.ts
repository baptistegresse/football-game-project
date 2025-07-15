import { getNotifications } from "@/queries/get-notifications";
import { NextResponse } from "next/server";

export type NotificationType = "FRIEND_REQUEST" | "FRIEND_ACCEPTED" | "FRIEND_REJECTED"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type");
  const read = searchParams.get("read");
  const data = await getNotifications(type as NotificationType, read === "true");
  return NextResponse.json(data);
}