'use server';

import { AuthError } from 'next-auth';
import { z } from 'zod';
import bcrypt from 'bcrypt';
import { eq } from 'drizzle-orm';

import { users } from '@/db/schema/users';
import { db } from '@/db';
import { signIn, signOut } from '@/auth';

export const login = async (formData: FormData) => {
	try {
		const result = await signIn('credentials', {
			redirect: false,
			email: formData.get('email'),
			password: formData.get('password')
		});

		if (result?.error) {
			return { error: result.error };
		} else {
			return { redirectUrl: '/' };
		}
	} catch (error) {
		console.error('Error in login', error);
		if (error instanceof AuthError) {
			switch (error.type) {
				case 'CredentialsSignin':
					return { error: 'Invalid credentials.' };
				default:
					return { error: 'An error occurred.' };
			}
		}
		throw error;
	}
};

export const logout = async () => {
	try {
		await signOut({ redirect: false });
		return { redirectUrl: '/login' };
	} catch (error) {
		console.error('Error in signOut', error);
		return { error: 'An error occurred.' };
	}
};

const registerSchema = z.object({
	email: z.string().email(),
	password: z.string().min(6),
	confirmPassword: z.string().min(6),
	name: z.string().optional(),
	username: z.string().optional()
});

export const register = async (formData: FormData) => {
	const parsed = registerSchema.safeParse({
		email: formData.get('email'),
		password: formData.get('password'),
		confirmPassword: formData.get('confirmPassword'),
		name: formData.get('name'),
		username: formData.get('username')
	});

	if (!parsed.success) {
		throw new Error('Invalid input');
	}

	const { email, password, confirmPassword, name, username } = parsed.data;

	// Check if user already exists
	const existingUser = await db
		.select()
		.from(users)
		.where(eq(users.email, email))
		.get();
	if (existingUser) {
		throw new Error('User already exists');
	}

	// Check if passwords match
	if (password !== confirmPassword) {
		throw new Error('Passwords do not match');
	}

	// Hash the password
	const hashedPassword = await bcrypt.hash(password, 10);

	// Insert the new user
	await db.insert(users).values({
		email,
		password: hashedPassword,
		name,
		username
	});

	return { success: true };
};
