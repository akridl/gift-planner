import { useMutation } from '@tanstack/react-query';

import { updateWish } from '../server-actions/update';

type updateWishMutationProps = {
	giftId: number;
	groupId: number;
};

export const useUpdateWishMutation = () =>
	useMutation({
		mutationFn: async ({ giftId, groupId }: updateWishMutationProps) =>
			updateWish(giftId, groupId)
	});
