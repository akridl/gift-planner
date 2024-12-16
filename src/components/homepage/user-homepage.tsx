'use client';

import { useRouter } from 'next/navigation';

export const UserHomepage = ({ user }: { user: { name: string } }) => {
	const router = useRouter();

	return (
		<div className="mt-10 flex flex-col items-center justify-center text-center">
			<h1 className="mb-4 text-4xl font-bold">Welcome back, {user.name}!</h1>
			<p className="mb-8 text-lg text-gray-700">
				Manage your gifts or make someone’s day special 😊.
			</p>
			<div className="flex flex-col gap-4 md:flex-row">
				<button
					className="rounded-lg bg-[#C22653] px-6 py-3 text-white hover:bg-[#A31D47] hover:shadow-xl"
					onClick={() => router.push('/gifts')}
				>
					View My Gifts
				</button>
				<button
					className="rounded-lg bg-[#E67E39] px-6 py-3 text-white hover:bg-[#CF6E30] hover:shadow-xl"
					onClick={() => router.push('/gifts/create')}
				>
					Add a New Gift
				</button>
				<button
					className="rounded-lg bg-[#F8B630] px-6 py-3 text-white hover:bg-[#DDA626] hover:shadow-xl"
					onClick={() => router.push('/groups')}
				>
					View My Groups
				</button>
			</div>
		</div>
	);
};
