'use client';

import { Controller, FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { Star } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';

import { type CreateGift, type Gift } from '@/db/schema/gifts';
import { SubmitButton } from '@/components/submit-button';
import { FormTextField } from '@/components/form-fields/form-text-field';
import { CancelDialog } from '@/components/cancel-button';

import { updateGift } from '../../server-actions/update';
import { createGift } from '../../server-actions/create';

import { giftFormSchema } from './schema';

type GiftFormProps = {
	gift?: Gift;
};

export const GiftForm = ({ gift }: GiftFormProps) => {
	const isEditing = Boolean(gift);

	const methods = useForm<CreateGift>({
		resolver: zodResolver(giftFormSchema),
		defaultValues: {
			name: gift?.name ?? '',
			description: gift?.description ?? '',
			price: gift?.price ?? 0,
			rating: gift?.rating ?? 1,
			url: gift?.url ?? ''
		}
	});

	const { handleSubmit, reset, control } = methods;

	const router = useRouter();

	const mutation = useMutation({
		mutationFn: async (data: CreateGift) =>
			isEditing && gift?.id
				? await updateGift(gift.id, { ...data })
				: await createGift(data),
		onSuccess: () => {
			reset();
			router.push('/gifts');
			router.refresh();
		},
		onError: error => {
			console.error(error);
		}
	});

	const onSubmit = (data: CreateGift) => {
		mutation.mutate(data);
	};

	return (
		<div className="mt-4 rounded-xl bg-white px-6 py-3 shadow-md">
			<h2 className="mb-4 text-2xl font-bold">Gift</h2>
			<FormProvider {...methods}>
				<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
					<FormTextField
						name="name"
						label="Name"
						required
						className="mb-3"
						labelClassName="text-sm font-medium text-neutral-600"
					/>
					<FormTextField
						name="description"
						label="Description"
						as="textarea"
						className="mb-3"
						labelClassName="text-sm font-medium text-neutral-600"
						rows={4}
					/>
					<div className="mb-3 flex flex-wrap items-center gap-3 sm:flex-nowrap sm:gap-10">
						<FormTextField
							name="price"
							label="Price (€)"
							type="number"
							required
							className="mb-3"
							labelClassName="text-sm font-medium text-neutral-600"
						/>
						<div>
							<label
								htmlFor="rating"
								className="mb-1 block text-sm font-medium text-neutral-600"
							>
								Rating
							</label>
							<Controller
								name="rating"
								control={control}
								render={({ field }) => (
									<div className="flex items-center">
										{[...Array(5)].map((_, index) => (
											<Star
												key={index}
												className={`h-6 w-6 cursor-pointer ${
													index < field.value
														? 'text-yellow-400'
														: 'text-gray-300'
												}`}
												fill={index < field.value ? 'currentColor' : 'none'}
												onClick={() => field.onChange(index + 1)}
											/>
										))}
									</div>
								)}
							/>
						</div>
					</div>
					<FormTextField
						name="url"
						label="URL"
						className="mb-3"
						labelClassName="text-sm font-medium text-neutral-600"
					/>
					<div className="flex items-center justify-center gap-2">
						<SubmitButton
							type="submit"
							className="my-4 w-full rounded-md bg-neutral-700 px-6 py-3 text-sm font-semibold text-white shadow-md transition-colors hover:bg-neutral-800 md:w-auto"
							disabled={mutation.status === 'pending'}
						>
							{mutation.status === 'pending' ? 'Submitting...' : 'Submit'}
						</SubmitButton>
						<CancelDialog
							title="Cancel"
							description="Are you sure you want to cancel the form and discard the changes?"
							onCancel={() => window.history.back()}
							triggerText="Cancel"
							triggerClassName="rounded-md bg-white border border-neutral-300 px-6 py-3 text-sm font-semibold text-neutral-700 shadow-md transition-colors hover:bg-neutral-100 hover:text-neutral-900 w-full md:w-auto"
							confirmClassName="rounded-md bg-neutral-700 px-6 py-3 text-sm font-semibold text-white shadow-md transition-colors hover:bg-neutral-800"
						/>
					</div>
				</form>
			</FormProvider>
		</div>
	);
};
