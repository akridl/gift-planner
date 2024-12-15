import { getUserGroupWithMembersById } from '../server-actions/get';

import { GroupCard } from './group-card';

export const GroupDetail = async ({
	chosenGroupId
}: {
	chosenGroupId?: number;
}) => {
	const groupWithMembers = await getUserGroupWithMembersById(
		Number(chosenGroupId)
	);
	if (!groupWithMembers) {
		return <span>Group is not found</span>;
	}

	return <GroupCard groupWithMembers={groupWithMembers} />;
};
