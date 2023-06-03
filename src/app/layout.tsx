import { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import { ReactNode } from 'react'

import Navbar from '@/components/Navbar/Navbar'
import LoginModal from '@/components/modals/LoginModal'
import RegisterModal from '@/components/modals/RegisterModal'

import '@/assets/styles/globals.css'

import getCurrentUser from '@/actions/getCurrentUser'
import ToasterProvider from '@/providers/ToasterProvider'

export const metadata: Metadata = {
	title: 'Airbnb',
	description: 'Airbnb clone'
}

const font = Nunito({
	subsets: ['latin']
})

const layout = async ({ children }: { children: ReactNode }) => {
	const currentUser = await getCurrentUser()

	return (
		<html lang="en">
			<body className={font.className}>
				<ToasterProvider />
				<LoginModal />
				<RegisterModal />
				<Navbar currentUser={currentUser} />
				{children}
			</body>
		</html>
	)
}

export default layout
