import { createClient } from '@/lib/supabase/server'
import { getAccessToken } from '@/utils/integrations/mercadolivre'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const code = searchParams.get('code')
    const state = searchParams.get('state')

    if (!code) {
      // Redirecionar para a página de integrações com mensagem de erro
      const url = new URL('/integracoes', request.url)
      url.searchParams.set('error', 'Código é obrigatório')
      return NextResponse.redirect(url)
    }

    // Obter o token de acesso
    const tokenData = await getAccessToken(code)

    // Criar cliente do Supabase
    const supabase = await createClient()

    // Inserir os dados da integração no banco
    const { error } = await supabase.from('integrations').insert({
      platform: 'mercadolivre',
      token: tokenData.access_token,
      refresh_token: tokenData.refresh_token,
      expires_in: tokenData.expires_in,
      request: tokenData,
      company_id: state || null, // Se não tiver state, é uma integração independente
      status: 'conectado'
    })

    if (error) {
      console.error('Erro ao salvar integração:', error)
      // Redirecionar para a página de integrações com mensagem de erro
      const url = new URL('/integracoes', request.url)
      url.searchParams.set('error', 'Erro ao salvar integração')
      return NextResponse.redirect(url)
    }

    // Redirecionar para a página de integrações
    return NextResponse.redirect(new URL('/integracoes', request.url))
  } catch (error) {
    console.error('Erro no callback do Mercado Livre:', error)
    // Redirecionar para a página de integrações com mensagem de erro
    const url = new URL('/integracoes', request.url)
    url.searchParams.set('error', 'Erro ao processar callback')
    return NextResponse.redirect(url)
  }
} 