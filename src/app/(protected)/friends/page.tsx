import { AddFriendForm } from "@/components/addfriend-form"
import { DisplayFriends } from "@/components/displayfriends"

export default async function FriendsPage() {

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="w-full max-w-xs mx-auto space-y-8">
        <DisplayFriends />
        <AddFriendForm />
      </div>
    </div>
  )
}
