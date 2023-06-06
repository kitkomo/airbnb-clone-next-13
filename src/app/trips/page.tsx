import { FC } from 'react'

import EmptyState from '@/components/EmptyState'

import getCurrentUser from '@/actions/getCurrentUser'
import getReservations from '@/actions/getReservations'
import Trips from '@/components/Trips'

const TripsPage = async () => {
	const currentUser = await getCurrentUser()
	if (!currentUser)
		return <EmptyState title="Unauthorized" subtitle="Please log in" />

	const reservations = await getReservations({
		userId: currentUser.id
	})

	if (reservations.length === 0)
		return (
			<EmptyState
				title="No tripts found"
				subtitle="Looks like you haven\'t reserved any"
			/>
		)

	return <Trips reservations={reservations} currentUser={currentUser} />
}

export default TripsPage
