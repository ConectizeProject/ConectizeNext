import { useEffect, useState } from "react";

export function useAuth() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Simulação de autenticação
    const fakeUser = { id: 1, name: "Usuário Teste" };
    setUser(fakeUser);
  }, []);

  return { user };
}
