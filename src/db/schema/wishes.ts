import { relations, type InferSelectModel } from 'drizzle-orm';
import { integer, sqliteTable, primaryKey } from 'drizzle-orm/sqlite-core';

import { gifts } from './gifts';
import { groups } from './group';

export const wishes = sqliteTable(
	'wishes',
	{
		giftId: integer('gift_id')
			.references(() => gifts.id)
			.notNull(),
		groupId: integer('group_id')
			.references(() => groups.id)
			.notNull()
	},
	t => ({
		pk: primaryKey({ columns: [t.giftId, t.groupId] })
	})
);

export const wishesRelations = relations(wishes, ({ one }) => ({
	gift: one(gifts, {
		fields: [wishes.giftId],
		references: [gifts.id]
	}),
	group: one(groups, {
		fields: [wishes.groupId],
		references: [groups.id]
	})
}));

export type UserGift = InferSelectModel<typeof wishes>;
