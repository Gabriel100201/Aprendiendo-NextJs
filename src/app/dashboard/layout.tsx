import { redirect } from "next/navigation";
import { UserInfoComponent } from "./components/UserInfoComponent";
import { getSession } from "@/lib/auth-utils";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession();
  const user = session?.user;

  if (!session) {
    redirect("/login");
  }

  return (
    <html lang="en">
      <main className="flex flex-col gap-5 px-8 py-8">
        <UserInfoComponent userInfo={user!}/>
        {children}
      </main>
    </html>
  );
}
