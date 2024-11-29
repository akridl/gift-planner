import { type Gift } from '@/db/schema/gifts';

export const GiftListItem = (gift: Gift) => (
	<div className="flex justify-between rounded-md border-2 border-black px-4 py-2">
		<div>{gift.id}</div>
		<h2>{gift.name}</h2>
	</div>
);
