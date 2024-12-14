import { useMutation } from '@tanstack/react-query';

import type { DeleteBuying } from '@/db/schema/buyings';
import { deleteBuying } from '@/modules/buying/server-actions';

export const useDeleteBuyingMutation = () =>
	useMutation({
		mutationFn: async (buying: DeleteBuying) => deleteBuying(buying)
	});
