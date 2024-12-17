import {
	getCurrentUserGiftsWithGroupIds,
	getUserGroupWithMembersById
} from '@/modules/groups/server-actions/get';
import { GroupCard } from '@/modules/groups/components/group-card';

type GiftDetailPageProps = {
	params: Promise<{
		groupId: string;
	}>;
};

const GroupsPage = async ({ params }: GiftDetailPageProps) => {
	const { groupId } = await params;
	const groupWithMembers = await getUserGroupWithMembersById(Number(groupId));
	const giftsWithGroupIds = await getCurrentUserGiftsWithGroupIds();

	if (!groupWithMembers) {
		return <span>Group is not found</span>;
	}

	return (
		<GroupCard
			groupWithMembers={groupWithMembers}
			currentUserGiftsWithGroupIds={giftsWithGroupIds}
		/>
	);
};
export default GroupsPage;
