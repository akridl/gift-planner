'use server';

import { eq } from 'drizzle-orm';

import { db } from '@/db';
import { gifts } from '@/db/schema/gifts';
import { getCurrentUserId } from '@/server-actions/get-user';

export const getGiftById = async (id: number) =>
	db.select().from(gifts).where(eq(gifts.id, id)).get();

export const getCurrentUserGifts = async () => {
	const currentUserId = await getCurrentUserId();

	return await db.query.gifts.findMany({
		where: (gifts, { eq }) => eq(gifts.ownerId, currentUserId)
	});
};
