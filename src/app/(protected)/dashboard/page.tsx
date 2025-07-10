import { getSession } from "@/lib/auth-server"
import { redirect } from "next/navigation"

export default async function DashboardPage() {
  const session = await getSession()

  if (!session) {
    redirect("/auth/sign-in")
  }

  return (
    <div>
      <h1>Welcome {session.user?.name}</h1>
    </div>
  )
}