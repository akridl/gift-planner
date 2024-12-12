'use client';

import { useRouter } from 'next/navigation';

import { SubmitButton } from '@/components/submit-button';

export const CreateGift = () => {
	const router = useRouter();

	const handleCreate = () => {
		router.push(`/gifts/create`);
	};

	return (
		<div className="m-4 flex items-center justify-end">
			<p className="mr-4 text-lg font-extrabold">Add new gift</p>
			<SubmitButton
				onClick={handleCreate}
				className="flex h-12 w-12 items-center justify-center rounded-full bg-neutral-700 text-3xl text-white hover:bg-neutral-800"
			>
				+
			</SubmitButton>
		</div>
	);
};
