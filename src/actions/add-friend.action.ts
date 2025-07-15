"use server"

import { getUser } from "@/lib/auth-server"
import prisma from "@/lib/prisma"
import pusher from "@/lib/pusher-server"

export const addFriend = async (name: string) => {
  try {
    const session = await getUser()
    if (!session) {
      return { error: "Unauthorized" }
    }
    if (!name || name.trim() === "") {
      return { error: "Invalid name" }
    }
    if (name === session.name) {
      return { error: "You cannot add yourself" }
    }
    const friend = await prisma.user.findFirst({
      where: {
        name: name
      },
      select: {
        id: true,
        name: true
      }
    })
    if (!friend) {
      return { error: "Friend not found" }
    }
    const existingFriendship = await prisma.friendship.findFirst({
      where: {
        requesterId: session.id,
        addresseeId: friend.id
      }
    })
    if (existingFriendship) {
      if (existingFriendship.status === "PENDING") {
        return { error: "Request already sent" }
      }
      if (existingFriendship.status === "ACCEPTED") {
        return { error: "You are already friends" }
      }
      if (existingFriendship.status === "REJECTED") {
        return { error: "Request rejected, you can try again later" }
      }
    }
    // Check if the other user has already sent a request
    const inverseFriendship = await prisma.friendship.findFirst({
      where: {
        requesterId: friend.id,
        addresseeId: session.id
      }
    })
    if (inverseFriendship) {
      if (inverseFriendship.status === "PENDING") {
        return { error: "This user has already sent you a request, accept it!" }
      }
      if (inverseFriendship.status === "ACCEPTED") {
        return { error: "You are already friends" }
      }
      if (inverseFriendship.status === "REJECTED") {
        return { error: "You have rejected this user's request" }
      }
    }
    await prisma.friendship.create({
      data: {
        requesterId: session.id,
        addresseeId: friend.id,
        status: "PENDING"
      }
    })

    await prisma.notification.create({
      data: {
        userId: friend.id,
        type: "FRIEND_REQUEST",
        content: `${session.name} sent you a friend request`,
        read: false
      }
    })

    await pusher.trigger(`user-${friend.id}`, "new-notification", {
      type: "FRIEND_REQUEST",
      content: `${session.name} sent you a friend request`,
      read: false
    })

    return { success: "Friend request sent" }
  } catch {
    return { error: "An error occurred" }
  }
}