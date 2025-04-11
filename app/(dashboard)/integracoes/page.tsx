"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getAuthorizationUrl } from "@/utils/integrations/mercadolivre";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaAmazon, FaMoneyBillWave, FaStore } from "react-icons/fa";
import { SiShopee } from "react-icons/si";

// Definição da interface para as propriedades do card de integração
interface IntegrationCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  status: "conectado" | "desconectado";
  onConnect: () => void;
  onManage: () => void;
}

// Componente para cada card de integração
function IntegrationCard({
  title,
  description,
  icon,
  status,
  onConnect,
  onManage,
}: IntegrationCardProps) {
  return (
    <Card className="w-full hover:shadow-md transition-shadow duration-300">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-2xl">
            {icon}
          </div>
          <CardTitle className="text-xl">{title}</CardTitle>
        </div>
        <div
          className={`px-2 py-1 text-xs rounded-full ${
            status === "conectado"
              ? "bg-green-100 text-green-800"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          {status === "conectado" ? "Conectado" : "Desconectado"}
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-sm text-gray-500">
          {description}
        </CardDescription>
      </CardContent>
      <CardFooter>
        <Button
          variant={status === "conectado" ? "outline" : "default"}
          className="w-full"
          onClick={status === "conectado" ? onManage : onConnect}
        >
          {status === "conectado" ? "Gerenciar" : "Conectar"}
        </Button>
      </CardFooter>
    </Card>
  );
}

// Modal de confirmação
function ConfirmationModal({
  isOpen,
  onClose,
  title,
  onConfirm,
}: {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  onConfirm: () => void;
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h3 className="text-xl font-bold mb-4">Conectar com {title}</h3>
        <p className="mb-6">
          Você será redirecionado para a página de autorização do {title}.
          Deseja continuar?
        </p>
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={onConfirm}>Continuar</Button>
        </div>
      </div>
    </div>
  );
}

// Componente de notificação
function Notification({
  message,
  type = "success",
  onClose,
}: {
  message: string;
  type?: "success" | "error";
  onClose: () => void;
}) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed bottom-4 right-4 z-50 animate-slide-up">
      <div
        className={`rounded-lg shadow-lg p-4 ${
          type === "success"
            ? "bg-green-100 border-l-4 border-green-500"
            : "bg-red-100 border-l-4 border-red-500"
        }`}
      >
        <div className="flex items-center">
          <div
            className={`flex-shrink-0 ${
              type === "success" ? "text-green-500" : "text-red-500"
            }`}
          >
            {type === "success" ? (
              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </div>
          <div className="ml-3">
            <p
              className={`text-sm font-medium ${
                type === "success" ? "text-green-800" : "text-red-800"
              }`}
            >
              {message}
            </p>
          </div>
          <div className="ml-auto pl-3">
            <div className="-mx-1.5 -my-1.5">
              <button
                onClick={onClose}
                className={`inline-flex rounded-md p-1.5 ${
                  type === "success"
                    ? "text-green-500 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    : "text-red-500 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                }`}
              >
                <span className="sr-only">Fechar</span>
                <svg
                  className="h-4 w-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Definição da interface para os dados de integração
interface Integration {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  status: "conectado" | "desconectado";
}

export default function Integracoes() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Estado para armazenar as integrações
  const [integrations, setIntegrations] = useState<Integration[]>([
    {
      id: "mercado-livre",
      title: "Mercado Livre",
      description:
        "Conecte sua conta do Mercado Livre para gerenciar vendas, estoque e pedidos.",
      icon: <FaStore className="text-yellow-500" />,
      status: "desconectado",
    },
    {
      id: "mercado-pago",
      title: "MercadoPago",
      description:
        "Integre o MercadoPago para processar pagamentos e gerenciar transações.",
      icon: <FaMoneyBillWave className="text-blue-500" />,
      status: "desconectado",
    },
    {
      id: "shopee",
      title: "Shopee",
      description:
        "Sincronize seus produtos e pedidos da Shopee com a plataforma.",
      icon: <SiShopee className="text-orange-500" />,
      status: "desconectado",
    },
    {
      id: "amazon",
      title: "Amazon",
      description:
        "Gerencie seu catálogo e pedidos da Amazon diretamente na plataforma.",
      icon: <FaAmazon className="text-orange-600" />,
      status: "desconectado",
    },
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedIntegration, setSelectedIntegration] =
    useState<Integration | null>(null);
  const [notification, setNotification] = useState<{
    show: boolean;
    message: string;
    type: "success" | "error";
  }>({
    show: false,
    message: "",
    type: "success",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Verificar se há um código na URL (retorno do OAuth)
  useEffect(() => {
    const code = searchParams.get("code");
    const state = searchParams.get("state");

    if (code && state === "$12345") {
      handleMercadoLivreCallback(code);
    }
  }, [searchParams]);

  // Função para lidar com o retorno do OAuth do Mercado Livre
  const handleMercadoLivreCallback = async (code: string) => {
    try {
      setIsLoading(true);
      setError(null);

      console.log(`Código de autorização recebido: ${code}`);

      // Enviar o código para a API para obter o token
      const response = await fetch("/api/integrations/mercadolivre", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erro ao processar a integração");
      }

      // Atualizando o status da integração
      setIntegrations((prev) =>
        prev.map((integration) =>
          integration.id === "mercado-livre"
            ? { ...integration, status: "conectado" }
            : integration
        )
      );

      // Mostrando notificação de sucesso
      showNotification(
        data.message || "Integração com Mercado Livre realizada com sucesso!"
      );

      // Removendo o código da URL para não processar novamente em caso de refresh
      const newUrl = window.location.pathname;
      window.history.replaceState({}, document.title, newUrl);
    } catch (error) {
      console.error("Erro ao processar código de autorização:", error);
      setError(
        error instanceof Error
          ? error.message
          : "Erro ao conectar com Mercado Livre"
      );
      showNotification(
        "Erro ao conectar com Mercado Livre. Tente novamente.",
        "error"
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Função para abrir o modal de confirmação
  const handleConnect = (integration: Integration) => {
    setSelectedIntegration(integration);
    setModalOpen(true);
  };

  // Função para fechar o modal
  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedIntegration(null);
  };

  // Função para mostrar notificação
  const showNotification = (
    message: string,
    type: "success" | "error" = "success"
  ) => {
    setNotification({
      show: true,
      message,
      type,
    });
  };

  // Função para fechar notificação
  const closeNotification = () => {
    setNotification((prev) => ({ ...prev, show: false }));
  };

  // Função para confirmar a conexão
  const handleConfirmConnect = async () => {
    if (!selectedIntegration) return;

    // Fechar o modal
    handleCloseModal();

    try {
      // Direcionar para a URL de autorização apropriada com base na integração
      if (selectedIntegration.id === "mercado-livre") {
        // Limpar qualquer erro anterior
        setError(null);

        // Obter URL de autorização do Mercado Livre
        const authUrl = getAuthorizationUrl();

        console.log(
          "Redirecionando para URL de autorização do Mercado Livre:",
          authUrl
        );

        // Mostrar o estado de carregamento brevemente
        setIsLoading(true);

        // Se o redirecionamento não ocorrer em 3 segundos, mostramos uma mensagem com link
        const redirectTimeout = setTimeout(() => {
          setIsLoading(false);
          setError(
            `Se você não foi redirecionado automaticamente, <a href="${authUrl}" target="_blank" rel="noopener noreferrer" class="text-blue-600 underline font-medium">clique aqui para acessar a página de autorização do Mercado Livre</a>`
          );
        }, 3000);

        // Tentar redirecionar
        try {
          // Forçar redirecionamento usando window.location.assign para a URL de auth
          window.location.assign(authUrl);

          // Como medida adicional de segurança, também definimos o href
          window.location.href = authUrl;
        } catch (redirectError) {
          // Se houver erro no redirecionamento, mostrar mensagem imediatamente
          clearTimeout(redirectTimeout);
          setIsLoading(false);
          setError(
            `Não foi possível redirecionar automaticamente. <a href="${authUrl}" target="_blank" rel="noopener noreferrer" class="text-blue-600 underline font-medium">Clique aqui para acessar a página de autorização do Mercado Livre</a>`
          );
          console.error("Erro no redirecionamento:", redirectError);
        }
      } else {
        // Para outras integrações, simulamos a conexão (por enquanto)
        setTimeout(() => {
          setIntegrations((prevIntegrations) =>
            prevIntegrations.map((integration) =>
              integration.id === selectedIntegration.id
                ? { ...integration, status: "conectado" }
                : integration
            )
          );

          showNotification(
            `Integração com ${selectedIntegration.title} realizada com sucesso!`
          );
        }, 1000);
      }
    } catch (error) {
      console.error(
        `Erro ao conectar com ${selectedIntegration.title}:`,
        error
      );
      setIsLoading(false);
      showNotification(
        `Erro ao conectar com ${selectedIntegration.title}. Tente novamente.`,
        "error"
      );
    }
  };

  // Função para gerenciar uma integração conectada
  const handleManage = (integration: Integration) => {
    console.log(`Gerenciando ${integration.title}...`);
    // Aqui você poderia abrir um modal com opções de gerenciamento ou redirecionar para uma página
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Integrações</h1>
        <Button variant="outline">Atualizar</Button>
      </div>

      {isLoading && (
        <div className="rounded-lg border p-4 bg-blue-50">
          <div className="flex items-center space-x-3">
            <svg
              className="animate-spin h-5 w-5 text-blue-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <p className="text-blue-600">
              Preparando redirecionamento para autorização...
            </p>
          </div>
        </div>
      )}

      {error && !isLoading && (
        <div className="rounded-lg border border-red-300 p-4 bg-red-50">
          <div className="flex items-center space-x-3">
            <svg
              className="h-5 w-5 text-red-500 flex-shrink-0"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
            <div
              className="text-red-700"
              dangerouslySetInnerHTML={{ __html: error }}
            />
          </div>
        </div>
      )}

      <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-4 mb-6">
        <h2 className="text-lg font-medium text-yellow-800 mb-2">
          Processo de Autorização
        </h2>
        <p className="text-sm text-yellow-700 mb-2">
          Para conectar com o Mercado Livre, você será redirecionado para a
          página de autorização oficial. Após conceder permissão, você retornará
          automaticamente para esta página com sua integração ativada.
        </p>
        <p className="text-sm text-yellow-700">
          Certifique-se de estar logado na sua conta do Mercado Livre antes de
          iniciar a integração.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {integrations.map((integration) => (
          <IntegrationCard
            key={integration.id}
            title={integration.title}
            description={integration.description}
            icon={integration.icon}
            status={integration.status}
            onConnect={() => handleConnect(integration)}
            onManage={() => handleManage(integration)}
          />
        ))}
      </div>

      {selectedIntegration && (
        <ConfirmationModal
          isOpen={modalOpen}
          onClose={handleCloseModal}
          title={selectedIntegration.title}
          onConfirm={handleConfirmConnect}
        />
      )}

      {notification.show && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={closeNotification}
        />
      )}
    </div>
  );
}
