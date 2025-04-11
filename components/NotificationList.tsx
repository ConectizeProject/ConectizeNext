"use client";

import { cn } from "@/lib/utils";
import {
  CheckCircle2,
  Info,
  MessageCircle,
  Package,
  ShoppingCart,
} from "lucide-react";

// Simular notificações - depois você pode substituir por dados reais
const notifications: Notification[] = [
  {
    id: "1",
    icon: ShoppingCart,
    title: "Nova venda",
    description: "Você recebeu um novo pedido no Mercado Livre.",
    date: "há 5 minutos",
    read: false,
    type: "venda",
  },
  {
    id: "2",
    icon: MessageCircle,
    title: "Nova mensagem",
    description: "Cliente perguntou sobre disponibilidade do produto.",
    date: "há 1 hora",
    read: false,
    type: "mensagem",
  },
  {
    id: "3",
    icon: Package,
    title: "Produto despachado",
    description: "Pedido #12345 foi despachado com sucesso.",
    date: "há 3 horas",
    read: true,
    type: "envio",
  },
  {
    id: "4",
    icon: Info,
    title: "Atualização de estoque",
    description: "5 produtos estão com estoque baixo.",
    date: "há 1 dia",
    read: true,
    type: "alerta",
  },
];

type Notification = {
  id: string;
  icon: React.ElementType;
  title: string;
  description: string;
  date: string;
  read: boolean;
  type: "venda" | "mensagem" | "envio" | "alerta" | "outro";
};

const typeColors = {
  venda: "text-green-500",
  mensagem: "text-blue-500",
  envio: "text-purple-500",
  alerta: "text-amber-500",
  outro: "text-gray-500",
};

export function NotificationList() {
  return (
    <div className="max-h-96 overflow-y-auto py-1">
      {notifications.length === 0 ? (
        <div className="flex flex-col items-center py-6 px-4">
          <div className="relative h-16 w-16 mb-4 text-muted-foreground">
            <CheckCircle2 className="h-16 w-16" />
          </div>
          <p className="text-sm text-muted-foreground text-center">
            Você não tem nenhuma notificação no momento
          </p>
        </div>
      ) : (
        notifications.map((notification) => (
          <div
            key={notification.id}
            className={cn(
              "flex gap-3 px-4 py-3 hover:bg-muted transition-colors cursor-pointer",
              !notification.read && "bg-primary/5"
            )}
          >
            <div className={cn("mt-1", typeColors[notification.type])}>
              <notification.icon className="h-5 w-5" />
            </div>

            <div className="flex-1 space-y-1">
              <div className="flex items-start justify-between">
                <p
                  className={cn(
                    "text-sm font-medium leading-none",
                    !notification.read && "font-semibold"
                  )}
                >
                  {notification.title}
                </p>
                <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                  {notification.date}
                </span>
              </div>
              <p className="text-xs text-muted-foreground line-clamp-2">
                {notification.description}
              </p>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
