import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
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
      .update({
        razao_social,
        nome_fantasia,
        cnpj,
        inscricao_estadual,
        is_optante,
        inscricao_municipal,
      })
      .eq('id', params.id)
      .eq('user_id', user.id)
      .select()
      .single()

    if (error) {
      console.error('Error updating company:', error)
      return new NextResponse('Internal Server Error', { status: 500 })
    }

    return NextResponse.json(company)
  } catch (error) {
    console.error('Error updating company:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const { data: company, error } = await supabase
      .from('companies')
      .update({ enabled: false })
      .eq('id', params.id)
      .eq('user_id', user.id)
      .select()
      .single()

    if (error) {
      console.error('Error disabling company:', error)
      return new NextResponse('Internal Server Error', { status: 500 })
    }

    return NextResponse.json(company)
  } catch (error) {
    console.error('Error disabling company:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
} 