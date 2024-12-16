import { Circle, CircleCheck, CircleEllipsis, NotebookPen } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

import { Button } from '@/shadcn/ui/button';

import { useUpdateWishMutation } from '../../hooks/update';

type WishTileProps = {
	giftId: number;
	groupId: number;
	isChecked: boolean;
	giftName: string;
};

export const WishTile = ({
	giftId,
	groupId,
	isChecked,
	giftName
}: WishTileProps) => {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const mutation = useUpdateWishMutation();

	const handleOnEditClick = () => {
		router.push(`/gifts/${giftId}/edit`);
	};

	const handleOnCheckClick = () => {
		setIsLoading(true);
		mutation.mutate(
			{ giftId, groupId },
			{
				onSuccess: () => {
					router.refresh();
					toast.success(`Change happened`);
					setIsLoading(false);
				},
				onError: error => {
					toast.error(error.message);
				}
			}
		);
	};

	return (
		<div className="inset-x flex flex-row items-center rounded-xl bg-gray-300 p-2">
			<span className="grow">{giftName}</span>
			<Button
				onClick={handleOnEditClick}
				className="mx-4 rounded-full bg-neutral-200 text-sm font-semibold text-black transition-colors hover:bg-neutral-100 md:w-auto"
			>
				<div className="flex items-center gap-x-3">
					<NotebookPen />
				</div>
			</Button>
			<Button
				onClick={handleOnCheckClick}
				className="rounded-full bg-neutral-200 text-sm font-semibold text-black shadow-none transition-colors hover:bg-neutral-100 md:w-auto"
			>
				<div className="flex items-center gap-x-3">
					{isLoading ? (
						<CircleEllipsis />
					) : isChecked ? (
						<CircleCheck />
					) : (
						<Circle />
					)}
				</div>
			</Button>
		</div>
	);
};
