import React from 'react';
import { ChevronsUpDown } from 'lucide-react';

import { type Group } from '@/db/schema/group';
import { cn } from '@/lib/utils';
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger
} from '@/shadcn/ui/collapsible';
import { Button } from '@/shadcn/ui/button';
import { ScrollArea, ScrollBar } from '@/shadcn/ui/scroll-area';
import { MobileGroupSidebarItem } from '@/modules/groups/components/sidebar/mobile/mobile-group-sidebar-item';

type MobileGroupSidebarProps = React.HTMLAttributes<HTMLDivElement> & {
	groups: Group[];
	handleOnGroupClick: (group: Group) => void;
};

export const MobileGroupSidebar = ({
	groups,
	handleOnGroupClick,
	className,
	...props
}: MobileGroupSidebarProps) => (
	<div className={cn(className)} {...props}>
		<Collapsible>
			<CollapsibleTrigger asChild>
				<Button
					variant="ghost"
					size="sm"
					className="w-full space-x-8 rounded-md bg-white py-6"
				>
					<p className="text-xl font-semibold">List your groups</p>
					<ChevronsUpDown className="h-16 w-16 stroke-2" />
				</Button>
			</CollapsibleTrigger>
			<CollapsibleContent>
				<ScrollArea
					type="always"
					className="h-24 gap-y-2 overflow-y-auto bg-white pr-3"
				>
					{groups.map(item => (
						<MobileGroupSidebarItem
							key={item.id}
							item={item}
							handleOnGroupClick={handleOnGroupClick}
						/>
					))}
					<ScrollBar className="w-2" orientation="vertical" />
				</ScrollArea>
			</CollapsibleContent>
		</Collapsible>
	</div>
);
