import { useForm, FormProvider } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { PasswordField } from './password-field';
import { useState } from 'react';
import { EditButton } from '../edit-button';
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';

const passwordSchema = z
	.object({
		password: z.string().min(6, 'Password must be at least 6 characters long.'),
		confirmPassword: z
			.string()
			.min(6, 'Password confirmation must be at least 6 characters long.')
	})
	.refine(data => data.password === data.confirmPassword, {
		message: 'Passwords must match',
		path: ['confirmPassword']
	});

type PasswordFormValues = z.infer<typeof passwordSchema>;

export const PasswordForm = ({
	onSubmit
}: {
	onSubmit: (data: { password: string; confirmPassword: string }) => void;
}) => {
	const [isEditing, setIsEditing] = useState(false);

	const formMethods = useForm<PasswordFormValues>({
		resolver: zodResolver(passwordSchema),
		defaultValues: { password: '', confirmPassword: '' },
		mode: 'onChange'
	});

	const { formState } = formMethods;
	const { isValid } = formState;

	const handleSubmit = (data: PasswordFormValues) => {
		console.log('Form data: ', data);
		onSubmit(data);
		formMethods.reset();
		setIsEditing(false);
	};

	return (
		<FormProvider {...formMethods}>
			<form
				onSubmit={formMethods.handleSubmit(handleSubmit)}
				className="space-y-4 rounded-lg bg-white py-2"
			>
				<div className="flex items-center justify-between">
					<div className="w-3/4">
						<PasswordField
							name="password"
							label="New password"
							isEditing={isEditing}
						/>
					</div>
					{isEditing ? (
						<div className="flex items-center space-x-2">
							<button
								type="submit"
								disabled={!isValid}
								className={`my-2 rounded-full border border-neutral-700 p-1 text-sm font-semibold text-white shadow-md transition-colors md:p-2 ${!isValid ? 'cursor-not-allowed border-neutral-400 bg-neutral-400 text-neutral-500' : 'bg-neutral-700 hover:bg-neutral-800'}`}
							>
								<CheckIcon className="h-5 w-5" />
							</button>
							<button
								onClick={() => setIsEditing(false)}
								className="rounded-full border border-neutral-300 bg-white p-1 text-sm font-semibold text-neutral-700 shadow-md transition-colors hover:bg-neutral-100 hover:text-neutral-900 md:p-2"
							>
								<XMarkIcon className="h-5 w-5" />
							</button>
						</div>
					) : (
						<EditButton onEdit={() => setIsEditing(true)} />
					)}
				</div>
				<div className="w-3/4">
					<PasswordField
						name="confirmPassword"
						label="Confirm Password"
						isEditing={isEditing}
					/>
				</div>
			</form>
		</FormProvider>
	);
};
