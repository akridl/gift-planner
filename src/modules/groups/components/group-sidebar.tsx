'use client';

import { useRouter } from 'next/navigation';

import { useGroupContext } from '@/store/group-context';
import { type Group } from '@/db/schema/group';

type GroupSidebarProps = {
	groups: Group[];
};

export const GroupSidebar = ({ groups }: GroupSidebarProps) => {
	const router = useRouter();
	const { group, setGroup } = useGroupContext();

	const handleOnGroupClick = (group: Group) => {
		setGroup(group);
		router.push(`/groups/${group.id}`);
	};

	return (
		<div className="flex">
			<aside className="min-w-64 md:block" aria-label="Sidebar">
				<div className="overflow-y-auto rounded-md bg-gray-300 p-4">
					<ul className="space-y-8 text-lg font-medium">
						{groups.map(item => (
							<li key={item.id}>
								<button
									className={`m-1 flex w-full rounded-md p-1 hover:bg-slate-500 ${item.id === group?.id ? 'bg-slate-400' : ''}`}
									onClick={() => {
										handleOnGroupClick(item);
									}}
								>
									{item.name}
								</button>
							</li>
						))}
					</ul>
				</div>
			</aside>
		</div>
	);
};
