"use client"

import { acceptFriend } from "@/actions/accept-friend.action"
import { rejectFriend } from "@/actions/reject-friend.action"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"
import { User } from "../../generated/prisma"

export const DisplayFriends = ({
  friends,
  friendsRequest,
}: { friends: User[]; friendsRequest: User[] }) => {
  const handleAcceptFriend = async (id: string) => {
    const { error, success } = await acceptFriend(id)
    if (error) {
      toast.error(error)
    } else {
      toast.success(success)
    }
  }

  const handleRejectFriend = async (id: string) => {
    const { error, success } = await rejectFriend(id)
    if (error) {
      toast.error(error)
    } else {
      toast.success(success)
    }
  }

  return (
    <div className="w-full max-w-xs mx-auto space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Friends</CardTitle>
        </CardHeader>
        <CardContent>
          {friends.length > 0 ? (
            <ul className="flex flex-col gap-2">
              {friends.map((friend) => (
                <li
                  key={friend.id}
                  className="flex items-center gap-2 rounded-md px-3 py-2 hover:bg-muted transition"
                >
                  <span className="font-medium">{friend.name}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted-foreground text-sm">No friends found</p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Friend Requests</CardTitle>
        </CardHeader>
        <CardContent>
          {friendsRequest.length > 0 ? (
            <ul className="flex flex-col gap-2">
              {friendsRequest.map((friend) => (
                <li
                  key={friend.id}
                  className="flex items-center gap-2 rounded-md px-3 py-2 hover:bg-muted transition"
                >
                  <span className="font-medium">{friend.name}</span>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleAcceptFriend(friend.id)}
                  >
                    Accept
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleRejectFriend(friend.id)}
                  >
                    Reject
                  </Button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted-foreground text-sm">No friend requests found</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
