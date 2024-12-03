'use client';

import Link from 'next/link';
import {
	AtSymbolIcon,
	KeyIcon,
	ExclamationCircleIcon
} from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { login } from '@/server-actions/authenticate';
import { AppLoader } from '@/components/app-loader';

export const LoginForm = () => {
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const [loading, setLoading] = useState<boolean>(false);
	const router = useRouter();

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setErrorMessage(null);
		setLoading(true);

		const formData = new FormData(e.currentTarget);

		try {
			const response = await login(formData);
			if (response.error) {
				setErrorMessage(response.error);
			} else if (response.redirectUrl) {
				router.push(response.redirectUrl);
			}
		} catch (err: any) {
			setErrorMessage(err.message || 'Failed to log in.');
		} finally {
			setLoading(false);
		}
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-3">
			<div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
				<h1 className="mb-3 text-2xl">Please log in to continue.</h1>
				<div className="w-full">
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
					<div className="mt-4">
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
				</div>
				<button
					type="submit"
					disabled={loading}
					className="mt-4 flex w-full items-center justify-center rounded-md bg-blue-500 py-2 text-sm font-medium text-white hover:bg-blue-600 disabled:opacity-50"
				>
					{loading ? <AppLoader /> : 'Log in'}
					{!loading && <ArrowRightIcon className="ml-2 h-5 w-5 text-white" />}
				</button>
				<div
					className="flex h-8 items-end space-x-1"
					aria-live="polite"
					aria-atomic="true"
				>
					{errorMessage && (
						<>
							<ExclamationCircleIcon className="h-5 w-5 text-red-500" />
							<p className="text-sm text-red-500">{errorMessage}</p>
						</>
					)}
				</div>
				<div className="mt-4">
					<p className="text-sm">
						Don&apos;t have an account? &nbsp;
						<Link href="/register" className="text-blue-500">
							Register
						</Link>
					</p>
				</div>
			</div>
		</form>
	);
};
