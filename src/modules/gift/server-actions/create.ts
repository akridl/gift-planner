'use server';

import { revalidatePath } from 'next/cache';

import { type CreateGift, gifts } from '@/db/schema/gifts';
import { db } from '@/db';
import { auth } from '@/auth';

export const createGift = async (newGift: CreateGift) => {
	const session = await auth();
	const user = session?.user;

	if (!user) {
		throw new Error('User not authenticated');
	}

	const userId = user.id;
	const giftWithOwner = {
		...newGift,
		ownerId: Number(userId)
	};

	console.log('Gift with owner:', giftWithOwner);

	const [gift] = await db.insert(gifts).values(giftWithOwner).returning();
	revalidatePath('/gifts');
	return gift; // Return the created gift
};
