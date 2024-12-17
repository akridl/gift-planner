import type { Group } from '@/db/schema/group';
import { useGroupContext } from '@/store/group-context';

type DesktopGroupSidebarItemProps = {
	item: Group;
	handleOnGroupClick: (group: Group) => void;
};

export const DesktopGroupSidebarItem = ({
	item,
	handleOnGroupClick
}: DesktopGroupSidebarItemProps) => {
	const { group } = useGroupContext();

	return (
		<button
			// pathname === '/gifts' ? 'bg-gray-200' : 'text-gray-700'
			className={`flex w-full rounded-r-md p-1 text-gray-700 ${item.id === group?.id ? 'bg-gray-200' : ''}`}
			onClick={() => {
				handleOnGroupClick(item);
			}}
		>
			{item.name}
		</button>
	);
};
