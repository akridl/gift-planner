import Link from 'next/link';
import Image from 'next/image';
import { ArrowRightIcon } from '@heroicons/react/20/solid';

export const GuestHomepage = () => (
	<div className="flex flex-col items-center justify-center text-center">
		<h1 className="mb-4 flex flex-col items-center text-4xl font-bold sm:text-5xl md:flex-row">
			<span className="mt-2 sm:mt-6">Welcome to</span>
			<Image src="/logo.png" alt="GiftPlanner logo" width={400} height={100} />
		</h1>
		<p className="mb-8 text-lg text-gray-700">
			Plan and organize your gift ideas effortlessly. Create friend groups,
			share your gift wishes, and make buying presents for your loved ones
			easier than ever. Join us to make every occasion truly special!
		</p>
		<div className="flex flex-col gap-4">
			<Link
				href="/login"
				className="flex items-center justify-center rounded-lg border border-gray-300 bg-white px-6 py-3 shadow-md transition-all hover:bg-gray-100 hover:shadow-xl"
			>
				Login
				<ArrowRightIcon className="ml-2 h-5 w-5" />
			</Link>
			<Link
				href="/register"
				className="flex items-center justify-center rounded-lg bg-neutral-500 px-6 py-3 text-white shadow-md hover:bg-neutral-600 hover:shadow-xl"
			>
				Register
				<ArrowRightIcon className="ml-2 h-5 w-5 text-white" />
			</Link>
		</div>
	</div>
);
