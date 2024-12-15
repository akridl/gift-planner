import { Suspense } from 'react';

import { AppLoader } from '@/components/app-loader';
import { GroupDetail } from '@/modules/groups/components/group-detail';
import { GroupSidebar } from '@/modules/groups/components/group-sidebar';

type GiftDetailPageProps = {
	params: Promise<{
		groupId: string;
	}>;
};

const GroupsPage = async ({ params }: GiftDetailPageProps) => {
	const { groupId } = await params;

	return (
		<div className="flex-column flex space-x-8 md:px-16 md:py-8">
			<Suspense fallback={<AppLoader />}>
				<GroupSidebar chosenGroupId={Number(groupId)} />
			</Suspense>
			<Suspense fallback={<AppLoader />}>
				<GroupDetail chosenGroupId={Number(groupId)} />
			</Suspense>
		</div>
	);
};
export default GroupsPage;
