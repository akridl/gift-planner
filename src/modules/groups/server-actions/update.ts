'use server';

import { db } from '@/db';

import { createBuying, createWish } from './create';
import { deleteBuying, deleteWish } from './delete';

export type updateWishProps = {
	giftId: number;
	groupId: number;
};
export const updateWish = async ({ giftId, groupId }: updateWishProps) => {
	const wishAlreadyExists = await db.query.wishes.findFirst({
		where: (wishes, { and, eq }) =>
			and(eq(wishes.giftId, giftId), eq(wishes.groupId, groupId))
	});
	if (wishAlreadyExists) {
		return await deleteWish(giftId, groupId);
	}

	return createWish(giftId, groupId);
};

export type updateBuyingProps = {
	giftId: number;
	buyerId: number;
};
export const updateBuying = async ({ giftId, buyerId }: updateBuyingProps) => {
	const buyingAlreadyExists = await db.query.buyings.findFirst({
		where: (buyings, { and, eq }) =>
			and(eq(buyings.giftId, giftId), eq(buyings.buyerId, buyerId))
	});
	if (buyingAlreadyExists) {
		return await deleteBuying(giftId, buyerId);
	}

	return createBuying(giftId, buyerId);
};
