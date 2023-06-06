'use client'

import { Listing, User } from '@prisma/client'
import { FC } from 'react'

import Container from './Container'
import ListingCard from './listings/ListingCard'
import Heading from './ui/Heading'

interface FavoritesProps {
	currentUser: User | null
	listings: Listing[]
}

const Favorites: FC<FavoritesProps> = ({ currentUser, listings }) => {
	return (
		<Container>
			<Heading title="Favorites" subtitle="List of places you liked" />
			<div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
				{listings.map(listing => (
					<ListingCard
						key={listing.id}
						data={listing}
						currentUser={currentUser}
					/>
				))}
			</div>
		</Container>
	)
}

export default Favorites
