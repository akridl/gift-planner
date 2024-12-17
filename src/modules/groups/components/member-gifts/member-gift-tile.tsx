'use client';

import { Circle, CircleCheck, CircleEllipsis } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

import { Button } from '@/shadcn/ui/button';

import { useUpdateBuyingMutation } from '../../hooks/update';

type MemberWishTileProps = {
	currentUserId: number;
	giftId: number;
	buyerId?: number;
	giftName: string;
};

export const MemberWishTile = ({
	currentUserId,
	giftId,
	buyerId,
	giftName
}: MemberWishTileProps) => {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const mutation = useUpdateBuyingMutation();

	const handleOnCheckClick = () => {
		setIsLoading(true);
		mutation.mutate(
			{ giftId, buyerId: currentUserId },
			{
				onSuccess: () => {
					router.refresh();
					toast.success(`Gift status changed`);
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
			<span
				className={`grow ${buyerId && buyerId !== currentUserId ? 'line-through' : ''}`}
			>
				{giftName}
			</span>
			{buyerId && buyerId !== currentUserId ? (
				<span className="text-sm text-gray-500">Already taken</span>
			) : (
				<Button
					onClick={handleOnCheckClick}
					className="rounded-full bg-neutral-200 text-sm font-semibold text-black shadow-none transition-colors hover:bg-neutral-100 md:w-auto"
				>
					<div className="flex items-center gap-x-3">
						{isLoading ? (
							<CircleEllipsis />
						) : buyerId === currentUserId ? (
							<CircleCheck />
						) : (
							<Circle />
						)}
					</div>
				</Button>
			)}
		</div>
	);
};
