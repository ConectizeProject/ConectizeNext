export default function TermosPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Termos de Uso</h1>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">
            1. Aceitação dos Termos
          </h2>
          <p className="text-muted-foreground">
            Ao acessar e usar a plataforma ConectizeApp, você concorda em
            cumprir e estar vinculado aos seguintes termos e condições. Se você
            não concordar com qualquer parte destes termos, não poderá acessar a
            plataforma.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">
            2. Descrição do Serviço
          </h2>
          <p className="text-muted-foreground">
            A ConectizeApp é uma plataforma de gestão de marketplaces que
            oferece ferramentas para:
          </p>
          <ul className="list-disc pl-6 mt-4 space-y-2 text-muted-foreground">
            <li>Gestão de estoque e pedidos</li>
            <li>Integração com múltiplos marketplaces</li>
            <li>Análise de dados e relatórios</li>
            <li>Gestão financeira</li>
            <li>Emissão de etiquetas de envio</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">3. Conta do Usuário</h2>
          <p className="text-muted-foreground">
            Para usar a plataforma, você deve:
          </p>
          <ul className="list-disc pl-6 mt-4 space-y-2 text-muted-foreground">
            <li>Fornecer informações precisas e atualizadas</li>
            <li>Manter a confidencialidade de sua senha</li>
            <li>Ser responsável por todas as atividades em sua conta</li>
            <li>Notificar imediatamente qualquer uso não autorizado</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">
            4. Planos e Pagamentos
          </h2>
          <p className="text-muted-foreground">
            Os planos disponíveis incluem:
          </p>
          <ul className="list-disc pl-6 mt-4 space-y-2 text-muted-foreground">
            <li>Plano Básico: R$ 70/mês</li>
            <li>Plano Intermediário: R$ 150/mês</li>
            <li>Plano Premium: R$ 250/mês</li>
            <li>Plano Avançado: R$ 400/mês</li>
          </ul>
          <p className="mt-4 text-muted-foreground">
            O pagamento é realizado mensalmente, e você pode cancelar a qualquer
            momento. Não oferecemos reembolso por períodos não utilizados.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">5. Uso Aceitável</h2>
          <p className="text-muted-foreground">Você concorda em não:</p>
          <ul className="list-disc pl-6 mt-4 space-y-2 text-muted-foreground">
            <li>Usar a plataforma para atividades ilegais</li>
            <li>Interferir na segurança ou funcionamento da plataforma</li>
            <li>Compartilhar sua conta com terceiros</li>
            <li>Usar bots ou scripts automatizados sem autorização</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">
            6. Limitação de Responsabilidade
          </h2>
          <p className="text-muted-foreground">
            A ConectizeApp não será responsável por:
          </p>
          <ul className="list-disc pl-6 mt-4 space-y-2 text-muted-foreground">
            <li>Perdas de dados ou interrupções do serviço</li>
            <li>Danos indiretos ou consequenciais</li>
            <li>Problemas com marketplaces terceiros</li>
            <li>Erros em dados importados ou exportados</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">
            7. Modificações nos Termos
          </h2>
          <p className="text-muted-foreground">
            Reservamos o direito de modificar estes termos a qualquer momento.
            Alterações significativas serão notificadas por email ou através da
            plataforma.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">8. Contato</h2>
          <p className="text-muted-foreground">
            Para questões sobre estes termos, entre em contato através de:
          </p>
          <ul className="list-disc pl-6 mt-4 space-y-2 text-muted-foreground">
            <li>Email: contato@conectizeapp.com.br</li>
            <li>Telefone: (11) 99999-9999</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
