'use client'

import { Listing, Reservation, User } from '@prisma/client'
import { format } from 'date-fns'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { FC, MouseEvent, useCallback, useMemo } from 'react'

import useCountries from '@/hooks/useCountries'

import Button from '../ui/Button'
import HeartButton from '../ui/HeartButton'

interface ListingCardProps {
	data: Listing
	reservation?: Reservation
	onAction?: (id: string) => void
	disabled?: true
	actionLabel?: string
	actionId?: string
	currentUser?: User | null
}

const ListingCard: FC<ListingCardProps> = ({
	data,
	reservation,
	actionId = '',
	actionLabel,
	currentUser,
	disabled,
	onAction
}) => {
	const router = useRouter()
	const { getByValue } = useCountries()

	const location = getByValue(data.locationValue)

	const handleCancel = useCallback(
		(e: MouseEvent<HTMLButtonElement>) => {
			e.stopPropagation()
			if (disabled) return

			onAction?.(actionId)
		},
		[disabled, onAction, actionId]
	)

	const price = useMemo(() => {
		if (reservation) return reservation.totalPrice
		return data.price
	}, [reservation, data.price])

	const reservationDate = useMemo(() => {
		if (!reservation) return null

		const start = new Date(reservation.startDate)
		const end = new Date(reservation.endDate)

		return `${format(start, 'PP')} - ${format(end, 'PP')}`
	}, [reservation])

	return (
		<div
			onClick={() => router.push(`/listings/${data.id}`)}
			className="col-span-1 cursor-pointer group"
		>
			<div className="flex flex-col gap-2 w-full">
				<div className="aspect-square w-full relative overflow-hidden rounded-xl">
					<Image
						src={data.imageSrc}
						fill
						alt="Listing"
						className="object-cover h-full w-full group-hover:scale-110 transition"
					/>
					<div className="absolute top-3 right-3">
						<HeartButton listingId={data.id} currentUser={currentUser} />
					</div>
				</div>
				<div className="font-semibold text-lg">
					{location?.region}, {location?.label}
				</div>
				<div className="font-light text-neutral-500">
					{reservationDate || data.category}
				</div>
				<div className="flex item-center gap-1">
					<div className="font-semibold">$ {price}</div>
					{!reservation && <div className="font-light">night</div>}
				</div>
				{onAction && actionLabel && (
					<Button
						disabled={disabled}
						small
						label={actionLabel}
						onClick={handleCancel}
					/>
				)}
			</div>
		</div>
	)
}

export default ListingCard
