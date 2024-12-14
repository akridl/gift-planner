import { redirect } from 'next/navigation';

import { auth } from '@/auth';

const Page = async () => {
	const session = await auth();

	if (!session?.user) {
		redirect('/login');
	}

	return (
		<>
			<h1 className="text-3xl">User data</h1>
			<div>
				<h1>Current user: {session.user.name}</h1>
				<pre>{JSON.stringify(session.user, null, 2)}</pre>
			</div>
		</>
	);
};

export default Page;
