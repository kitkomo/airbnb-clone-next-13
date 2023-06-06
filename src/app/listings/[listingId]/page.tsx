import EmptyState from '@/components/EmptyState'
import Listing from '@/components/listings/Listing'

import getCurrentUser from '@/actions/getCurrentUser'
import getListingById from '@/actions/getListingById'
import getReservations from '@/actions/getReservations'

interface Params {
	listingId: string
}

const ListingPage = async ({ params }: { params: Params }) => {
	const listing = await getListingById(params)
	const currentUser = await getCurrentUser()
	const reservations = await getReservations(params)

	if (!listing) return <EmptyState />

	return <Listing listing={listing} currentUser={currentUser} reservations={reservations} />
}

export default ListingPage
