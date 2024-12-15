'use server';

import { eq } from 'drizzle-orm';

import { db } from '@/db';
import { users } from '@/db/schema/users';

export const getUserById = async (id: number) =>
	db.select().from(users).where(eq(users.id, id)).get();
