import { Suspense } from 'react';

import { AppLoader } from '@/components/app-loader';
import { GroupSidebar } from '@/modules/groups/components/group-sidebar';

const Page = async () => (
	<div className="flex-column flex space-x-8 md:px-16 md:py-8">
		<Suspense fallback={<AppLoader />}>
			<GroupSidebar />
		</Suspense>
		<span>Select group on the left or create a new one</span>
	</div>
);

export default Page;
