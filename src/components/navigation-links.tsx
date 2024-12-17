'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

type NavLinkProps = {
	className: string;
	linkClassName: string;
	isOpen?: boolean;
	setIsOpen?: (isOpen: boolean) => void;
};

const NavLinks = ({
	className,
	linkClassName,
	isOpen,
	setIsOpen
}: NavLinkProps) => {
	const pathname = usePathname();

	return (
		<ul className={className}>
			<Link
				href="/gifts"
				className={`${linkClassName} ${
					pathname === '/gifts' ? 'bg-gray-200' : 'text-gray-700'
				}`}
				onClick={() => setIsOpen && setIsOpen(!isOpen)}
			>
				Wishes
			</Link>
			<Link
				href="/buying"
				className={`${linkClassName} ${
					pathname === '/buying' ? 'bg-gray-200' : 'text-gray-700'
				}`}
				onClick={() => setIsOpen && setIsOpen(!isOpen)}
			>
				Buying
			</Link>
			<Link
				href="/groups"
				className={`${linkClassName} ${
					pathname.startsWith('/groups') ? 'bg-gray-200' : 'text-gray-700'
				}`}
				onClick={() => setIsOpen && setIsOpen(!isOpen)}
			>
				Groups
			</Link>
			<Link
				href="/profile"
				className={`${linkClassName} ${
					pathname === '/profile' ? 'bg-gray-200' : 'text-gray-700'
				}`}
				onClick={() => setIsOpen && setIsOpen(!isOpen)}
			>
				Profile
			</Link>
		</ul>
	);
};

export default NavLinks;
