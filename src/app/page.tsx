import Link from 'next/link';

const Home = () => (
	<>
		<h1 className="text-3xl">Gift planner</h1>
		<div className="mt-2 flex flex-col gap-y-2">
			<Link href="/gifts">Gifts</Link>
			<Link href="/gifts/create">Create gift</Link>
		</div>
	</>
);

export default Home;
