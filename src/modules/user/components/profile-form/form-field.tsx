import { useState } from 'react';
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';

import { EditButton } from '../edit-button';

type FormFieldProps = {
	label: string;
	name: string;
	initialValue: string;
	type?: string;
	isEditing: boolean;
	error?: string | null;
	onEdit: (isEditing: boolean) => void;
	onChange: (value: string) => void;
	onSubmit: (value: string) => void;
};

export const FormField = ({
	label,
	name,
	initialValue,
	type = 'text',
	isEditing,
	error,
	onEdit,
	onChange,
	onSubmit
}: FormFieldProps) => {
	const [value, setValue] = useState(initialValue);

	const handleSave = async () => {
		await onSubmit(value);
		onEdit(false);
	};

	const handleCancel = () => {
		setValue(initialValue);
		onEdit(false);
	};

	return (
		<div className="flex flex-col space-y-1">
			<div className="flex items-center justify-between">
				<label htmlFor={name} className="text-sm font-medium text-neutral-600">
					{label}
				</label>
				{isEditing ? (
					<div className="flex items-center space-x-2">
						<button
							onClick={handleSave}
							disabled={!!error}
							className={`my-2 rounded-full p-1 text-sm font-semibold text-white shadow-md transition-colors md:p-2 ${error ? 'cursor-not-allowed border border-neutral-400 bg-neutral-400 text-neutral-500' : 'bg-neutral-700 hover:bg-neutral-800'}`}
						>
							<CheckIcon className="h-5 w-5" />
						</button>
						<button
							onClick={handleCancel}
							className="rounded-full border border-neutral-300 bg-white p-1 text-sm font-semibold text-neutral-700 shadow-md transition-colors hover:bg-neutral-100 hover:text-neutral-900 md:p-2"
						>
							<XMarkIcon className="h-5 w-5" />
						</button>
					</div>
				) : (
					<EditButton onEdit={() => onEdit(true)} />
				)}
			</div>
			{isEditing ? (
				<input
					id={name}
					name={name}
					type={type}
					value={value}
					onChange={e => {
						const newValue = e.target.value;
						setValue(newValue);
						onChange(newValue);
					}}
					className={`w-3/4 rounded-md border px-4 py-2 text-sm shadow-sm focus:ring ${
						error
							? 'border-red-500 focus:ring-red-500'
							: 'border-neutral-300 focus:ring-neutral-500'
					}`}
				/>
			) : (
				<span className="text-neutral-800">{initialValue || 'N/A'}</span>
			)}
			{error && <p className="mt-1 text-sm text-red-500">{error}</p>}
		</div>
	);
};
