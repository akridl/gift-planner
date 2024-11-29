import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { type InferInsertModel, type InferSelectModel } from 'drizzle-orm';

export const gifts = sqliteTable('gifts', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	name: text('name').notNull()
});

export type Gift = InferSelectModel<typeof gifts>;
export type CreateGift = InferInsertModel<typeof gifts>;
