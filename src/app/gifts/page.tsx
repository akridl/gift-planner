import { Suspense } from 'react';

import { GiftList } from '@/modules/gift/components/gift-list';
import { AppLoader } from '@/components/app-loader';
import { CreateGift } from '@/modules/gift/components/create-gift-button';

const Page = async () => (
	<Suspense fallback={<AppLoader />}>
		<CreateGift />
		<GiftList />
	</Suspense>
);

export default Page;
