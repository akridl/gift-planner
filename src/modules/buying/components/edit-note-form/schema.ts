import { z } from 'zod';

export const editNoteSchema = z.object({
	giftId: z.number(),
	buyerId: z.number(),
	userNote: z.string().optional()
});
