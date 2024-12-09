import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import {
	relations,
	type InferInsertModel,
	type InferSelectModel
} from 'drizzle-orm';

import { users } from './users';
import { memberships } from './membership';
import { wishes } from './wishes';

export const groups = sqliteTable('groups', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	name: text('name').notNull(),
	description: text('description'),
	ownerId: integer('owner_id')
		.references(() => users.id)
		.notNull()
});

export const groupsRelations = relations(groups, ({ one, many }) => ({
	owner: one(users, {
		fields: [groups.ownerId],
		references: [users.id]
	}),
	members: many(memberships),
	wishes: many(wishes)
}));

export type Group = InferSelectModel<typeof groups>;
export type CreateGroup = InferInsertModel<typeof groups>;
