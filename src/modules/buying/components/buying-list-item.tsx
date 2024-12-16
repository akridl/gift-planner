'use client';

import { toast } from 'sonner';
import { CircleX } from 'lucide-react';

import { type DeleteBuying, type DetailedGift } from '@/db/schema/buyings';
import {
	Card,
	CardContent,
	CardHeader,
	CardFooter,
	CardTitle,
	CardDescription
} from '@/shadcn/ui/card';
import { EditNoteDialog } from '@/modules/buying/components/edit-note-dialog';
import { useDeleteBuyingMutation } from '@/modules/buying/hooks/delete';
import { CancelDialog } from '@/components/cancel-dialog';

export const BuyingListItem = (gift: DetailedGift) => {
	const mutation = useDeleteBuyingMutation();
	const onCancel = (data: DeleteBuying) => {
		mutation.mutate(data, {
			onSuccess: () => {
				toast.success(`Gift was successfully deleted from your buyings list.`);
			},
			onError: error => {
				toast.error(error.message);
			}
		});
	};

	return (
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
				<CancelDialog
					title="Delete buying"
					description="Do you really wish to delete the buying?"
					triggerBody={
						<div className="flex items-center gap-x-3">
							<span>
								<CircleX />
							</span>
							<p>Cancel gifting</p>
						</div>
					}
					triggerClassName="m-6 w-full rounded-full px-6 py-3 text-sm font-semibold transition-colors md:w-auto"
					triggerVariant="destructive"
					confirmText="Yes, delete"
					cancelText="No, go back"
					onCancel={() =>
						onCancel({ giftId: gift.giftId, buyerId: gift.buyerId })
					}
				/>
			</CardFooter>
		</Card>
	);
};
