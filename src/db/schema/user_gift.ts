import { relations, type InferSelectModel } from 'drizzle-orm';
import {
	text,
	integer,
	sqliteTable,
	primaryKey
} from 'drizzle-orm/sqlite-core';

import { gifts } from './gifts';
import { users } from './users';

export const userGifts = sqliteTable(
	'user_gifts',
	{
		gifterId: integer('gifter_id')
			.references(() => users.id)
			.notNull(),
		giftId: integer('gift_id')
			.references(() => gifts.id)
			.notNull(),
		userNote: text('user_note')
	},
	t => ({
		pk: primaryKey({ columns: [t.gifterId, t.giftId] })
	})
);

export const userGiftsRelations = relations(userGifts, ({ one }) => ({
	gifter: one(users, {
		fields: [userGifts.gifterId],
		references: [users.id]
	}),
	gift: one(gifts, {
		fields: [userGifts.giftId],
		references: [gifts.id]
	})
}));

export type UserGift = InferSelectModel<typeof userGifts>;
