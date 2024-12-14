'use client';

import { Star } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { DeleteDialog } from '@/components/delete-dialog';
import { type Gift } from '@/db/schema/gifts';
import { useToast } from '@/shadcn/hooks/use-toast';
import { Button } from '@/shadcn/ui/button';

import { deleteGiftById } from '../server-actions/delete-by-id';

type GiftDetailProps = {
	gift: Gift;
};

export const GiftDetail = ({ gift }: GiftDetailProps) => {
	const router = useRouter();
	const { toast } = useToast();

	const handleEdit = () => {
		router.push(`/gifts/${gift.id}/edit`);
	};

	const handleDelete = async () => {
		try {
			await deleteGiftById(gift.id);
			toast({
				title: 'Gift deleted',
				description: 'The gift has been successfully deleted.'
			});
			router.push('/gifts');
		} catch (error) {
			toast({
				title: 'Error',
				description: 'Failed to delete the gift. Please try again.',
				variant: 'destructive'
			});
		}
	};

	return (
		<div className="mx-auto mt-8 w-full rounded-xl bg-white p-6 shadow-md">
			<h2 className="mb-6 text-2xl font-bold text-gray-800">{gift.name}</h2>
			<div className="space-y-4">
				<div>
					<label
						htmlFor="name"
						className="block text-sm font-medium text-gray-600"
					>
						Name
					</label>
					<p id="name" className="text-lg text-gray-800">
						{gift.name}
					</p>
				</div>
				<div>
					<label
						htmlFor="description"
						className="block text-sm font-medium text-gray-600"
					>
						Description
					</label>
					<p id="description" className="text-gray-700">
						{gift.description}
					</p>
				</div>
				<div>
					<label
						htmlFor="price"
						className="block text-sm font-medium text-gray-600"
					>
						Price
					</label>
					<p id="price" className="text-lg font-semibold text-gray-800">
						{gift.price}€
					</p>
				</div>
				<div>
					<label
						htmlFor="rating"
						className="block text-sm font-medium text-gray-600"
					>
						Rating
					</label>
					<div id="rating" className="flex items-center">
						{[...Array(5)].map((_, index) => (
							<Star
								key={index}
								className={`h-6 w-6 ${
									index < gift.rating ? 'text-yellow-500' : 'text-gray-300'
								}`}
								fill={index < gift.rating ? 'currentColor' : 'none'}
							/>
						))}
					</div>
				</div>
				<div>
					<label
						htmlFor="url"
						className="block text-sm font-medium text-gray-600"
					>
						URL
					</label>
					<a
						id="url"
						href={gift.url ?? '#'}
						target="_blank"
						rel="noopener noreferrer"
						className="text-blue-500 hover:underline"
					>
						{gift.url}
					</a>
				</div>
			</div>
			<div className="mt-6 flex items-center justify-center gap-2">
				<Button
					variant="secondary"
					className="w-full rounded-md bg-neutral-700 px-6 py-3 font-semibold text-white shadow-md transition-colors hover:bg-neutral-800 md:w-auto"
					onClick={handleEdit}
				>
					Edit
				</Button>
				<DeleteDialog
					title="Delete Gift"
					description="Are you sure you want to delete this gift? This action cannot be undone."
					onConfirm={handleDelete}
					triggerText="Delete"
					triggerClassName="w-full md:w-auto"
				/>
			</div>
		</div>
	);
};
