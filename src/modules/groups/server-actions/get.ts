'use server';

import { db } from '@/db';
import { type GiftWithGroupIds } from '@/db/schema/gifts';
import { type GroupWithMembers } from '@/db/schema/group';
import { getCurrentUserId } from '@/server-actions/get-user';

export const getUserGroupWithMembersById = async (groupId: number) => {
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
		members: group.members.map(members => members.user)
	} satisfies GroupWithMembers;
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

export const getCurrentUserGiftsWithGroupIds = async () => {
	const currentUserId = await getCurrentUserId();

	const userGiftsWithWishGroups = await db.query.gifts.findMany({
		where: (gifts, { eq }) => eq(gifts.ownerId, currentUserId),
		with: { wishGroups: true }
	});

	return userGiftsWithWishGroups.map(gift => ({
		id: gift.id,
		name: gift.name,
		groupIds: gift.wishGroups.map(wishGroup => wishGroup.groupId)
	})) satisfies GiftWithGroupIds[];
};
