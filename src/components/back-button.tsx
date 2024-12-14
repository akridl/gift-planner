'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

export const BackButton = () => {
	const router = useRouter();

	return (
		<button
			onClick={() => router.back()}
			className="mr-2 flex h-10 w-10 items-center justify-center rounded-lg border border-gray-300 bg-white shadow-md transition-all hover:shadow-lg"
			aria-label="Go back"
		>
			<ArrowLeft className="h-5 w-5 text-gray-800" />
		</button>
	);
};
