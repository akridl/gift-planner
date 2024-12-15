'use server';

import { and, eq } from 'drizzle-orm';

import { db } from '@/db';
import { memberships } from '@/db/schema/membership';
import { GetUser } from '@/server-actions/get-user';

export const deleteMembership = async (groupId: number) => {
	const currentUserId = await GetUser();

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
