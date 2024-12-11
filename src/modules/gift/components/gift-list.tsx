import { GiftCard } from '@/modules/gift/components/gift-card';
import { readGifts } from '@/modules/gift/server-actions';

export const GiftList = async () => {
	const gifts = await readGifts();

	return (
		<div className="space-y-4">
			{gifts.map(gift => (
				<GiftCard key={gift.id} gift={gift} />
			))}
		</div>
	);
};
