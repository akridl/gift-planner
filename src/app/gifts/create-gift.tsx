'use client';

import { useRouter } from 'next/navigation';

import { Button } from '@/shadcn/ui/button';

export const CreateGift = () => {
	const router = useRouter();

	const handleCreate = () => {
		router.push(`/gifts/create`);
	};

	return (
		<div>
			Create new gift
			<Button onClick={handleCreate}>+</Button>
		</div>
	);
};
