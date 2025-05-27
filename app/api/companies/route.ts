import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const companies = await prisma.company.findMany({
      where: {
        userId: session.user.id,
      },
      include: {
        integrations: true,
      },
    })

    return NextResponse.json(companies)
  } catch (error) {
    console.error('Error fetching companies:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const body = await request.json()
    const { razaoSocial, nomeFantasia, cnpj, inscricaoEstadual, isOptante, inscricaoMunicipal } = body

    const company = await prisma.company.create({
      data: {
        userId: session.user.id,
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
    console.error('Error creating company:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
} 