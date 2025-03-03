/**
 * Funções para integração com a API do Mercado Livre
 */

// URL base para autenticação com o Mercado Livre (AUTH URL)
const MELI_AUTH_URL = "https://auth.mercadolivre.com.br/authorization";
// URL base para API do Mercado Livre (diferente da URL de autenticação)
const MELI_API_URL = "https://api.mercadolibre.com";

// Parâmetros para a autenticação
const MELI_CLIENT_ID = process.env.NEXT_PUBLIC_MELI_CLIENT_ID;
const MELI_REDIRECT_URI = process.env.NEXT_PUBLIC_MELI_REDIRECT_URI;

/**
 * Gera a URL de autorização do Mercado Livre
 * @returns URL de autorização completa para o fluxo OAuth
 */
export function getAuthorizationUrl(): string {
  // Verificar se as variáveis de ambiente estão definidas
  if (!MELI_CLIENT_ID || !MELI_REDIRECT_URI) {
    throw new Error(
      "Variáveis de ambiente MELI_CLIENT_ID e MELI_REDIRECT_URI são obrigatórias"
    );
  }

  // Gerar URL de autorização exatamente conforme o formato requerido
  // Isso redireciona para a página de autorização do Mercado Livre (AUTH_URL)
  const authUrl = `${MELI_AUTH_URL}?response_type=code&client_id=${MELI_CLIENT_ID}&redirect_uri=${MELI_REDIRECT_URI}&state=$12345`;

  console.log("URL de autorização gerada:", authUrl);

  return authUrl;
}

/**
 * Obtém o token de acesso usando o código de autorização
 * @param code Código de autorização retornado pelo Mercado Livre
 * @returns Objeto com o token de acesso e informações do usuário
 */
export async function getAccessToken(code: string): Promise<{
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
  user_id: number;
  refresh_token: string;
}> {
  try {
    // Verificar se as variáveis de ambiente estão definidas
    if (!MELI_CLIENT_ID || !MELI_REDIRECT_URI) {
      throw new Error(
        "Variáveis de ambiente MELI_CLIENT_ID e MELI_REDIRECT_URI são obrigatórias"
      );
    }

    // Realizar requisição para obter o token
    const response = await fetch(`${MELI_API_URL}/oauth/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        grant_type: "authorization_code",
        client_id: MELI_CLIENT_ID,
        redirect_uri: MELI_REDIRECT_URI,
        code,
      }),
    });

    // Verificar se a requisição foi bem-sucedida
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `Erro ao obter token: ${errorData.message || response.statusText}`
      );
    }

    // Retornar dados do token
    return await response.json();
  } catch (error) {
    console.error("Erro ao obter token de acesso:", error);
    throw error;
  }
}

/**
 * Verifica se um token é válido
 * @param accessToken Token de acesso a ser verificado
 * @returns True se o token for válido, false caso contrário
 */
export async function validateToken(accessToken: string): Promise<boolean> {
  try {
    const response = await fetch(`${MELI_API_URL}/users/me`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.ok;
  } catch (error) {
    console.error("Erro ao validar token:", error);
    return false;
  }
}

/**
 * Atualiza um token expirado usando o refresh token
 * @param refreshToken Refresh token obtido anteriormente
 * @returns Novo objeto com token de acesso
 */
export async function refreshAccessToken(refreshToken: string): Promise<{
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
  user_id: number;
  refresh_token: string;
}> {
  try {
    // Verificar se as variáveis de ambiente estão definidas
    if (!MELI_CLIENT_ID) {
      throw new Error("Variável de ambiente MELI_CLIENT_ID é obrigatória");
    }

    // Realizar requisição para atualizar o token
    const response = await fetch(`${MELI_API_URL}/oauth/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        grant_type: "refresh_token",
        client_id: MELI_CLIENT_ID,
        refresh_token: refreshToken,
      }),
    });

    // Verificar se a requisição foi bem-sucedida
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `Erro ao atualizar token: ${errorData.message || response.statusText}`
      );
    }

    // Retornar dados do novo token
    return await response.json();
  } catch (error) {
    console.error("Erro ao atualizar token de acesso:", error);
    throw error;
  }
}
