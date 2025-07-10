import { getUser } from "@/lib/auth-server"
import { redirect } from "next/navigation"
import { ReactNode } from "react"

export default async function ProtectedLayout({ children }: { children: ReactNode }) {
  const session = await getUser()
  if (!session) {
    redirect("/auth/signin")
  }
  return (
    <main className="flex flex-col items-center justify-center h-screen">
      {children}
    </main>
  )
}
