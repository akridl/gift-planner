'use client';

import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

import { type CreateGroup } from '@/db/schema/group';
import { useCreateGroupMutation } from '@/modules/groups/hooks/create';
import { FormTextField } from '@/components/form-fields/form-text-field';
import { SubmitButton } from '@/components/submit-button';
import { CancelDialog } from '@/components/cancel-dialog';
import { groupFormSchema } from '@/modules/groups/components/group-form/schema';

type GroupFormProps = {
	group?: CreateGroup;
};

export const GroupForm = ({ group }: GroupFormProps) => {
	const methods = useForm<CreateGroup>({
		resolver: zodResolver(groupFormSchema),
		defaultValues: {
			name: group?.name ?? '',
			description: group?.description ?? ''
		}
	});

	const router = useRouter();
	const mutation = useCreateGroupMutation();
	const { reset, handleSubmit } = methods;

	const onSubmit = (data: CreateGroup) => {
		console.log('calling mutate with: ', data);
		mutation.mutate(data, {
			onSuccess: () => {
				toast.success('New group with you as the owner was created');
				reset();
				router.push('/groups');
				router.refresh();
			},
			onError: error => {
				toast.error(error.message);
			}
		});
	};

	return (
		<div className="mt-4 rounded-xl bg-white px-6 py-3 shadow-md">
			<h2 className="mb-4 text-2xl font-bold">Group</h2>
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
							triggerBody={<p>Cancel</p>}
							triggerClassName="rounded-md bg-white border border-neutral-300 px-6 py-3 text-sm font-semibold text-neutral-700 shadow-md transition-colors hover:bg-neutral-100 hover:text-neutral-900 w-full md:w-auto"
							confirmClassName="rounded-md bg-neutral-700 px-6 py-3 text-sm font-semibold text-white shadow-md transition-colors hover:bg-neutral-800"
						/>
					</div>
				</form>
			</FormProvider>
		</div>
	);
};
