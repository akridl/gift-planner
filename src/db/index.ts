import 'dotenv/config';
import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';

import { gifts } from '@/db/schema/gifts';
import { users } from './schema/users';

const client = createClient({
	url: process.env.DATABASE_URL!,
	authToken: process.env.AUTH_TOKEN
});

export const db = drizzle(client, {
	schema: {
		// tables
		gifts,
		users,

		// relations
		// TODO
	},
	casing: 'snake_case'
});
