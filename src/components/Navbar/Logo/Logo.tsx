'use client'

import Image from 'next/image'
import { FC } from 'react'

const Logo: FC = () => {
	return (
		<Image
			src="/images/logo.png"
			height={100}
			width={100}
			alt="Airbnb"
			className="hidden md:block cursor-pointer"
		/>
	)
}

export default Logo
