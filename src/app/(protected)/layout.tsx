
import { NavigationApp } from "@/components/NavigationApp"
import { getUser } from "@/lib/auth-server"
import { redirect } from "next/navigation"
import { ReactNode } from "react"
import { User } from "../../../generated/prisma"

export default async function ProtectedLayout({ children }: { children: ReactNode }) {
  const user = await getUser()
  if (!user) {
    redirect("/auth/signin")
  }
  return (
    <main className="flex flex-col items-center justify-center h-screen">
      <NavigationApp user={user as User} />
      {children}
    </main>
  )
}


