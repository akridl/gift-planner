import { relations, type InferSelectModel } from 'drizzle-orm';
import { integer, primaryKey, sqliteTable } from 'drizzle-orm/sqlite-core';

import { users } from './users';
import { groups } from './group';

export const memberships = sqliteTable(
	'memberships',
	{
		userId: integer('user_id')
			.references(() => users.id)
			.notNull(),
		groupId: integer('group_id')
			.references(() => groups.id)
			.notNull()
	},
	t => ({
		pk: primaryKey({ columns: [t.userId, t.groupId] })
	})
);

export const membershipsRelations = relations(memberships, ({ one }) => ({
	user: one(users, {
		fields: [memberships.userId],
		references: [users.id]
	}),
	group: one(groups, {
		fields: [memberships.groupId],
		references: [groups.id]
	})
}));

export type Membership = InferSelectModel<typeof memberships>;
