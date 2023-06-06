'use client'

import { Listing, Reservation, User } from '@prisma/client'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { FC, useCallback, useState } from 'react'
import { toast } from 'react-hot-toast'

import Container from './Container'
import ListingCard from './listings/ListingCard'
import Heading from './ui/Heading'

interface PropertiesProps {
	listings: Listing[]
	currentUser: User | null
}

const Properties: FC<PropertiesProps> = ({ currentUser, listings }) => {
	const router = useRouter()
	const [deletingId, setDeletingId] = useState('')

	const onCancel = useCallback(
		(id: string) => {
			setDeletingId(id)
			axios
				.delete(`/api/listings/${id}`)
				.then(() => {
					toast.success('Property deleted')
					router.refresh()
				})
				.catch(() => toast.error('Something went wrong'))
				.finally(() => setDeletingId(''))
		},
		[router]
	)

	return (
		<Container>
			<Heading title="Properties" subtitle="List of your properties" />
			<div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
				{listings.map(listing => (
					<ListingCard
						key={listing.id}
						data={listing}
						actionId={listing.id}
						onAction={onCancel}
						disabled={deletingId === listing.id}
						actionLabel="Delete property"
						currentUser={currentUser}
					/>
				))}
			</div>
		</Container>
	)
}

export default Properties
