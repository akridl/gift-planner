'use server';

import { revalidatePath } from 'next/cache';

import { buyings, type CreateBuying } from '@/db/schema/buyings';
import { db } from '@/db';

export const createBuying = async (newBuying: CreateBuying) => {
	db.insert(buyings).values(newBuying);
	revalidatePath('/buying');
};
