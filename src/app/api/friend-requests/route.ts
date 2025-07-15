import { getFriendsRequest } from "@/queries/get-friends-request";
import { NextResponse } from "next/server";

export async function GET() {
  const data = await getFriendsRequest();
  return NextResponse.json(data);
}