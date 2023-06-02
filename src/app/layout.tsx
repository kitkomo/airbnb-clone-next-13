import { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import { FC, ReactNode } from 'react'

import '@/assets/styles/globals.css'

export const metadata: Metadata = {
	title: 'Airbnb',
	description: 'Airbnb clone'
}

const font = Nunito({
	subsets: ['latin']
})

const layout: FC<{ children: ReactNode }> = ({ children }) => {
	return (
		<html lang="en">
			<body className={font.className}>{children}</body>
		</html>
	)
}

export default layout
