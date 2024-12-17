import { useMutation } from '@tanstack/react-query';

import { type CreateGroup } from '@/db/schema/group';
import {
	createGroup,
	createMembership
} from '@/modules/groups/server-actions/create';

export type AddGroupMemberMutationProps = {
	userId: number;
	groupId: number;
};

export const useAddGroupMemberMutation = () =>
	useMutation({
		mutationFn: async ({ userId, groupId }: AddGroupMemberMutationProps) =>
			createMembership(userId, groupId)
	});

export const useCreateGroupMutation = () =>
	useMutation({
		mutationFn: async (group: CreateGroup) => createGroup(group)
	});
