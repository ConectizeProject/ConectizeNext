"use client";

import { NotificationList } from "@/components/NotificationList";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bell } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function NotificationDropdown() {
  const router = useRouter();
  const [hasUnread, setHasUnread] = useState(true);

  const handleMarkAllAsRead = () => {
    setHasUnread(false);
    // Implementação real adicionaria chamada ao backend
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {hasUnread && (
            <Badge
              className="absolute -right-1 -top-1 h-4 w-4 p-0 flex items-center justify-center bg-primary text-primary-foreground text-[10px]"
              variant="default"
            >
              •
            </Badge>
          )}
          <span className="sr-only">Notificações</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80" align="end" forceMount>
        <DropdownMenuLabel className="font-normal flex justify-between items-center">
          <div className="flex flex-col space-y-1">
            <h3 className="font-medium">Notificações</h3>
            <p className="text-xs text-muted-foreground">
              Suas notificações mais recentes
            </p>
          </div>
          {hasUnread && (
            <Button
              variant="ghost"
              size="sm"
              className="h-7 text-xs hover:bg-accent"
              onClick={handleMarkAllAsRead}
            >
              Marcar como lidas
            </Button>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <NotificationList />
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer flex justify-center text-primary text-center"
          onClick={() => router.push("/notificacoes")}
        >
          Ver todas as notificações
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
