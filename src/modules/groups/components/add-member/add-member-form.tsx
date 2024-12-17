'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { FormTextField } from '@/components/form-fields/form-text-field';
import { SubmitButton } from '@/components/submit-button';

import {
	type AddGroupMemberMutationProps,
	useAddGroupMemberMutation
} from '../../hooks/create';

const addMemberSchema = z.object({
	userId: z.string(),
	groupId: z.number()
});

type addMemberFormProps = {
	groupId: number;
};

export const AddMemberForm = ({ groupId }: addMemberFormProps) => {
	const methods = useForm<AddGroupMemberMutationProps>({
		resolver: zodResolver(addMemberSchema),
		defaultValues: {
			groupId
		}
	});
	const { handleSubmit } = methods;

	const mutation = useAddGroupMemberMutation();
	const onSubmit = (data: AddGroupMemberMutationProps) => {
		mutation.mutate(data, {
			onSuccess: () => {
				toast.success('User was successfully added to the group');
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
					name="userId"
					label="User ID"
					className="mb-3"
					type="number"
					labelClassName="text-sm font-medium text-neutral-600"
					rows={1}
				/>
				<div className="flex items-center justify-end gap-2">
					<SubmitButton
						type="submit"
						className="my-4 w-full rounded-md bg-neutral-700 px-6 py-3 text-sm font-semibold text-white shadow-md transition-colors hover:bg-neutral-800 md:w-auto"
						disabled={mutation.status === 'pending'}
					>
						{mutation.status === 'pending' ? 'Saving...' : 'Add user'}
					</SubmitButton>
				</div>
			</form>
		</FormProvider>
	);
};
