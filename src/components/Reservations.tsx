'use client'

import { Listing, Reservation, User } from '@prisma/client'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { FC, useCallback, useState } from 'react'
import { toast } from 'react-hot-toast'

import Container from './Container'
import ListingCard from './listings/ListingCard'
import Heading from './ui/Heading'

interface ReservationsProps {
	reservations: (Reservation & {
		listing: Listing
	})[]
	currentUser: User | null
}

const Reservations: FC<ReservationsProps> = ({ currentUser, reservations }) => {
	const router = useRouter()
	const [deletingId, setDeletingId] = useState('')
	const onCancel = useCallback(
		(id: string) => {
			setDeletingId(id)
			axios
				.delete(`/api/reservations/${deletingId}`)
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
			<Heading title="Reservations" subtitle="Booking on your properties" />
			<div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
				{reservations.map(reservation => (
					<ListingCard
						key={reservation.id}
						data={reservation.listing}
						reservation={reservation}
						actionId={reservation.id}
						onAction={onCancel}
						disabled={deletingId === reservation.id}
						actionLabel="Cancel guest reservation"
						currentUser={currentUser}
					/>
				))}
			</div>
		</Container>
	)
}

export default Reservations
