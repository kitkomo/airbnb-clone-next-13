import { FC } from 'react'

import EmptyState from '@/components/EmptyState'

import getCurrentUser from '@/actions/getCurrentUser'
import Trips from '@/components/Trips'
import getListings from '@/actions/getListings'
import Properties from '@/components/Properties'

const PropertiesPage = async () => {
	const currentUser = await getCurrentUser()
	if (!currentUser)
		return <EmptyState title="Unauthorized" subtitle="Please log in" />

	const listings = await getListings({
		userId: currentUser.id
	})

	if (listings.length === 0)
		return (
			<EmptyState
				title="No properties found"
				subtitle="Looks like you haven\'t added any properties yet"
			/>
		)

	return <Properties listings={listings} currentUser={currentUser} />
}

export default PropertiesPage
