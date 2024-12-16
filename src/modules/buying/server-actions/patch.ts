'use server';

import { revalidatePath } from 'next/cache';
import { and, eq } from 'drizzle-orm';

import { type Buying, buyings } from '@/db/schema/buyings';
import { db } from '@/db';

export const updateNote = async (buying: Buying) => {
	await db
		.update(buyings)
		.set({ userNote: buying.userNote })
		.where(
			and(
				eq(buyings.buyerId, buying.buyerId),
				eq(buyings.giftId, buying.giftId)
			)
		);
	revalidatePath('/buying');
};
