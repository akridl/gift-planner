'use client';

import { DialogBody } from 'next/dist/client/components/react-dev-overlay/internal/components/Dialog';

import { type GiftWithGroupIds } from '@/db/schema/gifts';
import { Button } from '@/shadcn/ui/button';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from '@/shadcn/ui/dialog';
import { ScrollArea } from '@/shadcn/ui/scroll-area';

import { WishTile } from './wish-tile';

type MyWishesDialogProps = {
	groupId: number;
	giftsWithGroupIds: GiftWithGroupIds[];
};

export const MyWishesDialog = ({
	groupId,
	giftsWithGroupIds
}: MyWishesDialogProps) => (
	<Dialog>
		<DialogTrigger asChild>
			<Button className="w-full rounded-full bg-neutral-700 px-6 py-3 text-sm font-semibold text-white shadow-md transition-colors hover:bg-neutral-800 md:w-auto">
				<div className="flex items-center gap-x-3">
					<p>My wishes</p>
				</div>
			</Button>
		</DialogTrigger>
		<DialogContent>
			<DialogHeader>
				<DialogTitle>My wishes</DialogTitle>
			</DialogHeader>
			<DialogBody>
				<ScrollArea className="h-[200px] rounded-md border p-4">
					<ul className="space-y-4">
						{giftsWithGroupIds.map(gift => (
							<li key={gift.id}>
								<WishTile
									giftId={gift.id}
									groupId={groupId}
									isChecked={gift.groupIds.includes(groupId)}
									giftName={gift.name}
								/>
							</li>
						))}
					</ul>
				</ScrollArea>
			</DialogBody>
		</DialogContent>
	</Dialog>
);
