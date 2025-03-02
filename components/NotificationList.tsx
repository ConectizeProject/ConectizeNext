"use client";

import Image from "next/image";

// Simular notificações - depois você pode substituir por dados reais
const notifications: Notification[] = [];

type Notification = {
  id: string;
  title: string;
  description: string;
  date: string;
  read: boolean;
};

export function NotificationList() {
  return (
    <div className="max-h-96 overflow-y-auto">
      {notifications.length === 0 ? (
        <div className="flex flex-col items-center py-6 px-4">
          <div className="relative h-24 w-24 mb-4">
            <Image
              src="/empty-notifications.svg"
              alt="Sem notificações"
              fill
              className="object-contain"
            />
          </div>
          <p className="text-sm text-muted-foreground text-center">
            Você não tem nenhuma notificação no momento
          </p>
        </div>
      ) : (
        notifications.map((notification) => (
          <div
            key={notification.id}
            className="flex flex-col gap-2 px-4 py-2 hover:bg-accent"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">{notification.title}</p>
              <span className="text-xs text-muted-foreground">
                {notification.date}
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              {notification.description}
            </p>
          </div>
        ))
      )}
    </div>
  );
}
