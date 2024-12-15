'use client';

import { useRouter } from 'next/navigation';

type SidebarItem = {
	id: number;
	name: string;
};

type SidebarProps = {
	items: SidebarItem[];
	chosenGroupId?: number;
};

export const Sidebar = ({ items, chosenGroupId }: SidebarProps) => {
	const router = useRouter();

	if (!chosenGroupId) {
		chosenGroupId = items[0]?.id;
		router.push(`/groups/${chosenGroupId}`);
	}

	const handleOnGroupClick = (groupId: number) => {
		router.push(`/groups/${groupId}`);
	};

	return (
		<div className="flex">
			<aside className="min-w-64 md:block" aria-label="Sidebar">
				<div className="overflow-y-auto rounded-md bg-gray-300 p-4">
					<ul className="space-y-2 space-y-8 text-lg font-medium">
						{items.map(item => (
							<li key={item.id}>
								<button
									className={`m-1 flex w-full rounded-md p-1 hover:bg-slate-500 ${item.id === chosenGroupId ? 'bg-slate-400' : ''}`}
									onClick={() => handleOnGroupClick(item.id)}
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
