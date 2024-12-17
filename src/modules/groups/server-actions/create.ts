'use server';

import { auth } from '@/auth';
import { db } from '@/db';
import { buyings } from '@/db/schema/buyings';
import { type CreateGroup, groups } from '@/db/schema/group';
import { memberships } from '@/db/schema/membership';
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

export const createMembership = async (userId: number, groupId: number) => {
	console.log(
		`Inserting membership with userId: ${userId}, groupId: ${groupId}`
	);

	const insertedMembership = await db
		.insert(memberships)
		.values({ userId, groupId })
		.returning();

	return insertedMembership ? true : false;
};

export const createGroup = async (newGroup: CreateGroup) => {
	console.log('createGroup server action got group: ', newGroup);

	const session = await auth();
	const user = session?.user;

	if (!user) {
		throw new Error('User not authenticated');
	}

	const userId = user.id;
	const ownerId = Number(userId);
	const groupWithOwner = {
		...newGroup,
		ownerId
	};
	console.log('Inserting new group: ', groupWithOwner);

	const insertedGroup = await db
		.insert(groups)
		.values(groupWithOwner)
		.returning();
	console.log('inserted group: ', insertedGroup); // here, its printed with new ID
	console.log('its ID: ', insertedGroup.id); // cannot get that ID here

	await db
		.insert(memberships)
		.values({ groupId: insertedGroup.id, userId: ownerId }); // FIX THIS
	return insertedGroup;
};
