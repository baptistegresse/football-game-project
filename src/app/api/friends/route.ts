import { getFriends } from "@/queries/get-friends";
import { NextResponse } from "next/server";

export async function GET() {
  const data = await getFriends();
  return NextResponse.json(data);
}