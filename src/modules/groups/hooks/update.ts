import { useMutation } from '@tanstack/react-query';

import {
	updateBuying,
	type updateBuyingProps,
	updateWish,
	type updateWishProps
} from '../server-actions/update';

export const useUpdateWishMutation = () =>
	useMutation({
		mutationFn: async ({ giftId, groupId }: updateWishProps) =>
			updateWish({ giftId, groupId })
	});

export const useUpdateBuyingMutation = () =>
	useMutation({
		mutationFn: async ({ giftId, buyerId }: updateBuyingProps) =>
			updateBuying({ giftId, buyerId })
	});
