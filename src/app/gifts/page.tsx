import { Suspense } from 'react';

import { GiftList } from '@/modules/gift/components/gift-list';
import { AppLoader } from '@/components/app-loader';

const Page = async () => (
	<Suspense fallback={<AppLoader />}>
		<GiftList />
	</Suspense>
);

export default Page;
