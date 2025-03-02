"use client";

import { NotificationList } from "@/components/NotificationList";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bell } from "lucide-react";
import { useRouter } from "next/navigation";

export function NotificationDropdown() {
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.push("/notificacoes")}
        >
          <Bell className="h-5 w-5" />
          <span className="sr-only">Notificações</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <h3 className="font-medium">Notificações</h3>
            <p className="text-xs text-muted-foreground">
              Suas notificações mais recentes
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <NotificationList />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
