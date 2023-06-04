'use client'

import dynamic from 'next/dynamic'
import { FC, useMemo, useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form'

import useRentModal from '@/hooks/useRentModal'

import { categores } from '../Navbar/Categories/Categories'
import Heading from '../ui/Heading'
import CategoryInput from '../ui/Inputs/CategoryInput'
import Counter from '../ui/Inputs/Counter'
import CountrySelect from '../ui/Inputs/CountrySelect'

import Modal from './Modal'

enum STEPS {
	CATEGORY = 0,
	LOCATION = 1,
	INFO = 2,
	IMAGES = 3,
	DESCRIPTION = 4,
	PRICE = 5
}

const RentModal: FC = () => {
	const rentModal = useRentModal()
	const [step, setStep] = useState(STEPS.CATEGORY)

	const {
		register,
		handleSubmit,
		setValue,
		watch,
		formState: { errors },
		reset
	} = useForm<FieldValues>({
		defaultValues: {
			category: '',
			location: null,
			guestCount: 1,
			roomCount: 1,
			bathroomCount: 1,
			imageSrc: '',
			price: 1,
			title: '',
			description: ''
		}
	})

	const category = watch('category')
	const location = watch('location')
	const guestCount = watch('guestCount')
	const roomCount = watch('roomCount')
	const bathroomCount = watch('bathroomCount')

	const Map = useMemo(
		() =>
			dynamic(() => import('../ui/Map'), {
				ssr: false
			}),
		[location]
	)

	const setCustomValue = (id: string, value: any) => {
		setValue(id, value, {
			shouldDirty: true,
			shouldTouch: true,
			shouldValidate: true
		})
	}

	const onBack = () => {
		setStep(value => value - 1)
	}

	const onNext = () => {
		setStep(value => value + 1)
	}

	const actionLabel = useMemo(() => {
		if (step === STEPS.PRICE) {
			return 'Create'
		}
		return 'Next'
	}, [step])

	const secondaryActionLabel = useMemo(() => {
		if (step === STEPS.CATEGORY) {
			return undefined
		}
		return 'Back'
	}, [step])

	let bodyContent = (
		<div className="flex flex-col gap-8">
			<Heading
				title="Which of this best describes your place?"
				subtitle="Pick a category"
			/>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
				{categores.map(item => (
					<div className="col-span-1" key={item.label}>
						<CategoryInput
							onClick={category => setCustomValue('category', category)}
							selected={category === item.label}
							label={item.label}
							icon={item.icon}
						/>
					</div>
				))}
			</div>
		</div>
	)

	if (step === STEPS.LOCATION) {
		bodyContent = (
			<div className="flex flex-col gap-8">
				<Heading
					title="Where is your place located?"
					subtitle="Help guests find you"
				/>
				<CountrySelect
					value={location}
					onChange={value => setCustomValue('location', value)}
				/>

				<Map center={location?.latlng} />
			</div>
		)
	}

	if (step === STEPS.INFO) {
		bodyContent = (
			<div className="flex flex-col gap-8">
				<Heading
					title="Share some basics about your place"
					subtitle="What amenities do you have?"
				/>
				<Counter
					title="Guests"
					subtitle="How many quests do you allow?"
					value={guestCount}
					onChange={value => setCustomValue('guestCount', value)}
				/>
				<hr />
				<Counter
					title="Rooms"
					subtitle="How many rooms do you have?"
					value={roomCount}
					onChange={value => setCustomValue('roomCount', value)}
				/>
				<hr />
				<Counter
					title="Bathrooms"
					subtitle="How many bathrooms do you have?"
					value={bathroomCount}
					onChange={value => setCustomValue('bathroomCount', value)}
				/>
			</div>
		)
	}

	return (
		<Modal
			isOpen={rentModal.isOpen}
			onClose={rentModal.onClose}
			onSubmit={onNext}
			actionLabel={actionLabel}
			secondaryActionLabel={secondaryActionLabel}
			secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
			title="Airbnb your home"
			body={bodyContent}
		/>
	)
}

export default RentModal
