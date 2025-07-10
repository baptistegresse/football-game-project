"use server"

import { getUser } from "@/lib/auth-server"
import prisma from "@/lib/prisma"

export const rejectFriend = async (id: string) => {
  try {
    const session = await getUser()
    if (!session) {
      return { error: "Unauthorized" }
    }
    if (!id || id.trim() === "") {
      return { error: "Invalid request id" }
    }
    const friendship = await prisma.friendship.findFirst({
      where: {
        id: id,
        addresseeId: session.id
      }
    })
    if (!friendship) {
      return { error: "Friendship not found" }
    }
    if (friendship.status === "REJECTED") {
      return { error: "Request already rejected" }
    }
    if (friendship.status === "ACCEPTED") {
      return { error: "You are already friends" }
    }
    if (friendship.status !== "PENDING") {
      return { error: "Cannot reject this request" }
    }
    await prisma.friendship.update({
      where: { id: id },
      data: { status: "REJECTED" }
    })
    return { success: "Friend request rejected" }
  } catch {
    return { error: "An error occurred" }
  }
}