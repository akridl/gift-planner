import { db } from '@/db';
import { wishes } from '@/db/schema/wishes';

export const insertWish = async (giftId: number, groupId: number) => {
	console.log(`Inserting wish with giftId: ${giftId}, groupId: ${groupId}`);

	const insertedWish = await db
		.insert(wishes)
		.values({ giftId, groupId })
		.returning();

	return insertedWish ? true : false;
};
