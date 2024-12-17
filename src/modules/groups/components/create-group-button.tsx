'use client';

import { useRouter } from 'next/navigation';

import { SubmitButton } from '@/components/submit-button';

export const CreateGroup = () => {
	const router = useRouter();

	const handleCreate = () => {
		router.push(`/groups/create`);
	};

	return (
		<SubmitButton
			onClick={handleCreate}
			className="flex h-12 w-12 items-center justify-center rounded-full bg-neutral-700 text-3xl text-white hover:bg-neutral-800"
		>
			+
		</SubmitButton>
	);
};
