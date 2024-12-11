'use client';

import { Star } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { type Gift } from '@/db/schema/gifts';

export const GiftCard = ({ gift }: { gift: Gift }) => {
	const router = useRouter();

	const handleDetails = () => {
		router.push(`/gifts/${gift.id}`);
	};

	return (
		<div className="my-4 flex items-center justify-between rounded-lg bg-gray-100 px-6 py-4 shadow-md">
			<span className="text-lg font-semibold">{gift.name}</span>

			<div className="flex items-center">
				{[...Array(5)].map((_, index) => (
					<Star
						key={index}
						className={`h-5 w-5 ${
							index < gift.rating ? 'text-yellow-400' : 'text-gray-300'
						}`}
						fill={index < gift.rating ? 'currentColor' : 'none'}
					/>
				))}
			</div>

			<span className="text-md font-medium text-gray-700">{gift.price}€</span>

			<button
				onClick={handleDetails}
				className="ml-4 text-blue-500 hover:text-blue-700 focus:outline-none"
			>
				Detail
			</button>
		</div>
	);
};
