import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { getSession } from "@/lib/auth-server"
import { LogOut, Settings, User, UserPlus } from "lucide-react"
import { redirect } from "next/navigation"

export default async function DashboardPage() {
  const session = await getSession()

  if (!session) {
    redirect("/auth/signin")
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex items-center gap-2">
            <p>{session.user?.name}</p>
            <Avatar>
              <AvatarImage alt="User Avatar" src={session.user?.image ?? ""} />
              <AvatarFallback>
                {session.user?.name?.charAt(0).toUpperCase() ?? "?"}
              </AvatarFallback>
            </Avatar>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>
            <User className="w-4 h-4 mr-2" />
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem>
            <UserPlus className="w-4 h-4 mr-2" />
            Add Friends
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </DropdownMenuItem>
          <DropdownMenuItem>
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <div className="flex gap-4 mt-10">

        <Card className="w-full max-w-xs">
          <CardHeader>
            <CardTitle>
              Private Game
            </CardTitle>
          </CardHeader>
          <CardContent>
            Invite a friend to play with you.
          </CardContent>
          <CardFooter>
            <div className="flex flex-col gap-2">
              <Button>
                Create Game
              </Button>
              <Button variant="outline">
                Join Game
              </Button>
            </div>
          </CardFooter>
        </Card>

      </div>



    </div>
  )
}