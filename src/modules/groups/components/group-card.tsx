'use client';

import { useRouter } from 'next/navigation';
import React from 'react';
import { toast } from 'sonner';

import { type GiftWithGroupIds } from '@/db/schema/gifts';
import { type GroupWithMembers } from '@/db/schema/group';
import { cn } from '@/lib/utils';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle
} from '@/shadcn/ui/card';
import { ScrollArea } from '@/shadcn/ui/scroll-area';

import { useDeleteMembershipMutation } from '../hooks/delete';
import { type GroupDetailedGift } from '../server-actions/read';

import { MemberGiftsDialog } from './member-gifts/member-gifts-dialog';
import { MyWishesDialog } from './my-wishes/my-wishes-dialog';

type GroupCardProps = React.HTMLAttributes<HTMLDivElement> & {
	groupWithMembers: GroupWithMembers;
	currentUserGiftsWithGroupIds: GiftWithGroupIds[];
	buyingsDetailed: GroupDetailedGift[];
};

export const GroupCard = ({
	groupWithMembers,
	currentUserGiftsWithGroupIds,
	buyingsDetailed,
	className,
	...props
}: GroupCardProps) => {
	const router = useRouter();
	const mutation = useDeleteMembershipMutation();

	const handleGroupLeave = () => {
		mutation.mutate(groupWithMembers.id, {
			onSuccess: () => {
				toast.success(`You have successfully left the group.`);
				router.push('/groups');
				router.refresh();
			},
			onError: error => {
				toast.error(error.message);
			}
		});
	};

	return (
		<Card className={cn('grow rounded-3xl md:flex-row', className)} {...props}>
			<div>
				<CardHeader className="text-left">
					<CardTitle className="text-2xl font-bold text-neutral-800">
						{groupWithMembers.name}
					</CardTitle>
					<CardDescription className="text-gray-600">
						{groupWithMembers.description}
					</CardDescription>
				</CardHeader>
				<CardContent className="flex flex-col items-start">
					<div className="gap-2 md:flex-row md:gap-10">
						<MyWishesDialog
							groupId={groupWithMembers.id}
							giftsWithGroupIds={currentUserGiftsWithGroupIds}
						/>
						<span>Members</span>
						<ScrollArea className="h-[200px] rounded-md border p-4">
							<ul className="space-y-4">
								{groupWithMembers.members.map(member => (
									<li key={member.id}>
										<MemberGiftsDialog
											groupDetailedGift={buyingsDetailed.filter(
												gift => gift.ownerId === member.id
											)}
											userId={member.id}
											userName={member.name}
										/>
									</li>
								))}
							</ul>
						</ScrollArea>
					</div>
				</CardContent>
			</div>
			<CardFooter className="flex justify-center p-0 md:justify-end">
				<button
					onClick={handleGroupLeave}
					className="m-6 w-full rounded-full bg-red-700 px-6 py-3 text-sm font-semibold text-white shadow-md transition-colors hover:bg-neutral-800 md:w-auto"
				>
					Leave a group
				</button>
			</CardFooter>
		</Card>
	);
};
