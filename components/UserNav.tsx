"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useSupabase } from "@/hooks/useSupabase";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function UserNav() {
  const router = useRouter();
  const { session } = useSupabase();
  const [initials, setInitials] = useState("");

  useEffect(() => {
    if (session?.user?.email) {
      const email = session.user.email;
      setInitials(email[0].toUpperCase());
    }
  }, [session]);

  return (
    <Button
      variant="ghost"
      size="icon"
      className="relative h-8 w-8 rounded-full"
      onClick={() => router.push("/configuracoes")}
    >
      <Avatar className="h-8 w-8">
        <AvatarFallback>{initials}</AvatarFallback>
      </Avatar>
    </Button>
  );
}
