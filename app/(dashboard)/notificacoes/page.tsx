"use client";

import { NotificationList } from "@/components/NotificationList";

export default function Notificacoes() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Notificações</h1>
        <p className="text-muted-foreground mt-2">
          Acompanhe suas notificações mais recentes
        </p>
      </div>

      <div className="rounded-lg border bg-card">
        <div className="p-6">
          <NotificationList />
        </div>
      </div>
    </div>
  );
}
