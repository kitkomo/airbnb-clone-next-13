'use client'

import Image from 'next/image'
import { FC } from 'react'

interface AvatarProps {
	src?: string | undefined | null
}

const Avatar: FC<AvatarProps> = ({ src }) => {
	return (
		<Image
			src={src || '/images/placeholder.jpg'}
			height={30}
			width={30}
			alt="avatar"
			className="rounded-full"
		/>
	)
}

export default Avatar
