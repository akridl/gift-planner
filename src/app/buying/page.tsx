import { Suspense } from 'react';

import { AppLoader } from '@/components/app-loader';
import { BuyingList } from '@/modules/buying/components/buying-list';

const Page = async () => (
	<Suspense fallback={<AppLoader />}>
		<BuyingList />
	</Suspense>
);

export default Page;
