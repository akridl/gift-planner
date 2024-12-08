import { check, integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import {
	relations,
	sql,
	type InferInsertModel,
	type InferSelectModel
} from 'drizzle-orm';

import { users } from './users';
import { userGifts } from './user_gift';

export const gifts = sqliteTable(
	'gifts',
	{
		id: integer('id').primaryKey({ autoIncrement: true }),
		name: text('name').notNull(),
		description: text('description'),
		url: text('url'),
		price: integer('price'),
		rating: integer('rating').notNull(),
		createdBy: integer('created_by')
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

export const giftsRelations = relations(gifts, ({ one }) => ({
	createdBy: one(users, {
		fields: [gifts.createdBy],
		references: [users.id]
	}),
	userGift: one(userGifts)
}));

export type Gift = InferSelectModel<typeof gifts>;
export type CreateGift = InferInsertModel<typeof gifts>;
