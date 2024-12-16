'use server';

import { revalidatePath } from 'next/cache';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcrypt';

import { db } from '@/db';
import { type UpdateUser, users } from '@/db/schema/users';

export const updateUser = async (id: number, data: UpdateUser) => {
	if (data.password) {
		const saltRounds = 10;
		data.password = await bcrypt.hash(data.password, saltRounds);
	}

	const user = await db
		.update(users)
		.set(data)
		.where(eq(users.id, id))
		.returning();

	revalidatePath('/profile');
	return user[0]; // Return the updated user
};
