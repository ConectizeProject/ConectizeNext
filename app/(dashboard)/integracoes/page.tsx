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
import { createClient } from "@/lib/supabase/client";
import { Database } from "@/types/supabase";
import { getAuthorizationUrl } from "@/utils/integrations/mercadolivre";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  FaAmazon,
  FaEdit,
  FaMoneyBillWave,
  FaPlus,
  FaToggleOff,
  FaToggleOn,
} from "react-icons/fa";
import { SiShopee } from "react-icons/si";
import { toast } from "sonner";

type Company = Database["public"]["Tables"]["companies"]["Row"] & {
  integrations: Database["public"]["Tables"]["integrations"]["Row"][];
};

type Integration = Database["public"]["Tables"]["integrations"]["Row"];

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
  companyId,
}: {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  onConfirm: (companyId: string) => void;
  companyId: string;
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
          <Button onClick={() => onConfirm(companyId)}>Continuar</Button>
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

export default function Integracoes() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [companies, setCompanies] = useState<Company[]>([]);
  const [showInactive, setShowInactive] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const supabase = createClient();

  const availableIntegrations = [
    {
      id: "mercadolivre",
      title: "Mercado Livre",
      description: "Integre seu catálogo e gerencie pedidos do Mercado Livre",
      icon: <FaMoneyBillWave />,
    },
    {
      id: "shopee",
      title: "Shopee",
      description: "Integre seu catálogo e gerencie pedidos da Shopee",
      icon: <SiShopee />,
    },
    {
      id: "amazon",
      title: "Amazon",
      description: "Integre seu catálogo e gerencie pedidos da Amazon",
      icon: <FaAmazon />,
    },
  ];

  useEffect(() => {
    fetchCompanies();
  }, []);

  useEffect(() => {
    const code = searchParams.get("code");
    const error = searchParams.get("error");

    if (error) {
      toast.error(error);
      router.replace("/integracoes");
    } else if (code) {
      // O token será processado pelo endpoint da API
      // Redirecionar para a página de integrações sem o código
      router.replace("/integracoes");
    }
  }, [searchParams, router]);

  const fetchCompanies = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      const { data: companiesData, error } = await supabase
        .from("companies")
        .select(
          `
          *,
          integrations (*)
        `
        )
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;

      setCompanies(companiesData || []);
    } catch (error) {
      console.error("Erro ao buscar empresas:", error);
      toast.error("Erro ao carregar empresas");
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewCompany = () => {
    router.push("/empresas/novo");
  };

  const handleEditCompany = (companyId: string) => {
    router.push(`/empresas/${companyId}`);
  };

  const handleToggleCompany = async (
    companyId: string,
    currentStatus: boolean
  ) => {
    try {
      const { error } = await supabase
        .from("companies")
        .update({ enabled: !currentStatus })
        .eq("id", companyId);

      if (error) throw error;

      toast.success(
        `Empresa ${currentStatus ? "desativada" : "ativada"} com sucesso`
      );
      fetchCompanies();
    } catch (error) {
      console.error("Erro ao alterar status da empresa:", error);
      toast.error("Erro ao alterar status da empresa");
    }
  };

  const handleConnect = async (companyId: string, platform: string) => {
    try {
      if (platform === "mercadolivre") {
        // Redirecionar para a página de autorização do Mercado Livre
        const authUrl = await getAuthorizationUrl(companyId);
        window.location.href = authUrl;
      } else {
        toast.error("Plataforma não suportada");
      }
    } catch (error) {
      console.error("Erro ao iniciar conexão:", error);
      toast.error("Erro ao iniciar conexão");
    }
  };

  const handleManage = (companyId: string, integrationId: string) => {
    router.push(`/integracoes/${integrationId}`);
  };

  const activeCompanies = companies.filter((company) => company.enabled);
  const inactiveCompanies = companies.filter((company) => !company.enabled);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Integrações</h1>
        <Button onClick={handleNewCompany}>
          <FaPlus className="mr-2" />
          Nova Empresa
        </Button>
      </div>

      {companies.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold mb-4">
            Nenhuma empresa cadastrada
          </h2>
          <p className="text-gray-600 mb-6">
            Para começar a usar as integrações, você precisa cadastrar uma
            empresa.
          </p>
          <Button onClick={handleNewCompany}>
            <FaPlus className="mr-2" />
            Cadastrar Empresa
          </Button>
        </div>
      ) : (
        <>
          {/* Empresas Ativas */}
          <div className="space-y-8">
            {activeCompanies.map((company) => (
              <div key={company.id} className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h2 className="text-xl font-semibold">
                      {company.nome_fantasia}
                    </h2>
                    <p className="text-gray-600">{company.razao_social}</p>
                    <p className="text-sm text-gray-500">
                      CNPJ: {company.cnpj}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditCompany(company.id)}
                    >
                      <FaEdit className="mr-2" />
                      Editar
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        handleToggleCompany(company.id, company.enabled)
                      }
                    >
                      <FaToggleOn className="mr-2" />
                      Desativar
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {availableIntegrations.map((integration) => {
                    const existingIntegration = company.integrations?.find(
                      (i) => i.platform === integration.id
                    );

                    return (
                      <Card key={integration.id} className="w-full">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-2xl">
                              {integration.icon}
                            </div>
                            <CardTitle className="text-xl">
                              {integration.title}
                            </CardTitle>
                          </div>
                          <div
                            className={`px-2 py-1 text-xs rounded-full ${
                              existingIntegration?.status === "conectado"
                                ? "bg-green-100 text-green-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {existingIntegration?.status === "conectado"
                              ? "Conectado"
                              : "Desconectado"}
                          </div>
                        </CardHeader>
                        <CardContent>
                          <CardDescription className="text-sm text-gray-500">
                            {integration.description}
                          </CardDescription>
                        </CardContent>
                        <CardFooter>
                          <Button
                            variant={
                              existingIntegration ? "outline" : "default"
                            }
                            className="w-full"
                            onClick={() =>
                              existingIntegration
                                ? handleManage(
                                    company.id,
                                    existingIntegration.id
                                  )
                                : handleConnect(company.id, integration.id)
                            }
                          >
                            {existingIntegration ? "Gerenciar" : "Conectar"}
                          </Button>
                        </CardFooter>
                      </Card>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Botão para mostrar empresas inativas */}
          {inactiveCompanies.length > 0 && (
            <div className="mt-8 text-center">
              <Button
                variant="outline"
                onClick={() => setShowInactive(!showInactive)}
              >
                {showInactive
                  ? "Ocultar Empresas Inativas"
                  : "Mostrar Empresas Inativas"}
              </Button>
            </div>
          )}

          {/* Empresas Inativas */}
          {showInactive && inactiveCompanies.length > 0 && (
            <div className="mt-8 space-y-8">
              <h3 className="text-xl font-semibold text-gray-500">
                Empresas Inativas
              </h3>
              {inactiveCompanies.map((company) => (
                <div
                  key={company.id}
                  className="bg-gray-50 rounded-lg shadow p-6"
                >
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <h2 className="text-xl font-semibold text-gray-600">
                        {company.nome_fantasia}
                      </h2>
                      <p className="text-gray-500">{company.razao_social}</p>
                      <p className="text-sm text-gray-400">
                        CNPJ: {company.cnpj}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditCompany(company.id)}
                      >
                        <FaEdit className="mr-2" />
                        Editar
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          handleToggleCompany(company.id, company.enabled)
                        }
                      >
                        <FaToggleOff className="mr-2" />
                        Ativar
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {availableIntegrations.map((integration) => {
                      const existingIntegration = company.integrations?.find(
                        (i) => i.platform === integration.id
                      );

                      return (
                        <Card
                          key={integration.id}
                          className="w-full bg-gray-50"
                        >
                          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-2xl text-gray-500">
                                {integration.icon}
                              </div>
                              <CardTitle className="text-xl text-gray-600">
                                {integration.title}
                              </CardTitle>
                            </div>
                            <div
                              className={`px-2 py-1 text-xs rounded-full ${
                                existingIntegration?.status === "conectado"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-gray-200 text-gray-600"
                              }`}
                            >
                              {existingIntegration?.status === "conectado"
                                ? "Conectado"
                                : "Desconectado"}
                            </div>
                          </CardHeader>
                          <CardContent>
                            <CardDescription className="text-sm text-gray-500">
                              {integration.description}
                            </CardDescription>
                          </CardContent>
                          <CardFooter>
                            <Button
                              variant={
                                existingIntegration ? "outline" : "default"
                              }
                              className="w-full"
                              disabled={!company.enabled}
                              onClick={() =>
                                existingIntegration
                                  ? handleManage(
                                      company.id,
                                      existingIntegration.id
                                    )
                                  : handleConnect(company.id, integration.id)
                              }
                            >
                              {existingIntegration ? "Gerenciar" : "Conectar"}
                            </Button>
                          </CardFooter>
                        </Card>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* Integrações sem vínculo com empresa */}
      <div className="mt-12">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-semibold">
                Integrações Independentes
              </h2>
              <p className="text-gray-600">
                Conecte suas integrações sem vincular a uma empresa
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {availableIntegrations.map((integration) => (
              <Card key={integration.id} className="w-full">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-2xl">
                      {integration.icon}
                    </div>
                    <CardTitle className="text-xl">
                      {integration.title}
                    </CardTitle>
                  </div>
                  <div className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800">
                    Desconectado
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm text-gray-500">
                    {integration.description}
                  </CardDescription>
                </CardContent>
                <CardFooter>
                  <Button
                    variant="default"
                    className="w-full"
                    onClick={() => handleConnect("independent", integration.id)}
                  >
                    Conectar
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
