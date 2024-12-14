import { type HTMLProps } from 'react';
import { useFormContext } from 'react-hook-form';

import { TextInput } from '@/components/text-input';
import { cn } from '@/lib/utils';

type FormTextFieldProps = HTMLProps<HTMLInputElement> & {
	name: string;
	label: string;
	labelClassName?: string;
	as?: 'input' | 'textarea';
};

export const FormTextField = ({
	name,
	label,
	required,
	labelClassName,
	as = 'input',
	...inputProps
}: FormTextFieldProps) => {
	const {
		register,
		formState: { errors }
	} = useFormContext();

	return (
		<div className="flex flex-col gap-1.5">
			<label htmlFor={name} className={`block ${labelClassName ?? ''}`}>
				{required && <span className="text-red-500">*</span>} {label}
			</label>

			{as === 'textarea' ? (
				<textarea
					{...(inputProps as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
					{...register(name)}
					id={name}
					className={cn(
						'mt-1 block w-full rounded-lg border bg-white p-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200',
						errors[name] && 'border-red-600',
						inputProps.className
					)}
				/>
			) : (
				<TextInput
					{...(inputProps as React.InputHTMLAttributes<HTMLInputElement>)}
					{...register(name)}
					id={name}
					className={cn(
						'mt-1 block w-full rounded-lg border bg-white p-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200',
						errors[name] && 'border-red-600',
						inputProps.className
					)}
				/>
			)}

			{errors[name] && (
				<span className="text-sm leading-none text-red-600">
					{errors[name]?.message?.toString()}
				</span>
			)}
		</div>
	);
};
