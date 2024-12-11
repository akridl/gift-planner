'use client';

import { Star } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { DeleteDialog } from '@/components/delete-dialog';
import { type Gift } from '@/db/schema/gifts';
import { useToast } from '@/shadcn/hooks/use-toast';

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
		<div>
			<h1 className="text-lg font-semibold">{gift.name}</h1>
			<div>
				<div className="mb-3">
					<label htmlFor="name">Name</label>
					<p id="name">{gift.name}</p>
				</div>
				<div className="mb-3">
					<label htmlFor="description">Description</label>
					<p id="description">{gift.description}</p>
				</div>
				<div className="mb-3">
					<label htmlFor="price">Price</label>
					<p id="price">{gift.price}</p>
				</div>
				<div className="mb-3">
					<label htmlFor="rating">Rating</label>
					<p id="rating">
						{[...Array(5)].map((_, index) => (
							<Star
								key={index}
								className={`h-5 w-5 ${
									index < gift.rating ? 'text-yellow-400' : 'text-gray-300'
								}`}
								fill={index < gift.rating ? 'currentColor' : 'none'}
							/>
						))}
					</p>
				</div>
				<div className="mb-3">
					<label htmlFor="url">URL</label>
					<p id="url">{gift.url}</p>
				</div>
			</div>
			<button
				onClick={handleEdit}
				className="ml-4 text-blue-500 hover:text-blue-700 focus:outline-none"
			>
				Edit
			</button>
			<DeleteDialog
				title="Delete Gift"
				description="Are you sure you want to delete this gift? This action cannot be undone."
				onConfirm={handleDelete}
				triggerText="Delete"
			/>
		</div>
	);
};
