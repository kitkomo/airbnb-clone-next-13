'use client'

import { User } from '@prisma/client'
import { FC } from 'react'

import Container from '../Container'

import Categories from './Categories/Categories'
import Logo from './Logo/Logo'
import Search from './Search/Search'
import UserMenu from './UserMenu/UserMenu'

interface NavbarProps {
	currentUser?: User | null
}

const Navbar: FC<NavbarProps> = ({ currentUser }) => {
	return (
		<nav className="fixed w-full bg-white z-10 shadow-sm">
			<div className="py-4 border-b-[1px]">
				<Container>
					<div className="flex items-center justify-between gap-3 md:gap-0">
						<Logo />
						<Search />
						<UserMenu currentUser={currentUser} />
					</div>
				</Container>
			</div>
			<Categories />
		</nav>
	)
}

export default Navbar
