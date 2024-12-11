import './globals.css';

import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import React from 'react';

import { Providers } from '@/components/providers';

import NavLinks from './navigation-links';

const poppins = Poppins({ subsets: ['latin'], weight: ['400'] });

export const metadata: Metadata = {
	title: 'Gift planner'
};

const RootLayout = ({
	children
}: Readonly<{
	children: React.ReactNode;
}>) => (
	<html lang="en">
		<body
			className={`flex min-h-screen flex-col bg-gray-200 ${poppins.className}`}
		>
			<Providers>
				<header className="flex w-full bg-gray-300">
					<NavLinks />
				</header>
				<main className="container py-10">{children}</main>
			</Providers>
		</body>
	</html>
);

export default RootLayout;
