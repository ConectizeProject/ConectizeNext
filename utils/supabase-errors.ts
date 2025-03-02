export function translateSupabaseError(code: string | undefined): string {
  if (!code) return "Ocorreu um erro inesperado";

  const errorMessages: { [key: string]: string } = {
    invalid_credentials: "Credenciais de login inválidas",
    user_not_found: "Usuário não encontrado",
    invalid_claim: "Email não confirmado",
    email_not_confirmed: "Email não confirmado",
    invalid_email: "Email inválido",
    email_taken: "Este email já está em uso",
    user_already_registered: "Este email já está registrado",
    password_recovery_rate_limit_exceeded:
      "Muitas tentativas de recuperação. Por favor, tente novamente mais tarde",
    auth_rate_limit_exceeded:
      "Muitas tentativas. Por favor, tente novamente mais tarde",
    rate_limit_exceeded:
      "Muitas tentativas. Por favor, tente novamente mais tarde",
    weak_password: "A senha é muito fraca",
    invalid_password: "Senha inválida",
    invalid_grant: "Email ou senha inválidos",
    password_too_short: "A senha deve ter pelo menos 6 caracteres",
  };

  return errorMessages[code] || "Ocorreu um erro inesperado";
}
