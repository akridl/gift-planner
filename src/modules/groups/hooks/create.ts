import { useMutation } from '@tanstack/react-query';

import { createMembership } from '../server-actions/create';

export type AddGroupMemberMutationProps = {
	userId: number;
	groupId: number;
};

export const useAddGroupMemberMutation = () =>
	useMutation({
		mutationFn: async ({ userId, groupId }: AddGroupMemberMutationProps) =>
			createMembership(userId, groupId)
	});
