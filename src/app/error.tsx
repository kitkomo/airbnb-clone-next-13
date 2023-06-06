'use client'

import EmptyState from '@/components/EmptyState'
import { FC, useEffect } from 'react'

interface ErrorProps {
	error: Error
}

const Error: FC<ErrorProps> = ({ error }) => {
	useEffect(() => {
		console.log(error)
	}, [error])
	return <EmptyState title='Uh oh' subtitle='Something went wrong'/>
}

export default Error
