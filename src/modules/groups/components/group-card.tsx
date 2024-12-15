'use client';

import { ChevronsUpDown } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';
import { toast } from 'sonner';

import { type GroupWithMembers } from '@/db/schema/group';
import { cn } from '@/lib/utils';
import { Button } from '@/shadcn/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle
} from '@/shadcn/ui/card';
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger
} from '@/shadcn/ui/collapsible';

import { useDeleteMembershipMutation } from '../hooks/delete';

type GroupCardProps = React.HTMLAttributes<HTMLDivElement> & {
	groupWithMembers: GroupWithMembers;
};

export const GroupCard = ({
	groupWithMembers,
	className,
	...props
}: GroupCardProps) => {
	const router = useRouter();
	const [isOpen, setIsOpen] = React.useState(false);
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
						<Button>My wishes</Button>
						<Collapsible
							open={isOpen}
							onOpenChange={setIsOpen}
							className="w-[350px] space-y-2"
						>
							<div className="flex items-center justify-between space-x-4 px-4">
								<h4 className="text-lg font-semibold">Members</h4>
								<CollapsibleTrigger asChild>
									<Button variant="ghost" size="sm">
										<ChevronsUpDown className="h-4 w-4" />
										<span className="sr-only">Toggle</span>
									</Button>
								</CollapsibleTrigger>
							</div>
							<CollapsibleContent className="space-y-2">
								{groupWithMembers.members.map(member => (
									<div
										key={member.id}
										className="rounded-md border px-4 py-2 font-mono text-sm shadow-sm"
									>
										{member.name}
									</div>
								))}
							</CollapsibleContent>
						</Collapsible>
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
