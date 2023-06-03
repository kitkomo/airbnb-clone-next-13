'use client'

import axios from 'axios'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { FC, useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { AiFillGithub } from 'react-icons/ai'
import { FcGoogle } from 'react-icons/fc'

import useLoginModal from '@/hooks/useLoginModal'
import useRegisterModal from '@/hooks/useRegisterModal'

import Button from '../ui/Button'
import Heading from '../ui/Heading'
import Input from '../ui/Inputs/Input'

import Modal from './Modal'

const LoginModal: FC = () => {
	const loginModal = useLoginModal()
	const registerModal = useRegisterModal()
	const [isLoading, setIsLoading] = useState(false)
	const router = useRouter()

	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<FieldValues>({
		defaultValues: {
			email: '',
			password: ''
		}
	})

	const onSubmit: SubmitHandler<FieldValues> = data => {
		setIsLoading(true)
		signIn('credentials', {
			...data,
			redirect: false
		}).then(callback => {
			setIsLoading(false)
			if (callback?.ok) {
				toast.success('Logged in')
				router.refresh()
				loginModal.onClose()
			}
			if (callback?.error) {
				toast.error(callback.error)
			}
		})
	}

	const bodyContent = (
		<div className="flex flex-col gap-4">
			<Heading title="Welcome to back" subtitle="Log in to your account" />
			<Input
				id="email"
				label="Email"
				disabled={isLoading}
				register={register}
				errors={errors}
				required
			/>
			<Input
				id="password"
				label="Password"
				type="password"
				disabled={isLoading}
				register={register}
				errors={errors}
				required
			/>
		</div>
	)

	const footerContent = (
		<div className="flex flex-col gap-4 mt-3">
			<hr />
			<Button
				outline
				label="Continue with Google"
				icon={FcGoogle}
				onClick={() => signIn('google')}
			/>
			<Button
				outline
				label="Continue with GitHub"
				icon={AiFillGithub}
				onClick={() => signIn('github')}
			/>
			<div className="text-neutral-500 text-center mt-4 font-light">
				<div className="flex gap-2 items-center justify-center">
					<div>Already have an acoount?</div>
					<div
						onClick={loginModal.onClose}
						className="text-neutral-800 cursor-pointer hover:underline"
					>
						Log in
					</div>
				</div>
			</div>
		</div>
	)

	return (
		<Modal
			disabled={isLoading}
			isOpen={loginModal.isOpen}
			title="Login"
			actionLabel="Continue"
			onClose={loginModal.onClose}
			onSubmit={handleSubmit(onSubmit)}
			body={bodyContent}
			footer={footerContent}
		/>
	)
}

export default LoginModal
