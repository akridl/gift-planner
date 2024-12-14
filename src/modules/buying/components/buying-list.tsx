import { auth } from '@/auth';
import { type DetailedGift } from '@/db/schema/buyings';
import { readBuyings } from '@/modules/buying/server-actions';
import { BuyingListItem } from '@/modules/buying/components/buying-list-item';

export const BuyingList = async () => {
	const session = await auth();
	const user = session?.user;
	if (!user) {
		throw new Error('User not authenticated');
	}
	const userId = Number(user.id);

	const gifts: DetailedGift[] = await readBuyings(userId);
	if (!gifts.length) {
		return <div>Your buying list is empty</div>;
	}

	return gifts.map(gift => (
		<BuyingListItem key={`${gift.buyerId}-${gift.ownerId}`} {...gift} />
	));
};
