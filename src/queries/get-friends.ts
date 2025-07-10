import { getUser } from "@/lib/auth-server"
import prisma from "@/lib/prisma"

export const getFriends = async () => {
  const session = await getUser()
  if (!session) {
    return []
  }
  // Find all friendships where the user is either the requester or addressee and status is ACCEPTED
  const friendships = await prisma.friendship.findMany({
    where: {
      status: "ACCEPTED",
      OR: [
        { requesterId: session.id },
        { addresseeId: session.id }
      ]
    },
    include: {
      requester: true,
      addressee: true
    }
  })

  // Map to return the "other" user in each friendship
  const friends = friendships.map(f => {
    if (f.requesterId === session.id) {
      return f.addressee
    } else {
      return f.requester
    }
  })

  return friends
}