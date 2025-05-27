import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const body = await request.json()
    const { razaoSocial, nomeFantasia, cnpj, inscricaoEstadual, isOptante, inscricaoMunicipal } = body

    const company = await prisma.company.update({
      where: {
        id: params.id,
        userId: session.user.id,
      },
      data: {
        razaoSocial,
        nomeFantasia,
        cnpj,
        inscricaoEstadual,
        isOptante,
        inscricaoMunicipal,
      },
    })

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
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const company = await prisma.company.update({
      where: {
        id: params.id,
        userId: session.user.id,
      },
      data: {
        enabled: false,
      },
    })

    return NextResponse.json(company)
  } catch (error) {
    console.error('Error disabling company:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
} 