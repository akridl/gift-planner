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

type CancelDialogProps = {
	title: string;
	description: string;
	onCancel: () => void;
	triggerText: string;
	confirmText?: string;
	cancelText?: string;
	isLoading?: boolean;
	triggerClassName?: string;
	confirmClassName?: string;
};

export const CancelDialog = ({
	title,
	description,
	onCancel,
	triggerText,
	confirmText = 'Yes, Cancel',
	cancelText = 'No, Keep Editing',
	isLoading = false,
	triggerClassName = '',
	confirmClassName = ''
}: CancelDialogProps) => {
	const [open, setOpen] = useState(false);

	const handleConfirm = () => {
		onCancel();
		setOpen(false);
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button className={triggerClassName}>{triggerText}</Button>
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
						className={confirmClassName}
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
