'use client';

import { DialogBody } from 'next/dist/client/components/react-dev-overlay/internal/components/Dialog';

import { Button } from '@/shadcn/ui/button';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from '@/shadcn/ui/dialog';
import { ScrollArea } from '@/shadcn/ui/scroll-area';

import { type GroupDetailedGift } from '../../server-actions/read';

import { MemberWishTile } from './member-gift-tile';

type MemberGiftsDialogProps = {
	userId: number;
	userName: string | null;
	groupDetailedGift: GroupDetailedGift[];
};

export const MemberGiftsDialog = ({
	userId,
	userName,
	groupDetailedGift
}: MemberGiftsDialogProps) => (
	<Dialog>
		<DialogTrigger asChild>
			<Button className="w-full rounded-md border bg-gray-200 px-4 py-2 font-mono text-sm text-black shadow-sm hover:text-white">
				{userName}
			</Button>
		</DialogTrigger>
		<DialogContent>
			<DialogHeader>
				<DialogTitle>{userName}&apos;s wishes</DialogTitle>
			</DialogHeader>
			<DialogBody>
				<ScrollArea className="h-[200px] rounded-md border p-4">
					<ul className="space-y-4">
						{groupDetailedGift.map(record => (
							<li key={record.giftId}>
								<MemberWishTile
									giftId={record.giftId}
									userId={userId}
									buyerId={record.buyerId}
									giftName={record.giftName}
								/>
							</li>
						))}
					</ul>
				</ScrollArea>
			</DialogBody>
		</DialogContent>
	</Dialog>
);
