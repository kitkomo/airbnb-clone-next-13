import { NextResponse } from 'next/server'

import getCurrentUser from '@/actions/getCurrentUser'
import prisma from '@/libs/prismadb'

interface Params {
	reservationId?: string
}

export const DELETE = async (req: Request, { params }: { params: Params }) => {
	const currentUser = await getCurrentUser()
	if (!currentUser) return NextResponse.error()

	const { reservationId } = params
	if (!reservationId || typeof reservationId !== 'string')
		return NextResponse.error()

	const reservation = await prisma.reservation.deleteMany({
		where: {
			id: reservationId,
			OR: [{ userId: currentUser.id }, { listing: { userId: currentUser.id } }]
		}
	})

	return NextResponse.json(reservation)
}
