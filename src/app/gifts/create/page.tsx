import { GiftForm } from '@/modules/gift/components/gift-form';

const Page = async () => (
	<div className="container mx-auto p-4">
		<h1 className="mb-4 text-2xl font-bold">Create new wish</h1>
		<GiftForm />
	</div>
);

export default Page;
