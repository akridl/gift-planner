'use client';

import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';

import { type CreateGift, type Gift } from '@/db/schema/gifts';
import { SubmitButton } from '@/components/submit-button';
import { FormTextField } from '@/components/form-fields';

import { updateGift } from '../server-actions/update';
import { createGift } from '../server-actions';

type GiftFormProps = {
	gift?: Gift;
};

export const GiftForm = ({ gift }: GiftFormProps) => {
	const isEditing = Boolean(gift);

	const methods = useForm<CreateGift>({
		defaultValues: {
			name: gift?.name ?? '',
			description: gift?.description ?? '',
			price: gift?.price ?? 0,
			rating: gift?.rating ?? 1,
			url: gift?.url ?? ''
		}
	});

	const { handleSubmit, reset } = methods;

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
		<FormProvider {...methods}>
			<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
				<FormTextField name="name" label="Name" required className="mb-3" />
				<FormTextField
					name="description"
					label="Description"
					className="mb-3"
				/>
				<FormTextField
					name="price"
					label="Price"
					type="number"
					required
					className="mb-3"
				/>
				<FormTextField
					name="rating"
					label="Rating"
					type="number"
					min={1}
					max={5}
					required
					className="mb-3"
				/>
				<FormTextField name="url" label="URL" className="mb-3" />
				<SubmitButton
					type="submit"
					className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"
					disabled={mutation.status === 'pending'}
				>
					{mutation.status === 'pending' ? 'Submitting...' : 'Submit'}
				</SubmitButton>
			</form>
		</FormProvider>
	);
};
