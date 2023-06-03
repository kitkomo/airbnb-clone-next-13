'use client'

import Image from 'next/image'
import { FC } from 'react'

const Avatar: FC = () => {
	return (
		<Image
			src="/images/placeholder.jpg"
			height={30}
			width={30}
			alt="avatar"
			className="rounded-full"
		/>
	)
}

export default Avatar
