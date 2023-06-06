import EmptyState from '@/components/EmptyState'
import Listing from '@/components/listings/Listing'

import getCurrentUser from '@/actions/getCurrentUser'
import getListingById from '@/actions/getListingById'

interface Params {
	listingId: string
}

const ListingPage = async ({ params }: { params: Params }) => {
	const listing = await getListingById(params)
	const currentUser = await getCurrentUser()

	if (!listing) return <EmptyState />

	return <Listing listing={listing} currentUser={currentUser} />
}

export default ListingPage
