import { z } from 'zod';

export const profileFormSchema = z
	.object({
		name: z.string().min(3, 'Name must have at least 3 characters'),
		email: z.string().email('Must be a valid email address'),
		username: z.string().min(3, 'Username must have at least 3 characters'),
		password: z.string().min(6, 'Password must have at least 6 characters'),
		// .refine(value => /[A-Z]/.test(value), {
		// 	message: 'Password must include at least one uppercase letter',
		// })
		// .refine(value => /[0-9]/.test(value), {
		// 	message: 'Password must include at least one number',
		// }),
		confirmPassword: z
			.string()
			.min(6, 'Password confirmation must have at least 6 characters')
	})
	.refine(data => data.password === data.confirmPassword, {
		message: 'Passwords must match',
		path: ['confirmPassword']
	});

export type ProfileFormSchema = z.infer<typeof profileFormSchema>;
