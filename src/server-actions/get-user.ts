import { auth } from '@/auth';

export const getCurrentUserId = async () => {
	const session = await auth();
	const user = session?.user;
	if (!user?.id) {
		throw new Error('User not authenticated');
	}

	return Number(user.id);
};
