import { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import { FC, ReactNode } from 'react'

import Navbar from '@/components/Navbar/Navbar'
import RegisterModal from '@/components/modals/RegisterModal'

import '@/assets/styles/globals.css'

import ToasterProvider from '@/providers/ToasterProvider'

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
			<body className={font.className}>
				<ToasterProvider />
				<RegisterModal />
				<Navbar />
				{children}
			</body>
		</html>
	)
}

export default layout
