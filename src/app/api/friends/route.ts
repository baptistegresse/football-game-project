import { FriendshipStatus, getFriends } from "@/queries/get-friends";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");
  const data = await getFriends(status as FriendshipStatus);
  return NextResponse.json(data);
}