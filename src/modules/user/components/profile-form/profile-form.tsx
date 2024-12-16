'use client';

import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { z } from 'zod';
import { toast } from 'sonner';

import { type UpdateUser, type User } from '@/db/schema/users';
import { updateUser } from '@/modules/user/server-actions/update';

import { profileFormSchema, type ProfileFormSchema } from './schema';
import { FormField } from './form-field';
import { PasswordForm } from './password-form';

type ProfileFormProps = {
	user: User;
};

export const ProfileForm = ({ user }: ProfileFormProps) => {
	const [editingField, setEditingField] = useState<string | null>(null);
	const [errors, setErrors] = useState<Record<string, string | null>>({});

	const mutation = useMutation({
		mutationFn: async (data: Partial<UpdateUser>) => {
			await updateUser(user.id, data);
		},
		onSuccess: () => {
			setEditingField(null);
		},
		onError: error => {
			console.error(error);
		}
	});

	const handleSubmit = async (
		field: keyof ProfileFormSchema,
		value: string
	) => {
		try {
			profileFormSchema.innerType().shape[field].parse(value);
			await mutation.mutateAsync({ [field]: value });
			toast.success(`${field} updated successfully`);
		} catch (error) {
			if (error instanceof z.ZodError) {
				console.log(error.errors[0].message);
				setErrors(prev => ({ ...prev, [field]: error.errors[0].message }));
				toast.error(`Failed to update ${field}`);
			}
		}
	};

	const handlePasswordSubmit = async (data: {
		password: string;
		confirmPassword: string;
	}) => {
		const { password } = data;

		try {
			profileFormSchema.innerType().shape.password.parse(password);
			await mutation.mutateAsync({ password });
			toast.success(`Password updated successfully`);
		} catch (error) {
			if (error instanceof z.ZodError) {
				console.log(error.errors[0].message);
				setErrors(prev => ({ ...prev, password: error.errors[0]?.message }));
				toast.error(`Failed to update password`);
			}
		}
	};

	const handleChange = (field: keyof ProfileFormSchema, value: string) => {
		try {
			profileFormSchema.innerType().shape[field].parse(value);
			setErrors(prev => ({ ...prev, [field]: null }));
		} catch (error) {
			if (error instanceof z.ZodError) {
				setErrors(prev => ({
					...prev,
					[field]: error.errors[0]?.message || null
				}));
			}
		}
	};

	const handleCancel = (field: string) => {
		setErrors(prev => ({ ...prev, [field]: null }));
	};

	return (
		<div className="mt-4 rounded-xl bg-white px-6 py-3 shadow-md">
			<h2 className="mb-4 text-2xl font-bold">My Profile</h2>
			<div className="space-y-4">
				<FormField
					label="Name"
					name="name"
					initialValue={user.name ?? ''}
					isEditing={editingField === 'name'}
					error={errors.name}
					onEdit={isEditing => setEditingField(isEditing ? 'name' : null)}
					onChange={value => handleChange('name', value)}
					onSubmit={value => handleSubmit('name', value)}
					onCancel={handleCancel}
				/>
				<FormField
					label="Email"
					name="email"
					initialValue={user.email ?? ''}
					isEditing={editingField === 'email'}
					error={errors.email}
					onEdit={isEditing => setEditingField(isEditing ? 'email' : null)}
					onChange={value => handleChange('email', value)}
					onSubmit={value => handleSubmit('email', value)}
					onCancel={handleCancel}
				/>
				<FormField
					label="Username"
					name="username"
					initialValue={user.username ?? ''}
					isEditing={editingField === 'username'}
					error={errors.username}
					onEdit={isEditing => setEditingField(isEditing ? 'username' : null)}
					onChange={value => handleChange('username', value)}
					onSubmit={value => handleSubmit('username', value)}
					onCancel={handleCancel}
				/>
				<PasswordForm onSubmit={handlePasswordSubmit} />
			</div>
		</div>
	);
};
