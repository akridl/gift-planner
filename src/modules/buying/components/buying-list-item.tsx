import { type DetailedGift } from '@/db/schema/buyings';
import {
	Card,
	CardContent,
	CardHeader,
	CardFooter,
	CardTitle,
	CardDescription
} from '@/shadcn/ui/card';
import { CancelBuyingButton } from '@/modules/buying/components/cancel-buying-button';
import { EditNoteDialog } from '@/modules/buying/components/edit-note-dialog';

export const BuyingListItem = (gift: DetailedGift) => (
	<Card className="flex flex-col justify-between rounded-3xl md:flex-row">
		<div>
			<CardHeader className="text-left">
				<CardTitle className="text-2xl font-bold text-neutral-800">
					{gift.giftName}
				</CardTitle>
				<CardDescription className="text-gray-600">
					{gift.giftDescription}
				</CardDescription>
			</CardHeader>
			<CardContent className="flex flex-col items-start">
				<div className="flex flex-col gap-2 md:flex-row md:gap-10">
					<div className="flex items-center">
						<p className="mr-2 font-semibold text-gray-900">Price:</p>
						<p className="text-3xl font-light text-neutral-700">
							{gift.giftPrice}€
						</p>
					</div>
					<div className="flex items-center">
						<p className="mr-2 font-semibold text-gray-900">Gift for:</p>
						<p className="text-2xl">{gift.ownerName}</p>
					</div>
				</div>
			</CardContent>
		</div>
		<CardFooter className="flex flex-col justify-center md:flex-row">
			<EditNoteDialog
				giftId={gift.giftId}
				buyerId={gift.buyerId}
				userNote={gift.buyerNote ?? ''}
			/>
			<CancelBuyingButton giftId={gift.giftId} buyerId={gift.buyerId} />
		</CardFooter>
	</Card>
);
