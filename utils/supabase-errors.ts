export function translateSupabaseError(code: string | undefined): string {
  if (!code) return "Ocorreu um erro inesperado";

  const errorMessages: { [key: string]: string } = {
    // Erros de autenticação
    invalid_credentials: "Credenciais de login inválidas",
    user_not_found: "Usuário não encontrado",
    invalid_claim: "Email não confirmado",
    email_not_confirmed: "Email não confirmado",

    // Erros de email
    invalid_email: "Email inválido",
    email_taken: "Este email já está em uso",
    email_signup_disabled: "O cadastro com email está desativado",

    // Erros de usuário
    user_already_registered: "Este email já está registrado",
    user_already_exists: "Este email já está em uso",

    // Erros de senha
    weak_password: "A senha é muito fraca",
    invalid_password: "Senha inválida",
    password_too_short: "A senha deve ter pelo menos 6 caracteres",
    password_too_weak:
      "A senha deve conter letras maiúsculas, minúsculas e números",
    password_not_match: "As senhas não conferem",

    // Erros de limite de tentativas
    password_recovery_rate_limit_exceeded:
      "Muitas tentativas de recuperação. Por favor, tente novamente mais tarde",
    auth_rate_limit_exceeded:
      "Muitas tentativas. Por favor, tente novamente mais tarde",
    rate_limit_exceeded:
      "Muitas tentativas. Por favor, tente novamente mais tarde",
    too_many_attempts:
      "Muitas tentativas. Por favor, tente novamente mais tarde",

    // Erros de token
    expired_token: "O link de acesso expirou. Por favor, solicite um novo",
    invalid_token: "Link de acesso inválido",
    token_expired: "O link de acesso expirou. Por favor, solicite um novo",
    token_invalid: "Link de acesso inválido",
    token_not_found: "Link de acesso não encontrado",
    token_refreshed: "Sua sessão foi atualizada",

    // Erros de OAuth
    oauth_error: "Erro ao tentar fazer login com provedor externo",
    oauth_provider_error: "Erro no provedor de autenticação",
    oauth_access_denied: "Acesso negado pelo provedor de autenticação",
    oauth_invalid_state: "Estado inválido na autenticação externa",
    oauth_missing_code: "Código de autenticação não fornecido",

    // Erros de sessão
    session_expired: "Sua sessão expirou. Por favor, faça login novamente",
    session_not_found: "Sessão não encontrada",
    session_invalid: "Sessão inválida",

    // Erros gerais
    invalid_grant: "Email ou senha inválidos",
    server_error: "Erro no servidor. Por favor, tente novamente",
    network_error: "Erro de conexão. Por favor, verifique sua internet",
    unknown_error: "Ocorreu um erro inesperado",
  };

  return errorMessages[code] || "Ocorreu um erro inesperado";
}
