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
			className={`hover:bg-neutral bg-neutral m-2 flex w-full justify-start rounded-lg border-0 py-2 pl-8 text-black ${item.id === group?.id ? 'bg-gray-200' : ''}`}
			onClick={() => {
				handleOnGroupClick(item);
			}}
		>
			{item.name}
		</Button>
	);
};
