'use server';

import { and, eq } from 'drizzle-orm';

import { db } from '@/db';
import { memberships } from '@/db/schema/membership';
import { wishes } from '@/db/schema/wishes';
import { getCurrentUserId } from '@/server-actions/get-user';

export const deleteMembership = async (groupId: number) => {
	const currentUserId = await getCurrentUserId();

	console.log(
		`Deleting membership for user: ${currentUserId}, group: ${groupId}`
	);

	const deletedMembership = await db
		.delete(memberships)
		.where(
			and(
				eq(memberships.userId, currentUserId),
				eq(memberships.groupId, groupId)
			)
		)
		.returning();

	return deletedMembership ? true : false;
};

export const deleteWish = async (giftId: number, groupId: number) => {
	console.log(`Deleting wish with giftId: ${giftId}, groupId: ${groupId}`);

	const deletedWish = await db
		.delete(wishes)
		.where(and(eq(wishes.giftId, giftId), eq(wishes.groupId, groupId)))
		.returning();

	return deletedWish ? true : false;
};
