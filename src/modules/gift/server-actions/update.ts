'use server';

import { revalidatePath } from 'next/cache';
import { eq } from 'drizzle-orm';

import { type UpdateGift, gifts } from '@/db/schema/gifts';
import { db } from '@/db';

export const updateGift = async (id: number, data: Omit<UpdateGift, 'id'>) => {
	const gift = await db
		.update(gifts)
		.set(data)
		.where(eq(gifts.id, id))
		.returning();
	revalidatePath('/gifts');
	return gift[0]; // Return the updated gift
};
