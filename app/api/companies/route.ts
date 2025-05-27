import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  try {
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const { data: companies, error } = await supabase
      .from('companies')
      .select(`
        *,
        integrations (*)
      `)
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching companies:', error)
      return new NextResponse('Internal Server Error', { status: 500 })
    }

    return NextResponse.json(companies)
  } catch (error) {
    console.error('Error fetching companies:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const body = await request.json()
    const { razao_social, nome_fantasia, cnpj, inscricao_estadual, is_optante, inscricao_municipal } = body

    const { data: company, error } = await supabase
      .from('companies')
      .insert({
        user_id: user.id,
        razao_social,
        nome_fantasia,
        cnpj,
        inscricao_estadual,
        is_optante,
        inscricao_municipal,
      })
      .select()
      .single()

    if (error) {
      console.error('Error creating company:', error)
      return new NextResponse('Internal Server Error', { status: 500 })
    }

    return NextResponse.json(company)
  } catch (error) {
    console.error('Error creating company:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
} 