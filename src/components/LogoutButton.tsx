"use client"

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "./ui/button";
import { logout } from "@/lib/auth-action";

const LogoutButton = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  async function handleLogout() {
    setIsLoading(true);
    try {
      await logout();
      router.push("/login");
      router.refresh();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <Button variant={"outline"} onClick={handleLogout} disabled={isLoading}>
      {isLoading ? "Logging out..." : "Logout"}
    </Button>
  )
}

export default LogoutButton;