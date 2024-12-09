import { relations, type InferSelectModel } from 'drizzle-orm';
import {
	text,
	integer,
	sqliteTable,
	primaryKey
} from 'drizzle-orm/sqlite-core';

import { gifts } from './gifts';
import { users } from './users';

export const buyings = sqliteTable(
	'buyings',
	{
		buyerId: integer('buyer_id')
			.references(() => users.id)
			.notNull(),
		giftId: integer('gift_id')
			.references(() => gifts.id)
			.notNull(),
		userNote: text('user_note')
	},
	t => ({
		pk: primaryKey({ columns: [t.buyerId, t.giftId] })
	})
);

export const buyingsRelations = relations(buyings, ({ one }) => ({
	buyer: one(users, {
		fields: [buyings.buyerId],
		references: [users.id]
	}),
	gift: one(gifts, {
		fields: [buyings.giftId],
		references: [gifts.id]
	})
}));

export type UserGift = InferSelectModel<typeof buyings>;
