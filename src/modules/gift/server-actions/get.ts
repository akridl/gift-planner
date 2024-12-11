'use server';

import { eq } from 'drizzle-orm';

import { db } from '@/db';
import { gifts } from '@/db/schema/gifts';

export const getGiftById = async (id: number) =>
	db.select().from(gifts).where(eq(gifts.id, id)).get();
