import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import z from 'zod';

import { eq } from 'drizzle-orm';
import bcrypt from 'bcrypt';
import { db } from './db';
import { users } from './db/schema/users';

type User = {
	id: string;
	email: string;
	password: string;
	name: string | null;
	username: string | null;
};

const getUser = async (email: string): Promise<User | null> => {
	const [user] = await db.select().from(users).where(eq(users.email, email));
	if (!user) {
		throw new Error('No user found with this email.');
	}

	return {
		id: user.id.toString(),
		email: user.email,
		password: user.password,
		name: user.name,
		username: user.username
	}
};

export const { auth, signIn, signOut } = NextAuth({
	...authConfig,
	providers: [
		Credentials({
			async authorize(credentials) {
				const parsedCredentials = z
					.object({ email: z.string().email(), password: z.string().min(6) })
					.safeParse(credentials);

				if (parsedCredentials.success) {
					const { email, password } = parsedCredentials.data;
					const user = await getUser(email);
					if (!user) return null;

					// it should return user without password if passwords match
					const passwordsMatch = await bcrypt.compare(password, user.password);
					if (passwordsMatch) return user;
				}
                console.log('Invalid credentials');
				return null;
			}
		})
	]
});
