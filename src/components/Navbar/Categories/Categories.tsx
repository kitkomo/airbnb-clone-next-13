'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import { FC } from 'react'
import { BsSnow } from 'react-icons/bs'
import { FaSkiing } from 'react-icons/fa'
import {
	GiBarn,
	GiBoatFishing,
	GiCactus,
	GiCastle,
	GiCaveEntrance,
	GiForestCamp,
	GiIsland,
	GiWindmill
} from 'react-icons/gi'
import { IoDiamond } from 'react-icons/io5'
import { MdOutlineVilla } from 'react-icons/md'
import { TbBeach, TbMountain, TbPool } from 'react-icons/tb'

import Container from '@/components/Container'

import CategoryBox from './CategoryBox'

export const categores = [
	{
		label: 'Beach',
		icon: TbBeach,
		description: 'This property is close to the beach'
	},
	{
		label: 'Windmills',
		icon: GiWindmill,
		description: 'This property has windmills'
	},
	{
		label: 'Modern',
		icon: MdOutlineVilla,
		description: 'Modern style property'
	},
	{
		label: 'Countyside',
		icon: TbMountain,
		description: 'This property is in countryside'
	},
	{
		label: 'Pools',
		icon: TbPool,
		description: 'This property has a pool'
	},
	{
		label: 'Islands',
		icon: GiIsland,
		description: 'This property is located on island'
	},
	{
		label: 'Lake',
		icon: GiBoatFishing,
		description: 'This property is close to a lake'
	},
	{
		label: 'Skiing',
		icon: FaSkiing,
		description: 'This property has skiing activities near'
	},
	{
		label: 'Castles',
		icon: GiCastle,
		description: 'This property is in a castle'
	},
	{
		label: 'Camping',
		icon: GiForestCamp,
		description: 'This property has camping activities'
	},
	{
		label: 'Arctic',
		icon: BsSnow,
		description: 'This property has lots of snow around'
	},
	{
		label: 'Cave',
		icon: GiCaveEntrance,
		description: 'This property is in a cave'
	},
	{
		label: 'Desert',
		icon: GiCactus,
		description: 'This property is in a desert'
	},
	{
		label: 'Barns',
		icon: GiBarn,
		description: 'This property is a barn or part of it'
	},
	{
		label: 'Lux',
		icon: IoDiamond,
		description: 'This property is brand new and luxurious!'
	}
]

const Categories: FC = () => {
	const params = useSearchParams()
	const category = params?.get('category')
	const pathname = usePathname()
	const isMainPage = pathname === '/'

	if (!isMainPage) return null

	return (
		<Container>
			<div className="pt-4 flex items-center justify-between overflow-x-auto">
				{categores.map(item => (
					<CategoryBox
						key={item.label}
						label={item.label}
						selected={category === item.label}
						icon={item.icon}
					/>
				))}
			</div>
		</Container>
	)
}

export default Categories
