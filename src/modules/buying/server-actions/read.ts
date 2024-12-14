'server-only';

import { eq } from 'drizzle-orm';

import { db } from '@/db';
import { gifts } from '@/db/schema/gifts';
import { buyings, type DetailedGift } from '@/db/schema/buyings';
import { users } from '@/db/schema/users';

export const readBuyings = async (userId: number): Promise<DetailedGift[]> => {
	const records = await db
		.select()
		.from(buyings)
		.innerJoin(gifts, eq(gifts.id, buyings.giftId))
		.innerJoin(users, eq(users.id, gifts.ownerId))
		.where(eq(buyings.buyerId, userId));

	return records.map(record => ({
		giftId: record.gifts.id,
		giftName: record.gifts.name,
		giftDescription: record.gifts.description,
		giftUrl: record.gifts.url,
		giftPrice: record.gifts.price,
		giftRating: record.gifts.rating,

		ownerId: record.users.id,
		ownerName: record.users.name,
		ownerUserName: record.users.username,

		buyerId: record.buyings.buyerId,
		buyerNote: record.buyings.userNote
	}));
};
