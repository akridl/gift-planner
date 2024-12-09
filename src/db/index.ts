import 'dotenv/config';
import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';

import { gifts, giftsRelations } from '@/db/schema/gifts';

import { users, usersRelations } from './schema/users';
import { groups, groupsRelations } from './schema/group';
import { memberships, membershipsRelations } from './schema/membership';
import { buyings, buyingsRelations } from './schema/buyings';
import { wishes, wishesRelations } from './schema/wishes';

const client = createClient({
	url: process.env.DATABASE_URL!,
	authToken: process.env.AUTH_TOKEN
});

export const db = drizzle(client, {
	schema: {
		// tables
		gifts,
		users,
		groups,

		// relations
		giftsRelations,
		usersRelations,
		groupsRelations,
		memberships,
		membershipsRelations,
		buyings,
		buyingsRelations,
		wishes,
		wishesRelations
	},
	casing: 'snake_case'
});
