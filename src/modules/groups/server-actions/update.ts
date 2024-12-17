'use server';

import { db } from '@/db';

import { deleteWish } from './delete';
import { insertWish } from './insert';

export const updateWish = async (giftId: number, groupId: number) => {
	const wishAlreadyExists = await db.query.wishes.findFirst({
		where: (wishes, { and, eq }) =>
			and(eq(wishes.giftId, giftId), eq(wishes.groupId, groupId))
	});
	if (wishAlreadyExists) {
		return await deleteWish(giftId, groupId);
	}

	return insertWish(giftId, groupId);
};
