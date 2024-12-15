import { redirect } from 'next/navigation';

import { auth } from '@/auth';
import { ProfileForm } from '@/modules/user/components/profile-form/profile-form';
import { getUserById } from '@/modules/user/server-actions/get';
import { AppLoader } from '@/components/app-loader';

const Page = async () => {
	const session = await auth();

	if (!session?.user) {
		redirect('/login');
	}

	const user = await getUserById(Number(session.user.id));

	return (
		<>
			<h1 className="text-3xl">Account settings</h1>
			{user ? <ProfileForm user={user} /> : <AppLoader />}
		</>
	);
};

export default Page;
