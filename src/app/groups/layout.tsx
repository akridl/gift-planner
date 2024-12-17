import { GroupSidebar } from '@/modules/groups/components/sidebar/group-sidebar';
import { readUserGroups } from '@/modules/groups/server-actions/read';
import { GroupProvider } from '@/store/group-context';

const Layout = async ({
	children
}: Readonly<{
	children: React.ReactNode;
}>) => {
	const groups = await readUserGroups();

	return (
		<GroupProvider>
			<aside className="min-w-64" aria-label="Sidebar">
				<div className="flex flex-col gap-y-4 lg:flex-row lg:gap-x-4">
					<GroupSidebar groups={groups} />
					{children}
				</div>
			</aside>
		</GroupProvider>
	);
};

export default Layout;
