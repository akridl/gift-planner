'use client';

import { NotebookPen } from 'lucide-react';
import { DialogBody } from 'next/dist/client/components/react-dev-overlay/internal/components/Dialog';

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from '@/shadcn/ui/dialog';
import { Button } from '@/shadcn/ui/button';
import { EditNoteForm } from '@/modules/buying/components/edit-note-form/edit-note-form';

type EditNoteDialogProps = {
	buyerId: number;
	giftId: number;
	userNote: string;
};

export const EditNoteDialog = ({
	buyerId,
	giftId,
	userNote
}: EditNoteDialogProps) => (
	<Dialog>
		<DialogTrigger asChild>
			<Button className="w-full rounded-full bg-neutral-700 px-6 py-3 text-sm font-semibold text-white shadow-md transition-colors hover:bg-neutral-800 md:w-auto">
				<div className="flex items-center gap-x-3">
					<span>
						<NotebookPen />
					</span>
					<p>Edit your note</p>
				</div>
			</Button>
		</DialogTrigger>
		<DialogContent>
			<DialogHeader>
				<DialogTitle>Edit your note</DialogTitle>
				<DialogDescription>
					You can keep storing here any private information meant just for you.
				</DialogDescription>
			</DialogHeader>
			<DialogBody>
				<EditNoteForm giftId={giftId} buyerId={buyerId} userNote={userNote} />
			</DialogBody>
		</DialogContent>
	</Dialog>
);
