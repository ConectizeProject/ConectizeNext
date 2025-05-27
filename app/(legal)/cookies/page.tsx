export default function CookiesPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Política de Cookies</h1>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">1. O que são Cookies?</h2>
          <p className="text-muted-foreground">
            Cookies são pequenos arquivos de texto armazenados no seu
            dispositivo quando você visita nosso site. Eles nos ajudam a
            melhorar sua experiência, entender como você usa nossa plataforma e
            personalizar o conteúdo.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">
            2. Tipos de Cookies que Utilizamos
          </h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-medium mb-2">Cookies Essenciais</h3>
              <p className="text-muted-foreground">
                Necessários para o funcionamento básico da plataforma:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-2 text-muted-foreground">
                <li>Autenticação e segurança</li>
                <li>Preferências de idioma</li>
                <li>Funcionalidades básicas</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-medium mb-2">
                Cookies de Desempenho
              </h3>
              <p className="text-muted-foreground">
                Nos ajudam a entender como os usuários interagem com a
                plataforma:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-2 text-muted-foreground">
                <li>Análise de tráfego</li>
                <li>Identificação de erros</li>
                <li>Melhorias de performance</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-medium mb-2">
                Cookies de Funcionalidade
              </h3>
              <p className="text-muted-foreground">
                Permitem funcionalidades avançadas e personalização:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-2 text-muted-foreground">
                <li>Preferências de usuário</li>
                <li>Configurações salvas</li>
                <li>Personalização de interface</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">
            3. Como Gerenciar Cookies
          </h2>
          <p className="text-muted-foreground">
            Você pode controlar e/ou excluir cookies conforme desejar. Você
            pode:
          </p>
          <ul className="list-disc pl-6 mt-4 space-y-2 text-muted-foreground">
            <li>Excluir todos os cookies já armazenados</li>
            <li>Configurar seu navegador para bloquear cookies</li>
            <li>
              Configurar seu navegador para alertar quando um cookie é enviado
            </li>
          </ul>
          <p className="mt-4 text-muted-foreground">
            Para mais informações sobre como gerenciar cookies em seu navegador,
            consulte as configurações do seu navegador.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">
            4. Cookies de Terceiros
          </h2>
          <p className="text-muted-foreground">
            Utilizamos alguns serviços de terceiros que podem configurar
            cookies:
          </p>
          <ul className="list-disc pl-6 mt-4 space-y-2 text-muted-foreground">
            <li>Google Analytics (análise de uso)</li>
            <li>Hotjar (análise de comportamento)</li>
            <li>Intercom (suporte ao cliente)</li>
            <li>Stripe (processamento de pagamentos)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">
            5. Duração dos Cookies
          </h2>
          <p className="text-muted-foreground">
            Os cookies podem permanecer no seu dispositivo por diferentes
            períodos:
          </p>
          <ul className="list-disc pl-6 mt-4 space-y-2 text-muted-foreground">
            <li>Cookies de sessão: expiram quando você fecha o navegador</li>
            <li>Cookies persistentes: permanecem por um período definido</li>
            <li>
              Cookies de autenticação: duram enquanto sua sessão estiver ativa
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">
            6. Atualizações desta Política
          </h2>
          <p className="text-muted-foreground">
            Podemos atualizar esta política periodicamente para refletir
            mudanças em nossas práticas de cookies. Recomendamos que você revise
            esta política regularmente para se manter informado sobre como
            estamos usando cookies.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">7. Contato</h2>
          <p className="text-muted-foreground">
            Para questões sobre nossa política de cookies, entre em contato:
          </p>
          <ul className="list-disc pl-6 mt-4 space-y-2 text-muted-foreground">
            <li>Email: privacidade@conectizeapp.com.br</li>
            <li>Telefone: (11) 99999-9999</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
