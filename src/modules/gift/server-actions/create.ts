'use server';

import { revalidatePath } from 'next/cache';

import { type CreateGift, gifts } from '@/db/schema/gifts';
import { db } from '@/db';

export const createGift = async (newGift: CreateGift) => {
	const gift = db.insert(gifts).values(newGift);
	revalidatePath('/gifts');
	return gift;
};
