'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { FC } from 'react'

const Logo: FC = () => {
	const router = useRouter()
	return (
		<Image
			onClick={() => router.push('/')}
			src="/images/logo.png"
			height={100}
			width={100}
			alt="Airbnb"
			className="hidden md:block cursor-pointer"
		/>
	)
}

export default Logo
