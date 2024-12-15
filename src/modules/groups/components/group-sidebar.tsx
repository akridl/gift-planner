import { Sidebar } from '@/modules/groups/components/sidebar';

import { readUserGroups } from '../server-actions/read';

export const GroupSidebar = async ({
	chosenGroupId
}: {
	chosenGroupId?: number;
}) => {
	const groups = await readUserGroups();

	return <Sidebar items={groups} chosenGroupId={chosenGroupId} />;
};
