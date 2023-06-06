import { NextResponse } from 'next/server'

import getCurrentUser from '@/actions/getCurrentUser'
import prisma from '@/libs/prismadb'

interface Params {
	listingId?: string
}

export const DELETE = async (req: Request, { params }: { params: Params }) => {
	const currentUser = await getCurrentUser()
	if (!currentUser) return NextResponse.error()

	const { listingId } = params
	if (!listingId || typeof listingId !== 'string') return NextResponse.error()

	const listings = await prisma.reservation.deleteMany({
		where: {
			id: listingId,
			userId: currentUser.id
		}
	})

	return NextResponse.json(listings)
}
