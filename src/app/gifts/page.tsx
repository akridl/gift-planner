import { Suspense } from 'react';

import { AppLoader } from '@/components/app-loader';
import { CreateGift } from '@/modules/gift/components/create-gift-button';
import { GiftList } from '@/modules/gift/components/gift-list';

export const dynamic = 'force-dynamic';

const Page = async () => (
	<Suspense fallback={<AppLoader />}>
		<CreateGift />
		<GiftList />
	</Suspense>
);

export default Page;
