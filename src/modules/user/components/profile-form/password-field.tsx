import { useFormContext } from 'react-hook-form';

type PasswordFieldProps = {
	name: 'password' | 'confirmPassword';
	label: string;
	isEditing: boolean;
};

export const PasswordField = ({
	name,
	label,
	isEditing
}: PasswordFieldProps) => {
	const {
		register,
		formState: { errors }
	} = useFormContext();

	return (
		<div className="flex flex-col space-y-1">
			<label htmlFor={name} className="text-sm font-medium text-gray-700">
				{label}
			</label>
			{isEditing ? (
				<input
					id={name}
					type="password"
					{...register(name)}
					className={`w-full rounded-md border px-4 py-2 shadow-sm focus:ring ${
						errors[name]
							? 'border-red-500 focus:ring-red-500'
							: 'border-gray-300 focus:ring-blue-500'
					}`}
				/>
			) : (
				<span className="text-neutral-800">******</span>
			)}
			{errors[name] && (
				<p className="text-sm text-red-500">
					{(errors[name] as { message: string }).message}
				</p>
			)}
		</div>
	);
};
