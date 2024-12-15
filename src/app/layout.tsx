import './globals.css';

import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import React from 'react';

import { Providers } from '@/components/providers';
import Header from '@/components/header';

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
				<header>
					<Header />
				</header>
				<main className="container pb-10 pt-24">{children}</main>
			</Providers>
		</body>
	</html>
);

export default RootLayout;
