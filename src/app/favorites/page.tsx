import getCurrentUser from '@/actions/getCurrentUser'
import getFavorites from '@/actions/getFavorites'
import EmptyState from '@/components/EmptyState'
import Favorites from '@/components/Favorites'
import { FC } from 'react'

const FavoritesPage = async () => {

	const currentUser = await getCurrentUser()
	if (!currentUser)
		return <EmptyState title="Unauthorized" subtitle="Please log in" />

	const favorites = await getFavorites()

	if (favorites.length === 0)
		return (
			<EmptyState
				title="No favorite booking are found"
				subtitle="Looks like you haven\'t liked anything yet"
			/>
		)

	return (
		<Favorites listings={favorites} currentUser={currentUser} />
	)
}

export default FavoritesPage