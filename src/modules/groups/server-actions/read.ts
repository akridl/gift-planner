'server-only';

import { db } from '@/db';
import { type Group } from '@/db/schema/group';
import { GetUser } from '@/server-actions/get-user';

export const readUserGroups = async (): Promise<Group[]> => {
	const currentUserId = await GetUser();

	const memberships = await db.query.memberships.findMany({
		where: (memberships, { eq }) => eq(memberships.userId, currentUserId),
		with: {
			group: true
		}
	});

	const userGroups = memberships.map(membership => membership.group);
	return userGroups;
};
