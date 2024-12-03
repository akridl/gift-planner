'use client';

import { useState, useTransition } from 'react';
import { login, register } from '@/server-actions/authenticate';
import { useRouter } from 'next/navigation';

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
				router.push(loginResponse.redirectUrl || '/');

			} catch (err: any) {
				setError(err.message || 'Failed to register.');
			}
		});
	};

	return (
		<div>
			<h1>Register</h1>
			<form onSubmit={handleSubmit} className="flex flex-col">
				<input type="email" name="email" placeholder="Email" required />
				<input
					type="password"
					name="password"
					placeholder="Password"
					required
				/>
				<input
					type="password"
					name="confirmPassword"
					placeholder="Confirm Password"
					required
				/>
				<input type="text" name="name" placeholder="Name" />
				<input type="text" name="username" placeholder="Username" />
				<button type="submit" disabled={isPending}>
					{isPending ? 'Registering...' : 'Register'}
				</button>
			</form>
			{error && <p style={{ color: 'red' }}>{error}</p>}
			{success && <p style={{ color: 'green' }}>{success}</p>}
		</div>
	);
};
