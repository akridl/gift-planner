'use server';

import { revalidatePath } from 'next/cache';
import { and, eq } from 'drizzle-orm';

import { buyings, type DeleteBuying } from '@/db/schema/buyings';
import { db } from '@/db';

export const deleteBuying = async (buying: DeleteBuying) => {
	await db
		.delete(buyings)
		.where(
			and(
				eq(buyings.giftId, buying.giftId),
				eq(buyings.buyerId, buying.buyerId)
			)
		);
	revalidatePath('/buying');
};
