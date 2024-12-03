import Link from 'next/link';
import { redirect, useRouter } from 'next/navigation';
import { auth, signOut } from '@/auth';
import { SubmitButton } from '@/components/submit-button';
import { logout } from '@/server-actions/authenticate';
import { Sign } from 'crypto';
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
