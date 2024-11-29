'server-only';

import { db } from '@/db';
import { type Gift, gifts } from '@/db/schema/gifts';

export const readGifts = async (): Promise<Gift[]> => db.select().from(gifts);
