'use client';
import { type FormEvent, useRef } from 'react';
import { toast } from 'sonner';

import { useAddGroupMemberMutation } from '../../hooks/create';

export const AddMemberForm = ({ groupId }: { groupId: number }) => {
	const inputRef = useRef<HTMLInputElement>(null);
	const mutation = useAddGroupMemberMutation();

	const onSubmit = (e: FormEvent) => {
		e.preventDefault();

		const value = inputRef.current?.valueAsNumber;
		console.log('ahoj value:', value, inputRef);

		if (value) {
			mutation.mutate(
				{ userId: value, groupId },
				{
					onSuccess: () => {
						toast.success('User was successfully added to the group');
					},
					onError: error => {
						toast.error(error.message);
					}
				}
			);
		}
	};

	return (
		<form onSubmit={onSubmit} className="grow">
			<div className="flex flex-col">
				<div className="flex w-1/2 gap-x-2">
					<input
						ref={inputRef}
						id="note-input"
						className="grow rounded-md border-2 p-1.5"
						type="text"
					/>
					<button
						className="rounded-md border bg-white px-4 shadow-md"
						type="submit"
					>
						Add user
					</button>
				</div>
			</div>
		</form>
	);
};
