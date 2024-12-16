import {
	relations,
	type InferInsertModel,
	type InferSelectModel
} from 'drizzle-orm';
import { text, integer, sqliteTable } from 'drizzle-orm/sqlite-core';

import { gifts } from './gifts';
import { groups } from './group';
import { buyings } from './buyings';
import { memberships } from './membership';

export const users = sqliteTable('users', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	email: text('email').notNull(),
	password: text('password').notNull(),
	name: text('name'),
	username: text('username')
});

export const usersRelations = relations(users, ({ many }) => ({
	gifts: many(gifts),
	groups: many(groups),
	userGifts: many(buyings),
	groupMemberships: many(memberships)
}));

export type User = InferSelectModel<typeof users>;
export type CreateUser = InferInsertModel<typeof users>;
export type UpdateUser = Partial<Omit<CreateUser, 'id'>>;
