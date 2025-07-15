
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { getUser } from "@/lib/auth-server"
import { redirect } from "next/navigation"

export default async function DashboardPage() {
  const user = await getUser()

  if (!user) {
    redirect("/auth/signin")
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
      <p className="text-muted-foreground mb-6">
        Welcome to the dashboard {user.name}
      </p>

      <Card className="mt-8 w-full max-w-md flex flex-col items-center">
        <CardContent className="flex flex-col items-center gap-4 justify-center">
          <h2 className="text-xl font-semibold mb-4">Game Mode: 1v1</h2>
          <div className="flex gap-4 justify-center">
            <Button variant="default">
              Créer
            </Button>
            <Button variant="default">
              Rejoindre
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}