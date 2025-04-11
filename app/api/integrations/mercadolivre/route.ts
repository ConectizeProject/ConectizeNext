import { getAccessToken } from '@/utils/integrations/mercadolivre';
import { NextRequest, NextResponse } from 'next/server';

/**
 * API route para processar o código de autorização do Mercado Livre
 * 
 * Esta rota recebe o código de autorização, obtém o token de acesso
 * e o armazena no banco de dados associado ao usuário.
 */
export async function POST(request: NextRequest) {
  try {
    // Obter o código de autorização do corpo da requisição
    const body = await request.json();
    const { code } = body;

    if (!code) {
      return NextResponse.json({ error: 'Código de autorização não fornecido' }, { status: 400 });
    }

    // Obter o token de acesso
    const tokenData = await getAccessToken(code);

    // Em um ambiente real, você salvaria o token no banco de dados
    // associado ao usuário atual
    console.log('Token obtido com sucesso:', tokenData);

    // Por enquanto, apenas retornamos uma resposta de sucesso
    // sem incluir dados sensíveis como o token
    return NextResponse.json({ 
      success: true,
      message: 'Integração com Mercado Livre realizada com sucesso',
      user_id: tokenData.user_id
    });
  } catch (error) {
    console.error('Erro ao processar código de autorização do Mercado Livre:', error);
    
    return NextResponse.json({ 
      error: 'Falha ao processar a integração com o Mercado Livre' 
    }, { 
      status: 500 
    });
  }
}
