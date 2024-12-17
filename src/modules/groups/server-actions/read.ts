'use server';

import { and, eq } from 'drizzle-orm';

import { db } from '@/db';
import { buyings } from '@/db/schema/buyings';
import { gifts, type GiftWithGroupIds } from '@/db/schema/gifts';
import { type Group, type GroupWithMembers } from '@/db/schema/group';
import { users } from '@/db/schema/users';
import { wishes } from '@/db/schema/wishes';
import { getCurrentUserId } from '@/server-actions/get-user';

export const getUserGroupWithOtherMembersUserById = async (
	groupId: number
): Promise<GroupWithMembers | undefined> => {
	const currentUserId = await getCurrentUserId();

	if (!(await isMemberOfGroup(currentUserId, groupId))) {
		return undefined;
	}

	const group = await db.query.groups.findFirst({
		where: (groups, { eq }) => eq(groups.id, groupId),
		with: {
			members: {
				with: {
					user: true
				}
			}
		}
	});

	if (!group) {
		return undefined;
	}

	return {
		...group,
		members: group.members
			.map(member => member.user)
			.filter(user => user.id !== currentUserId)
	};
};

const isMemberOfGroup = async (currentUserId: number, groupId: number) => {
	const memberships = await db.query.memberships.findFirst({
		where: (memberships, { and, eq }) =>
			and(
				eq(memberships.userId, currentUserId),
				eq(memberships.groupId, groupId)
			)
	});
	if (!memberships) {
		// 'User is not a member of the group'
		return false;
	}
	return true;
};

export const getCurrentUserGiftsWithGroupIds = async (): Promise<
	GiftWithGroupIds[]
> => {
	const currentUserId = await getCurrentUserId();

	const userGiftsWithWishGroups = await db.query.gifts.findMany({
		where: (gifts, { eq }) => eq(gifts.ownerId, currentUserId),
		with: { wishGroups: true }
	});

	return userGiftsWithWishGroups.map(gift => ({
		id: gift.id,
		name: gift.name,
		groupIds: gift.wishGroups.map(wishGroup => wishGroup.groupId)
	}));
};

export const readUserGroups = async (): Promise<Group[]> => {
	const currentUserId = await getCurrentUserId();

	const memberships = await db.query.memberships.findMany({
		where: (memberships, { eq }) => eq(memberships.userId, currentUserId),
		with: {
			group: true
		}
	});

	return memberships.map(membership => membership.group);
};

export const readGroupBuyings = async (
	groupId: number
): Promise<GroupDetailedGift[]> => {
	const records = await db
		.select()
		.from(gifts)
		.innerJoin(
			wishes,
			and(eq(wishes.giftId, gifts.id), eq(wishes.groupId, groupId))
		)
		.innerJoin(users, eq(users.id, gifts.ownerId))
		.leftJoin(buyings, eq(buyings.giftId, gifts.id));

	return records.map(record => ({
		giftId: record.gifts.id,
		giftName: record.gifts.name,

		groupId,

		ownerId: record.users.id,

		buyerId: record.buyings?.buyerId
	}));
};

export type GroupDetailedGift = {
	// gift-related info
	giftId: number;
	giftName: string;

	// group-related info
	groupId: number;

	// owner-related info
	ownerId: number;

	// buyer-related info
	buyerId?: number;
};
