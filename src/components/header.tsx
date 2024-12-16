'use client';

import Image from 'next/image';
import Link from 'next/link';

import LogOutButton from './logout-button';
import { MobileMenu } from './mobile-menu';
import NavLinks from './navigation-links';

const Header = () => (
	<header className="fixed left-0 top-0 z-10 w-full bg-white py-2 shadow-md">
		<div className="container mx-auto flex justify-between">
			<div className="flex items-center">
				<Link href="/" aria-label="Homepage" className="mr-10">
					<Image
						src="/logo.png"
						alt="GiftPlanner logo"
						width={100}
						height={50}
					/>
				</Link>
				<nav aria-label="Main navigation" className="hidden lg:block">
					<NavLinks
						className="flex space-x-4"
						linkClassName="rounded-md px-4 py-2"
					/>
				</nav>
			</div>

			<div className="flex items-center">
				<div className="lg:hidden">
					<MobileMenu />
				</div>
				<div className="ml-4 lg:hidden">
					<LogOutButton variant="small" />
				</div>

				<div className="hidden lg:block">
					<LogOutButton />
				</div>
			</div>
		</div>
	</header>
);

export default Header;
