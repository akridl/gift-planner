'use client';

import { toast } from 'sonner';
import { CircleX } from 'lucide-react';

import { Button } from '@/shadcn/ui/button';
import { type DeleteBuying } from '@/db/schema/buyings';
import { useDeleteBuyingMutation } from '@/modules/buying/hooks/delete';

export const CancelBuyingButton = (buyingToCancel: DeleteBuying) => {
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
		<Button
			onClick={() => onCancel(buyingToCancel)}
			variant="destructive"
			className="m-6 w-full rounded-full px-6 py-3 text-sm font-semibold transition-colors md:w-auto"
		>
			<div className="flex items-center gap-x-3">
				<span>
					<CircleX />
				</span>
				<p>Cancel gifting</p>
			</div>
		</Button>
	);
};
