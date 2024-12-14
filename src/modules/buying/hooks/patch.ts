import { useMutation } from '@tanstack/react-query';

import { type Buying } from '@/db/schema/buyings';
import { updateNote } from '@/modules/buying/server-actions';

export const useUpdateNoteMutation = () =>
	useMutation({
		mutationFn: async (buying: Buying) => updateNote(buying)
	});
