import {
	relations,
	type InferSelectModel,
	type InferInsertModel
} from 'drizzle-orm';
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

export type CreateBuying = InferInsertModel<typeof buyings>;
export type Buying = InferSelectModel<typeof buyings>;
export type DeleteBuying = Omit<Buying, 'userNote'>;

/**
 * Gift containing all the details about gift itself, its owner, and buyer's note.
 */
export type DetailedGift = {
	// gift-related info
	giftId: number;
	giftName: string;
	giftDescription: string | null;
	giftUrl: string | null;
	giftPrice: number | null;
	giftRating: number;

	// owner-related info
	ownerId: number;
	ownerName: string | null;
	ownerUserName: string | null;

	// buyer-related info
	buyerId: number;
	buyerNote: string | null;
};
