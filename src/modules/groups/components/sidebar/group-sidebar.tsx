'use client';

import { useRouter } from 'next/navigation';
import React, { useCallback } from 'react';

import { useGroupContext } from '@/store/group-context';
import { type Group } from '@/db/schema/group';
import { MobileGroupSidebar } from '@/modules/groups/components/sidebar/mobile/mobile-group-sidebar';
import { DesktopGroupSidebar } from '@/modules/groups/components/sidebar/tablet/desktop-group-sidebar';

type GroupSidebarProps = {
	groups: Group[];
};

export const GroupSidebar = ({ groups }: GroupSidebarProps) => {
	const router = useRouter();
	const { setGroup } = useGroupContext();

	const handleOnGroupClick = useCallback(
		(group: Group) => {
			setGroup(group);
			router.push(`/groups/${group.id}`);
		},
		[router, setGroup]
	);

	return (
		<>
			<DesktopGroupSidebar
				className="hidden w-1/3 lg:block"
				groups={groups}
				handleOnGroupClick={handleOnGroupClick}
			/>
			<MobileGroupSidebar
				className="w-full lg:hidden"
				groups={groups}
				handleOnGroupClick={handleOnGroupClick}
			/>
		</>
	);
};
