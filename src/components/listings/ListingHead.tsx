'use client'

import { User } from '@prisma/client'
import Image from 'next/image'
import { FC } from 'react'

import useCountries from '@/hooks/useCountries'

import Heading from '../ui/Heading'
import HeartButton from '../ui/HeartButton'

interface ListingHeadProps {
	title: string
	imageSrc: string
	locationValue: string
	id: string
	currentUser?: User | null
}

const ListingHead: FC<ListingHeadProps> = ({
	id,
	imageSrc,
	locationValue,
	title,
	currentUser
}) => {
	const { getByValue } = useCountries()
	const location = getByValue(locationValue)

	return (
		<>
			<Heading
				title={title}
				subtitle={`${location?.region}, ${location?.label}`}
			/>
			<div className="w-full h-[60vh] overflow-hidden rounded-xl relative">
				<Image
					src={imageSrc}
					fill
					alt="property"
					className="object-cover w-full"
				/>
				<div className="absolute top-5 right-5">
					<HeartButton listingId={id} currentUser={currentUser} />
				</div>
			</div>
		</>
	)
}

export default ListingHead
