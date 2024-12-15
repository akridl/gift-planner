import { useMutation } from '@tanstack/react-query';

import { deleteMembership } from '../server-actions/update';

export const useDeleteMembershipMutation = () =>
	useMutation({
		mutationFn: async (groupId: number) => deleteMembership(groupId)
	});
