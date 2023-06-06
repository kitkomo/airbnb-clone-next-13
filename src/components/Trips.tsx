'use client'

import { Listing, Reservation, User } from '@prisma/client'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { FC, useCallback, useState } from 'react'
import { toast } from 'react-hot-toast'

import Container from './Container'
import ListingCard from './listings/ListingCard'
import Heading from './ui/Heading'

interface TripsProps {
	reservations: (Reservation & {
		listing: Listing
	})[]
	currentUser: User | null
}

const Trips: FC<TripsProps> = ({ currentUser, reservations }) => {
	const router = useRouter()
	const [deletingId, setDeletingId] = useState('')

	const onCancel = useCallback(
		(id: string) => {
			setDeletingId(id)
			axios
				.delete(`/api/reservations/${id}`)
				.then(() => {
					toast.success('Reservation cancelled')
					router.refresh()
				})
				.catch(() => toast.error('Something went wrong'))
				.finally(() => setDeletingId(''))
		},
		[router]
	)

	return (
		<Container>
			<Heading
				title="Trips"
				subtitle="Where you've been and where you're going"
			/>
			<div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
				{reservations.map(reservation => (
					<ListingCard
						reservation={reservation}
						data={reservation.listing}
						actionId={reservation.id}
						onAction={onCancel}
						disabled={deletingId === reservation.id}
						actionLabel="Cancel reservation"
						currentUser={currentUser}
						key={reservation.id}
					/>
				))}
			</div>
		</Container>
	)
}

export default Trips
