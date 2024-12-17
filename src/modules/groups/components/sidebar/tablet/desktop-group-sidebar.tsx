'use client';

import React from 'react';

import type { Group } from '@/db/schema/group';
import { cn } from '@/lib/utils';
import { DesktopGroupSidebarItem } from '@/modules/groups/components/sidebar/tablet/desktop-group-sidebar-item';

type TabletGroupSidebarProps = React.HTMLAttributes<HTMLDivElement> & {
	groups: Group[];
	handleOnGroupClick: (group: Group) => void;
};

export const DesktopGroupSidebar = ({
	groups,
	handleOnGroupClick,
	className
}: TabletGroupSidebarProps) => (
	<div
		className={cn(
			'block overflow-y-auto rounded-r-md bg-white py-4',
			className
		)}
	>
		<p className="ml-2 text-lg font-semibold">Your groups</p>
		<ul className="p-2 text-lg font-medium">
			{groups.map(item => (
				<DesktopGroupSidebarItem
					key={item.id}
					item={item}
					handleOnGroupClick={handleOnGroupClick}
				/>
			))}
		</ul>
	</div>
);
