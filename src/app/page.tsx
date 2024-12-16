import { auth } from '@/auth';
import { GuestHomepage } from '@/components/homepage/guest-homepage';
import { UserHomepage } from '@/components/homepage/user-homepage';

const Home = async () => {
	const session = await auth();

	if (!session?.user) {
		return <GuestHomepage />;
	}

	return (
		<UserHomepage
			user={{ ...session.user, name: session.user.name ?? 'Guest' }}
		/>
	);
};

export default Home;
