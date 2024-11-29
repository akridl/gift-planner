import { useMutation } from '@tanstack/react-query';

import { type CreateGift } from '@/db/schema/gifts';
import { createGift } from '@/modules/gift/server-actions';

export const useCreateGiftMutation = () =>
	useMutation({
		mutationFn: async (newGift: CreateGift) => createGift(newGift)
	});
