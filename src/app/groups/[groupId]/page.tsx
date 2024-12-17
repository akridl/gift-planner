import { GroupCard } from '@/modules/groups/components/group-card';
import {
	getCurrentUserGiftsWithGroupIds,
	getUserGroupWithOtherMembersUserById,
	readGroupBuyings
} from '@/modules/groups/server-actions/read';

type GiftDetailPageProps = {
	params: Promise<{
		groupId: string;
	}>;
};

const GroupsPage = async ({ params }: GiftDetailPageProps) => {
	const { groupId } = await params;
	const groupWithMembers = await getUserGroupWithOtherMembersUserById(
		Number(groupId)
	);
	const giftsWithGroupIds = await getCurrentUserGiftsWithGroupIds();
	const buyingsDetailed = await readGroupBuyings(Number(groupId));

	if (!groupWithMembers) {
		return <span>Group is not found</span>;
	}

	return (
		<GroupCard
			groupWithMembers={groupWithMembers}
			currentUserGiftsWithGroupIds={giftsWithGroupIds}
			buyingsDetailed={buyingsDetailed}
		/>
	);
};
export default GroupsPage;
