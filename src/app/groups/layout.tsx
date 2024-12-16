import { readUserGroups } from '@/modules/groups/server-actions/read';
import { GroupSidebar } from '@/modules/groups/components/group-sidebar';
import { GroupProvider } from '@/store/group-context';

const Layout = async ({
	children
}: Readonly<{
	children: React.ReactNode;
}>) => {
	const groups = await readUserGroups();

	return (
		<div className="flex-column flex space-x-8 md:px-16 md:py-8">
			<GroupProvider>
				<GroupSidebar groups={groups} />
				{children}
			</GroupProvider>
		</div>
	);
};

export default Layout;
