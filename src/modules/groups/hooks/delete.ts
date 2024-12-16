import { useMutation } from '@tanstack/react-query';

import { deleteMembership } from '../server-actions/delete';

export const useDeleteMembershipMutation = () =>
	useMutation({
		mutationFn: async (groupId: number) => deleteMembership(groupId)
	});
