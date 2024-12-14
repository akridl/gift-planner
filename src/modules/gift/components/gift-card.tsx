'use client';

import { Star } from 'lucide-react';
import { useRouter } from 'next/navigation';

import {
	Card,
	CardContent,
	CardHeader,
	CardFooter,
	CardTitle,
	CardDescription
} from '@/shadcn/ui/card';
import { type Gift } from '@/db/schema/gifts';

export const GiftCard = ({ gift }: { gift: Gift }) => {
	const router = useRouter();

	const handleDetails = () => {
		router.push(`/gifts/${gift.id}`);
	};

	return (
		<Card className="flex flex-col justify-between rounded-3xl md:flex-row">
			<div>
				<CardHeader className="text-left">
					<CardTitle className="text-2xl font-bold text-neutral-800">
						{gift.name}
					</CardTitle>
					<CardDescription className="text-gray-600">
						{gift.description}
					</CardDescription>
				</CardHeader>
				<CardContent className="flex flex-col items-start">
					<div className="flex flex-col gap-2 md:flex-row md:gap-10">
						<div className="flex items-center">
							<p className="mr-2 font-semibold text-gray-900">Price:</p>
							<p className="text-3xl font-light text-neutral-700">
								{gift.price}€
							</p>
						</div>
						<div className="flex items-center">
							<p className="mr-2 font-semibold text-gray-900">Priority:</p>
							<div className="flex items-center">
								{[...Array(5)].map((_, index) => (
									<Star
										key={index}
										className={`h-8 w-8 ${
											index < gift.rating
												? 'text-yellow-400'
												: 'text-neutral-300'
										}`}
										fill={index < gift.rating ? 'currentColor' : 'none'}
									/>
								))}
							</div>
						</div>
					</div>
					<p className="mt-4 text-sm text-neutral-500">
						<a href={gift.url ?? ''}>{gift.url}</a>
					</p>
				</CardContent>
			</div>
			<CardFooter className="flex justify-center p-0 md:justify-end">
				<button
					onClick={handleDetails}
					className="m-6 w-full rounded-full bg-neutral-700 px-6 py-3 text-sm font-semibold text-white shadow-md transition-colors hover:bg-neutral-800 md:w-auto"
				>
					Detail
				</button>
			</CardFooter>
		</Card>
	);
};
