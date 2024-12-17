import { db } from '@/db';
import { buyings } from '@/db/schema/buyings';
import { wishes } from '@/db/schema/wishes';

export const createWish = async (giftId: number, groupId: number) => {
	console.log(`Inserting wish with giftId: ${giftId}, groupId: ${groupId}`);

	const insertedWish = await db
		.insert(wishes)
		.values({ giftId, groupId })
		.returning();

	return insertedWish ? true : false;
};

export const createBuying = async (giftId: number, buyerId: number) => {
	console.log(`Inserting buying with giftId: ${giftId}, buyerId: ${buyerId}`);

	const insertedBuying = await db
		.insert(buyings)
		.values({ giftId, buyerId })
		.returning();

	return insertedBuying ? true : false;
};
