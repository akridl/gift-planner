import { useGroupContext } from '@/store/group-context';
import { type Group } from '@/db/schema/group';
import { Button } from '@/shadcn/ui/button';

type MobileGroupSidebarItemProps = {
	item: Group;
	handleOnGroupClick: (group: Group) => void;
};

export const MobileGroupSidebarItem = ({
	item,
	handleOnGroupClick
}: MobileGroupSidebarItemProps) => {
	const { group } = useGroupContext();

	return (
		<Button
			className={`m-2 flex w-full justify-start rounded-lg border-0 border-red-600 bg-slate-50 py-2 pl-8 text-black hover:border-2 hover:bg-red-300 ${item.id === group?.id ? 'bg-red-500 font-semibold' : ''}`}
			onClick={() => {
				handleOnGroupClick(item);
			}}
		>
			{item.name}
		</Button>
	);
};
