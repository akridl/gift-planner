'use client';

import { useState } from 'react';

import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from '@/shadcn/ui/dialog';
import { Button } from '@/shadcn/ui/button';

type DeleteDialogProps = {
	title: string;
	description: string;
	onConfirm: () => Promise<void>;
	triggerText: string;
	confirmText?: string;
	cancelText?: string;
	isLoading?: boolean;
};

export const DeleteDialog = ({
	title,
	description,
	onConfirm,
	triggerText,
	confirmText = 'Delete',
	cancelText = 'Cancel',
	isLoading = false
}: DeleteDialogProps) => {
	const [open, setOpen] = useState(false);

	const handleConfirm = async () => {
		try {
			await onConfirm();
		} finally {
			setOpen(false);
		}
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button variant="destructive">{triggerText}</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
					<p>{description}</p>
				</DialogHeader>
				<DialogFooter>
					<Button variant="outline" onClick={() => setOpen(false)}>
						{cancelText}
					</Button>
					<Button
						variant="destructive"
						onClick={handleConfirm}
						disabled={isLoading}
					>
						{isLoading ? 'Processing...' : confirmText}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};
