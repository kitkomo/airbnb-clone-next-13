import { getServerSession } from 'next-auth/next'

import prisma from '@/libs/prismadb'
import { authOptions } from '@/pages/api/auth/[...nextauth]'

export const getSession = async () => {
	return await getServerSession(authOptions)
}

const getCurrentUser = async () => {
	try {
		const session = await getSession()
		
		const currentUser = await prisma.user.findUnique({
			where: {
				email: session?.user?.email as string
			}
		})

		if (!currentUser) return null
		
		return currentUser
	} catch (error: any) {
		return null
	}
}

export default getCurrentUser
