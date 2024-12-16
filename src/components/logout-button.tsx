'use client';

import { useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';

import { logout } from '@/server-actions/authenticate';

type LogOutButtonProps = {
	variant?: 'small' | 'full';
};

const LogOutButton = ({ variant = 'full' }: LogOutButtonProps) => {
	const router = useRouter();

	const handleSignOutAction = async () => {
		const response = await logout();

		if (response.redirectUrl) {
			router.push(response.redirectUrl);
		}
	};

	return (
		<button onClick={handleSignOutAction} className="flex items-center">
			<LogOut className="mx-2" />
			{variant === 'full' && <span className="text-gray-600">Log out</span>}
		</button>
	);
};

export default LogOutButton;
