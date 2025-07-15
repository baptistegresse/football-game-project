import { getUser } from "@/lib/auth-server"
import prisma from "@/lib/prisma"

export type NotificationType = "FRIEND_REQUEST" | "FRIEND_ACCEPTED" | "FRIEND_REJECTED"

export const getNotifications = async (type: NotificationType, read: boolean) => {
  const session = await getUser()
  if (!session) {
    return []
  }

  const notifications = await prisma.notification.findMany({
    where: {
      user: {
        id: session.id
      },
      type: type,
      read: read
    }
  })
  return notifications
}