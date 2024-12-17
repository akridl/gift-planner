import { GiftCard } from '@/modules/gift/components/gift-card';

import { getCurrentUserGifts } from '../server-actions/get';

export const GiftList = async () => {
	const gifts = await getCurrentUserGifts();

	return (
		<div className="grid gap-4 md:grid-cols-1 2xl:grid-cols-2">
			{gifts.map(gift => (
				<GiftCard key={gift.id} gift={gift} />
			))}
		</div>
	);
};
