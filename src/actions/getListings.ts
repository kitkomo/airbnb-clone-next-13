import prisma from '@/libs/prismadb'

export interface ListingsParams {
	userId?: string
}

const getListings = async (params: ListingsParams) => {
	try {
		const { userId } = params
		let query: any = {}

		if (userId) query.userId = userId

		const listings = await prisma.listing.findMany({
			where: query,
			orderBy: {
				createdAt: 'desc'
			}
		})

		return listings
	} catch (error: any) {
		throw new Error(error)
	}
}

export default getListings
