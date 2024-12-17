import { CirclePlus } from 'lucide-react';
import { DialogBody } from 'next/dist/client/components/react-dev-overlay/internal/components/Dialog';

import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from '@/shadcn/ui/dialog';

import { AddMemberForm } from './add-member-form';

type AddMemberDialogProps = {
	groupId: number;
};

export const AddMemberDialog = ({ groupId }: AddMemberDialogProps) => (
	<Dialog>
		<DialogTrigger asChild>
			<button className="text-black">
				<CirclePlus size={24} />
			</button>
		</DialogTrigger>
		<DialogContent>
			<DialogHeader>
				<DialogTitle>Add member to group</DialogTitle>
			</DialogHeader>
			<DialogBody>
				<AddMemberForm groupId={groupId} />
			</DialogBody>
		</DialogContent>
	</Dialog>
);
