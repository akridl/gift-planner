import { redirect } from 'next/navigation';
import { Star } from 'lucide-react';

import { auth } from '@/auth';
import {
	Card,
	CardContent,
	CardHeader,
	CardFooter,
	CardTitle,
	CardDescription
} from '@/shadcn/ui/card';

const Home = async () => {
	const session = await auth();

	if (!session?.user) {
		redirect('/login');
	}

	return (
		<>
			<h1 className="text-center text-3xl font-semibold">
				Card example (temporary)
			</h1>
			<Card className="flex flex-col justify-between rounded-3xl md:flex-row 2xl:w-1/2">
				<div>
					<CardHeader className="text-left">
						<CardTitle className="text-2xl font-bold text-neutral-800">
							Dlhe meno darceka
						</CardTitle>
						<CardDescription className="text-gray-600">
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec
							nisl ut odio ultricies ...
						</CardDescription>
					</CardHeader>
					<CardContent className="flex flex-col items-start">
						<div className="flex flex-col gap-2 md:flex-row md:gap-10">
							<div className="flex items-center">
								<p className="mr-2 font-semibold text-gray-900">Price:</p>
								<p className="text-3xl font-light text-neutral-700">30€</p>
							</div>
							<div className="flex items-center">
								<p className="mr-2 font-semibold text-gray-900">Priority:</p>
								<div className="flex items-center">
									{[...Array(5)].map((_, i) => (
										<Star key={i} className="h-8 w-8 text-yellow-500" />
									))}
								</div>
							</div>
						</div>
						<p className="mt-4 text-sm text-neutral-500">
							<a href="/some-string">https://www.example.com</a>
						</p>
					</CardContent>
				</div>
				<CardFooter className="flex justify-center p-0 md:justify-end">
					<button className="m-6 w-full rounded-full bg-neutral-700 px-6 py-3 text-sm font-semibold text-white shadow-md transition-colors hover:bg-neutral-800 md:w-auto">
						Detail
					</button>
				</CardFooter>
			</Card>
		</>
	);
};

export default Home;
