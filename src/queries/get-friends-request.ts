import { getUser } from "@/lib/auth-server"
import prisma from "@/lib/prisma"

export const getFriendsRequest = async () => {
  const session = await getUser()
  if (!session) {
    return []
  }
  const friendships = await prisma.friendship.findMany({
    where: {
      status: "PENDING",
      addresseeId: session.id,
      requesterId: {
        not: session.id
      }
    },
    include: {
      requester: true
    }
  })
  return friendships.map(f => f.requester)
}