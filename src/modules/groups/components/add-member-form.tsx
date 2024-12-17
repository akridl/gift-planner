'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Eraser } from 'lucide-react';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { FormTextField } from '@/components/form-fields/form-text-field';
import { SubmitButton } from '@/components/submit-button';
import { type Buying } from '@/db/schema/buyings';
import { editNoteSchema } from '@/modules/buying/components/edit-note-form/schema';
import { useUpdateNoteMutation } from '@/modules/buying/hooks/patch';
import { Button } from '@/shadcn/ui/button';
import { z } from 'zod';

const addMemberSchema = z.object({
	userId: z.number()
});

type addMemberFormProps = {
	giftId: number;
	buyerId: number;
	userNote: string;
};

export const AddMemberForm = ({
	giftId,
	buyerId,
	userNote
}: addMemberFormProps) => {
	const methods = useForm<Buying>({
		resolver: zodResolver(editNoteSchema),
		defaultValues: {
			giftId,
			buyerId,
			userNote
		}
	});
	const { handleSubmit } = methods;

	const mutation = useUpdateNoteMutation();
	const onSubmit = (data: Buying) => {
		mutation.mutate(data, {
			onSuccess: () => {
				toast.success('Your note was successfully updated');
			},
			onError: error => {
				toast.error(error.message);
			}
		});
	};

	return (
		<FormProvider {...methods}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<FormTextField
					name="userNote"
					label=""
					as="textarea"
					className="mb-3"
					labelClassName="text-sm font-medium text-neutral-600"
					rows={4}
				/>
				<div className="flex items-center justify-end gap-2">
					<SubmitButton
						type="submit"
						className="my-4 w-full rounded-md bg-neutral-700 px-6 py-3 text-sm font-semibold text-white shadow-md transition-colors hover:bg-neutral-800 md:w-auto"
						disabled={mutation.status === 'pending'}
					>
						{mutation.status === 'pending' ? 'Saving...' : 'Save'}
					</SubmitButton>
					<Button type="reset" variant="outline">
						<div className="flex items-center gap-x-3">
							<span>
								<Eraser />
							</span>
							<p>Clear note</p>
						</div>
					</Button>
				</div>
			</form>
		</FormProvider>
	);
};
