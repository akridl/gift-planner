'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
	AtSymbolIcon,
	KeyIcon,
	ExclamationCircleIcon
} from '@heroicons/react/24/outline';

import { login, register } from '@/server-actions/authenticate';

export const RegisterForm = () => {
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState<string | null>(null);
	const [isPending, startTransition] = useTransition();
	const router = useRouter();

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setError(null);
		setSuccess(null);

		const formData = new FormData(e.currentTarget);

		startTransition(async () => {
			try {
				await register(formData);
				setSuccess('Registration successful!');

				const loginResponse = await login(formData);

				if (loginResponse.error) {
					setError(loginResponse.error);
					return;
				}
				router.push(loginResponse.redirectUrl ?? '/');
			} catch (err: any) {
				setError(err.message || 'Failed to register.');
			}
		});
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-3">
			<div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
				<h1 className="mb-3 text-2xl">Create a new account</h1>
				<div className="w-full space-y-4">
					<div>
						<label
							className="mb-3 mt-5 block text-xs font-medium text-gray-900"
							htmlFor="email"
						>
							Email
						</label>
						<div className="relative">
							<input
								className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
								id="email"
								type="email"
								name="email"
								placeholder="Enter your email address"
								required
							/>
							<AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
						</div>
					</div>

					<div>
						<label
							className="mb-3 mt-5 block text-xs font-medium text-gray-900"
							htmlFor="password"
						>
							Password
						</label>
						<div className="relative">
							<input
								className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
								id="password"
								type="password"
								name="password"
								placeholder="Enter password"
								required
								minLength={6}
							/>
							<KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
						</div>
					</div>

					<div>
						<label
							className="mb-3 mt-5 block text-xs font-medium text-gray-900"
							htmlFor="confirmPassword"
						>
							Confirm Password
						</label>
						<div className="relative">
							<input
								className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
								id="confirmPassword"
								type="password"
								name="confirmPassword"
								placeholder="Re-enter password"
								required
							/>
							<KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
						</div>
					</div>

					<div>
						<label
							className="mb-3 mt-5 block text-xs font-medium text-gray-900"
							htmlFor="name"
						>
							Name
						</label>
						<input
							className="block w-full rounded-md border border-gray-200 px-3 py-[9px] text-sm outline-2 placeholder:text-gray-500"
							id="name"
							type="text"
							name="name"
							placeholder="Enter your name"
						/>
					</div>

					<div>
						<label
							className="mb-3 mt-5 block text-xs font-medium text-gray-900"
							htmlFor="username"
						>
							Username
						</label>
						<input
							className="block w-full rounded-md border border-gray-200 px-3 py-[9px] text-sm outline-2 placeholder:text-gray-500"
							id="username"
							type="text"
							name="username"
							placeholder="Choose a username"
						/>
					</div>
				</div>

				<button
					type="submit"
					disabled={isPending}
					className="mt-4 w-full rounded-md bg-blue-500 py-2 text-sm font-medium text-white hover:bg-blue-600 disabled:opacity-50"
				>
					{isPending ? 'Registering...' : 'Register'}
				</button>

				<div
					className="mt-4 flex h-8 items-end space-x-1"
					aria-live="polite"
					aria-atomic="true"
				>
					{error && (
						<>
							<ExclamationCircleIcon className="h-5 w-5 text-red-500" />
							<p className="text-sm text-red-500">{error}</p>
						</>
					)}
					{success && <p className="text-sm text-green-500">{success}</p>}
				</div>

				<div className="mt-4">
					<p className="text-sm">
						Already have an account? &nbsp;
						<Link href="/login" className="text-blue-500">
							Log in
						</Link>
					</p>
				</div>
			</div>
		</form>
	);
};
