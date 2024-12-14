import { z } from 'zod';

export const giftFormSchema = z.object({
	name: z.string().min(4, 'Name must have at least 4 characters'),
	description: z
		.string()
		.max(50, 'Description must be at most 50 characters')
		.optional(),
	price: z.coerce
		.number()
		.min(0, 'Price must be a positive number')
		.transform(value => Math.round(value * 100) / 100),
	rating: z
		.number()
		.int('Rating must be an integer')
		.min(1, 'Rating must be at least 1')
		.max(5, 'Rating must be at most 5'),
	url: z
		.string()
		.refine(
			value => value === '' || z.string().url().safeParse(value).success,
			{
				message: 'Must be a valid URL'
			}
		)
});

export type GiftFormSchema = z.infer<typeof giftFormSchema>;
