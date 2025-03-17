import { redirect } from "next/navigation"
import { getSession } from "@/lib/auth-utils"
import LogoutButton from "@/components/LogoutButton"

export default async function DashboardPage() {
  const session = await getSession()

  if (!session) {
    redirect("/login")
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-background shadow-sm px-6 py-3 border-b">
        <div className="flex justify-between items-center">
          <h1 className="font-bold text-xl">Dashboard</h1>
          <LogoutButton />
        </div>
      </header>

      <main className="flex-1 px-6">
        <div className="bg-card shadow-sm my-6 p-6 border rounded-lg">
          <h2 className="font-bold text-2xl">Welcome, {session.user.email}</h2>
          <p className="mt-2 text-muted-foreground">
            You are now logged in to your account.
          </p>
        </div>
      </main>
    </div>
  );
}

