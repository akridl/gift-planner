import { GiftCard } from '@/modules/gift/components/gift-card';
import { readGifts } from '@/modules/gift/server-actions';

export const GiftList = async () => {
	const gifts = await readGifts();

	return (
		<div className="grid gap-4 md:grid-cols-1 2xl:grid-cols-2">
			{gifts.map(gift => (
				<GiftCard key={gift.id} gift={gift} />
			))}
		</div>
	);
};
