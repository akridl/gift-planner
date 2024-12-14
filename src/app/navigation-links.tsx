'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import SignOutButton from '@/components/signout-button';

const NavLinks = () => {
	const pathname = usePathname();

	return (
		<nav className="container flex justify-between gap-5 py-5">
			<div className="flex gap-5">
				<Link
					href="/gifts"
					className={`rounded-md px-4 py-2 ${
						pathname === '/gifts' ? 'bg-white' : 'text-gray-700'
					}`}
				>
					Wishes
				</Link>
				<Link
					href="/buying"
					className={`rounded-md px-4 py-2 ${
						pathname === '/buying' ? 'bg-white' : 'text-gray-700'
					}`}
				>
					Buying
				</Link>
				<Link
					href="/groups"
					className={`rounded-md px-4 py-2 ${
						pathname === '/groups' ? 'bg-white' : 'text-gray-700'
					}`}
				>
					Groups
				</Link>
				<Link
					href="/profile"
					className={`rounded-md px-4 py-2 ${
						pathname === '/profile' ? 'bg-white' : 'text-gray-700'
					}`}
				>
					Profile
				</Link>
			</div>
			<SignOutButton />
		</nav>
	);
};

export default NavLinks;
