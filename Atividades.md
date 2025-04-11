[ x ] Exemplo de check

[ x ] Criar migration para lista de produtos que contenha - Titulo - Descrição - fotos (Lista de fotos) - sku - preço - dados fiscais (ncm, cest)

[ x ] Criar migration para credencial de integração, generico, com o origin que pode ser mercado livre, mercadopago, shopee, amazon... , armazenando os dados basicos como token, refresh token... e o que mais for necessario de acordo com a documentação de cada uma dessas plataformas

[ x ] Criar migration de produto de integração, que recebe o origin de como mercadolivre, shoopee.. de forma mais generica, com titulo, sku, preço e uma coluna que guarde um json com o objeto do produto que é retornado pelo marktplace e possibilite uma referencia a tabela de produto

[ x ] Criar migration para vendas, também com o origin, e o id da venda, e uma referencia aos produtos de integração vendidos, que armazene também o json completo que o marketplace envia.

[ x ] Criar migration para notificações, com o origin e um modelo padão para usar para vendas, mensagens de cliente, devoluções

[ x ] Adicionar ao menu lateral o item mensagens e criar uma tela com um chat para responder os clientes

[ x ] Melhorar página inicial do sistema, incluindo mais blocos com informações como " ferramentas que otimizam seu dia a dia, tornando sua operação mais ágil e lucrativa, fácil de usar, varios marketplaces, controle de estoque, melhore e replique anuncios, gestão em massa, perguntas. relatorios, gestão financeira"

[ x ] Se o usuário estiver logado, ao acessar a página inicial, redirecionar para a logada, assim como já é feito na tela de login.

[ x ] deixe a interface da aplicação logada mais bonita e consistente

[ x ] Passe a usar o formik com yup em todos os formularios como padrão
