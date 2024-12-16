import { SidebarClient } from '@/modules/groups/components/sidebar-client';

import { readUserGroups } from '../server-actions/read';

export const GroupSidebar = async ({
	chosenGroupId
}: {
	chosenGroupId?: number;
}) => {
	const groups = await readUserGroups();

	return <SidebarClient items={groups} chosenGroupId={chosenGroupId} />;
};
