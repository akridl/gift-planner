'use server';

import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

import { db } from '@/db';
import { gifts } from '@/db/schema/gifts';

export const deleteGiftById = async (id: number) => {
	await db.delete(gifts).where(eq(gifts.id, id));
	revalidatePath('/gifts');
};
