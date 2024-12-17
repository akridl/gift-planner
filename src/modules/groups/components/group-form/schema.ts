import { z } from 'zod';

export const groupFormSchema = z.object({
	name: z.string().min(4, 'Name must have at least 4 characters'),
	description: z
		.string()
		.max(50, 'Description must be at most 50 characters')
		.optional()
});

export type GroupFormSchema = z.infer<typeof groupFormSchema>;
