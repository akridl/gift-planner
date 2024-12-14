import { check, integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import {
	relations,
	sql,
	type InferInsertModel,
	type InferSelectModel
} from 'drizzle-orm';

import { users } from './users';
import { buyings } from './buyings';
import { wishes } from './wishes';

export const gifts = sqliteTable(
	'gifts',
	{
		id: integer('id').primaryKey({ autoIncrement: true }),
		name: text('name').notNull(),
		description: text('description'),
		url: text('url'),
		price: integer('price'),
		rating: integer('rating').notNull(),
		ownerId: integer('owner_id')
			.references(() => users.id)
			.notNull()
	},
	table => ({
		checkConstraint: check(
			'rating_check',
			sql`${table.rating} >= 1 AND ${table.rating} <= 5`
		)
	})
);

export const giftsRelations = relations(gifts, ({ one, many }) => ({
	owner: one(users, {
		fields: [gifts.ownerId],
		references: [users.id]
	}),
	userGift: one(buyings),
	wishGroups: many(wishes)
}));

export type Gift = InferSelectModel<typeof gifts>;
export type CreateGift = InferInsertModel<typeof gifts>;
export type UpdateGift = { id: number } & Partial<Omit<CreateGift, 'id'>>;
