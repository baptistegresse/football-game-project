"use server"

import { getUser } from "@/lib/auth-server";
import prisma from "@/lib/prisma";
import pusher from "@/lib/pusher-server";

export const acceptFriend = async (id: string) => {
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
        requesterId: id,
        addresseeId: session.id
      }
    })
    if (!friendship) {
      return { error: "Friendship not found" }
    }
    if (friendship.status === "ACCEPTED") {
      return { error: "You are already friends" }
    }
    if (friendship.status === "REJECTED") {
      return { error: "This request has already been rejected" }
    }
    if (friendship.status !== "PENDING") {
      return { error: "Cannot accept this request" }
    }


    await prisma.friendship.update({
      where: { id: friendship.id },
      data: { status: "ACCEPTED" }
    })

    await prisma.notification.create({
      data: {
        userId: friendship.requesterId,
        type: "FRIEND_ACCEPTED",
        content: `${session.name} a accepté ta demande d'ami.`
      }
    });

    await pusher.trigger(`user-${friendship.requesterId}`, "new-notification", {
      type: "FRIEND_ACCEPTED",
      content: `${session.name} a accepté ta demande d'ami.`
    });


    return { success: "Friend request accepted" }
  } catch {
    return { error: "An error occurred" }
  }
}