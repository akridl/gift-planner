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
			className={`flex w-full rounded-r-md p-1 hover:bg-slate-500 ${item.id === group?.id ? 'bg-slate-400 font-semibold' : ''}`}
			onClick={() => {
				handleOnGroupClick(item);
			}}
		>
			{item.name}
		</button>
	);
};
