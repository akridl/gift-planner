import './globals.css';

import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import React from 'react';

import { auth } from '@/auth';
import Header from '@/components/header';
import { Providers } from '@/components/providers';

const poppins = Poppins({ subsets: ['latin'], weight: ['400'] });

export const metadata: Metadata = {
	title: 'Gift Planner',
	description:
		'Plan, organize, and share your gift ideas effortlessly with friends using our Gift Planner app.',
	keywords:
		'Gift planner, gift ideas, organize gifts, share gifts with friends, group gift planning, buy gifts for friends',
	authors: [
		{ name: 'Dominika Blehová' },
		{ name: 'Vít Nakládal' },
		{ name: 'Adam Krídl' }
	],
	openGraph: {
		title: 'Gift Planner - Plan, Organize, and Share Your Perfect Gifts',
		description:
			'Collaborate on gift ideas and stay organized with your group.',
		type: 'website',
		url: 'https://gift-planner-pv247.vercel.app/'
	},
	robots: 'index, follow'
};

export const generateViewport = () => ({
	width: 'device-width',
	initialScale: 1.0
});

const RootLayout = async ({
	children
}: Readonly<{
	children: React.ReactNode;
}>) => {
	const session = await auth();

	return (
		<html lang="en">
			<body
				className={`flex min-h-screen flex-col bg-gray-200 ${poppins.className}`}
			>
				<Providers>
					{session?.user && (
						<header>
							<Header />
						</header>
					)}
					<main className="container pb-10 pt-24">{children}</main>
				</Providers>
			</body>
		</html>
	);
};

export default RootLayout;
