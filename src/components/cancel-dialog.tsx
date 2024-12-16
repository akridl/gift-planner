'use client';

import React, { useState } from 'react';

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
	triggerBody: React.ReactNode;
	confirmText?: string;
	cancelText?: string;
	isLoading?: boolean;
	triggerClassName?: string;
	triggerVariant?: React.ComponentProps<typeof Button>['variant'];
	confirmClassName?: string;
};

export const CancelDialog = ({
	title,
	description,
	onCancel,
	triggerBody,
	confirmText = 'Yes, Cancel',
	cancelText = 'No, Keep Editing',
	isLoading = false,
	triggerClassName = '',
	triggerVariant = 'default',
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
				<Button className={triggerClassName} variant={triggerVariant}>
					{triggerBody}
				</Button>
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
