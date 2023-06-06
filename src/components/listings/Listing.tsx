'use client'
import { Listing, Reservation, User } from '@prisma/client'
import { FC, useMemo } from 'react'
import { categores } from '../Navbar/Categories/Categories'
import Container from '../Container'
import ListingHead from './ListingHead'
import ListingInfo from './ListingInfo'

interface ListingProps {
	listing: Listing & { user: User }
	currentUser: User | null
	reservations?: Reservation[]
}

const Listing: FC<ListingProps> = ({ listing, currentUser }) => {
	const category = useMemo(() => {
		return categores.find(category => category.label === listing.category)
	}, [listing.category])

	return (
		<Container>
			<div className='max-w-screen-lg mx-auto'>
				<div className='flex flex-col gap-6'>
					<ListingHead 
						title={listing.title} 
						imageSrc={listing.imageSrc} 
						locationValue={listing.locationValue} 
						id={listing.id} 
						currentUser={currentUser} 
					/>
					<div className='grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6'>
						<ListingInfo 
							user={listing.user} 
							category={category} 
							description={listing.description} 
							roomCount={listing.roomCount} 
							guestCount={listing.guestCount} 
							bathroomCount={listing.bathroomCount} 
							locationValue={listing.locationValue} 
						/>
					</div>
				</div>
			</div>
		</Container>
	)
}

export default Listing