import { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import { text, integer, sqliteTable } from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('users', {
	id: integer('id').primaryKey({ autoIncrement: true }),
    email: text('email').notNull(),
    password: text('password').notNull(),
	name: text('name'),
	username: text('username'),
});

export type User = InferSelectModel<typeof users>;
export type CreateUser = InferInsertModel<typeof users>;