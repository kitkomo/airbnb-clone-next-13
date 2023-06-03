import bcrypt from 'bcryptjs'
import { NextResponse } from 'next/server'

import prisma from '@/libs/prismadb'

export const POST = async (req: Request) => {
	const body = await req.json()
	const { email, name, password } = body

	const hashedPassword = await bcrypt.hash(password, 12)
	const user = await prisma.user.create({
		data: {
			email,
			name,
			hashedPassword
		}
	})

	return NextResponse.json(user)
}
