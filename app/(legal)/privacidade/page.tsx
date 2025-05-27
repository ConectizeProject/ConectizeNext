export default function PrivacidadePage() {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Política de Privacidade</h1>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">1. Introdução</h2>
          <p className="text-muted-foreground">
            A ConectizeApp valoriza sua privacidade e está comprometida em
            proteger seus dados pessoais. Esta política descreve como coletamos,
            usamos e protegemos suas informações.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">2. Dados Coletados</h2>
          <p className="text-muted-foreground">
            Coletamos os seguintes tipos de dados:
          </p>
          <ul className="list-disc pl-6 mt-4 space-y-2 text-muted-foreground">
            <li>Informações de cadastro (nome, email, telefone)</li>
            <li>Dados de negócio (CNPJ, endereço)</li>
            <li>Dados de marketplaces conectados</li>
            <li>Informações de pagamento</li>
            <li>Dados de uso da plataforma</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">3. Uso dos Dados</h2>
          <p className="text-muted-foreground">Utilizamos seus dados para:</p>
          <ul className="list-disc pl-6 mt-4 space-y-2 text-muted-foreground">
            <li>Fornecer e melhorar nossos serviços</li>
            <li>Processar pagamentos</li>
            <li>Enviar comunicações importantes</li>
            <li>Personalizar sua experiência</li>
            <li>Gerar relatórios e análises</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">
            4. Compartilhamento de Dados
          </h2>
          <p className="text-muted-foreground">
            Seus dados podem ser compartilhados com:
          </p>
          <ul className="list-disc pl-6 mt-4 space-y-2 text-muted-foreground">
            <li>Marketplaces integrados</li>
            <li>Processadores de pagamento</li>
            <li>Prestadores de serviços terceirizados</li>
            <li>Autoridades legais (quando exigido por lei)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">
            5. Segurança dos Dados
          </h2>
          <p className="text-muted-foreground">
            Implementamos medidas de segurança robustas:
          </p>
          <ul className="list-disc pl-6 mt-4 space-y-2 text-muted-foreground">
            <li>Criptografia de dados em trânsito e em repouso</li>
            <li>Controles de acesso rigorosos</li>
            <li>Monitoramento contínuo de segurança</li>
            <li>Backups regulares</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">6. Seus Direitos</h2>
          <p className="text-muted-foreground">Você tem o direito de:</p>
          <ul className="list-disc pl-6 mt-4 space-y-2 text-muted-foreground">
            <li>Acessar seus dados pessoais</li>
            <li>Corrigir dados imprecisos</li>
            <li>Solicitar a exclusão de dados</li>
            <li>Revogar consentimentos</li>
            <li>Exportar seus dados</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">
            7. Cookies e Tecnologias Similares
          </h2>
          <p className="text-muted-foreground">
            Utilizamos cookies e tecnologias similares para:
          </p>
          <ul className="list-disc pl-6 mt-4 space-y-2 text-muted-foreground">
            <li>Manter sua sessão ativa</li>
            <li>Melhorar a segurança</li>
            <li>Analisar o uso da plataforma</li>
            <li>Personalizar sua experiência</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">
            8. Alterações na Política
          </h2>
          <p className="text-muted-foreground">
            Esta política pode ser atualizada periodicamente. Notificaremos
            sobre alterações significativas por email ou através da plataforma.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">9. Contato</h2>
          <p className="text-muted-foreground">
            Para questões sobre privacidade, entre em contato:
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
