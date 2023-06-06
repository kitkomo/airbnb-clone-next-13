import prisma from '@/libs/prismadb'

interface Params {
	listingId?: string
	userId?: string
	authorId?: string
}

const getReservations = async (params: Params) => {
	try {
		const { listingId, authorId, userId } = params
		const query: any = {}

		if (listingId) query.listingId = listingId
		if (userId) query.userId = userId
		if (authorId) query.listing = { userId: authorId }

		const reservations = await prisma.reservation.findMany({
			where: query,
			include: {
				listing: true
			},
			orderBy: {
				createdAt: 'desc'
			}
		})

		return reservations
	} catch (error: any) {
		throw new Error(error)
	}
}

export default getReservations
