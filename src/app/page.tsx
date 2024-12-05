import Link from 'next/link';
import { redirect } from 'next/navigation';

import { auth } from '@/auth';
import SignOutButton from '@/components/signout-button';

const Home = async () => {
	const session = await auth();

	if (!session?.user) {
		redirect('/login');
	}

	return (
		<>
			<h1 className="text-3xl">Gift planner</h1>
			<div>
				<h1>Current user: {session.user.name}</h1>
				<pre>{JSON.stringify(session.user, null, 2)}</pre>
			</div>
			<div className="mt-2 flex flex-col gap-y-2">
				<Link href="/gifts">Gifts</Link>
				<Link href="/gifts/create">Create gift</Link>
			</div>
			<SignOutButton />
		</>
	);
};

export default Home;
