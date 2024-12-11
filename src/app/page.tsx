import { redirect } from 'next/navigation';

import { auth } from '@/auth';

const Home = async () => {
	const session = await auth();

	if (!session?.user) {
		redirect('/login');
	}

	return <>Wishes</>;
};

export default Home;
