"use client"

import { acceptFriend } from "@/actions/accept-friend.action"
import { rejectFriend } from "@/actions/reject-friend.action"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"


import { useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from "sonner"
import { User } from "../../generated/prisma"

export const DisplayFriends = () => {

  const { data: friends } = useQuery({ queryKey: ['friends'], queryFn: () => fetch('/api/friends?status=ACCEPTED').then(res => res.json()) })
  const { data: friendsRequest } = useQuery({ queryKey: ['friendsRequest'], queryFn: () => fetch('/api/friends?status=PENDING').then(res => res.json()) })
  const queryClient = useQueryClient();


  const handleFriendAction = async (
    id: string,
    action: (id: string) => Promise<{ error?: string; success?: string }>
  ) => {
    const { error, success } = await action(id)
    queryClient.invalidateQueries({ queryKey: ['friendsRequest'] })
    queryClient.invalidateQueries({ queryKey: ['friends'] })
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
          {friends && friends.length > 0 ? (
            <ul className="flex flex-col gap-2">
              {friends.map((friend: User) => (
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
          {friendsRequest && friendsRequest.length > 0 ? (
            <ul className="flex flex-col gap-2">
              {friendsRequest.map((friend: User) => (
                <li
                  key={friend.id}
                  className="flex items-center gap-2 rounded-md px-3 py-2 hover:bg-muted transition"
                >
                  <span className="font-medium">{friend.name}</span>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleFriendAction(friend.id, acceptFriend)}
                  >
                    Accept
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleFriendAction(friend.id, rejectFriend)}
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
