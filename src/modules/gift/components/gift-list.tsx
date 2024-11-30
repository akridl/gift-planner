import { GiftListItem } from '@/modules/gift/components/gift-list-item';
import { readGifts } from '@/modules/gift/server-actions';

export const GiftList = async () => {
	const gifts = await readGifts();

	return (
		<>
			{gifts.map(gift => (
				<GiftListItem key={gift.id} {...gift} />
			))}
		</>
	);
};
