import { type HTMLProps } from 'react';
import { useFormContext } from 'react-hook-form';

import { TextInput } from '@/components/text-input';

type FormTextFieldProps = HTMLProps<HTMLInputElement> & {
	name: string;
	label: string;
};

export const FormTextField = ({
	name,
	label,
	...inputProps
}: FormTextFieldProps) => {
	const { register } = useFormContext();

	return (
		<div className="flex flex-col gap-2">
			<label htmlFor={name}>{label}</label>

			<TextInput {...inputProps} {...register(name)} />
		</div>
	);
};
