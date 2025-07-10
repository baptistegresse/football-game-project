import { AddFriendForm } from "@/components/addfriend-form"
import { DisplayFriends } from "@/components/displayfriends"
import { getFriends } from "@/queries/get-friends"
import { getFriendsRequest } from "@/queries/get-friends-request"

export default async function FriendsPage() {

  const friends = await getFriends()
  const friendsRequest = await getFriendsRequest()

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="w-full max-w-xs mx-auto space-y-8">
        <DisplayFriends friends={friends} friendsRequest={friendsRequest} />
        <AddFriendForm />
      </div>
    </div>
  )
}
