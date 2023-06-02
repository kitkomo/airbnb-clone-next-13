'use client'
import { FC } from 'react'

import Container from '../Container'

import Logo from './Logo/Logo'
import Search from './Search/Search'
import UserMenu from './UserMenu/UserMenu'

const Navbar: FC = () => {
	return (
		<nav className="fixed w-full bg-white z-10 shadow-sm">
			<div className="py-4 border-b-[1px]">
				<Container>
					<div className="flex items-center justify-between gap-3 md:gap-0">
						<Logo />
						<Search />
						<UserMenu />
					</div>
				</Container>
			</div>
		</nav>
	)
}

export default Navbar
