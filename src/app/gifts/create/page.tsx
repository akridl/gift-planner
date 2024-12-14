import { BackButton } from '@/components/back-button';
import { GiftForm } from '@/modules/gift/components/gift-form/gift-form';

const Page = async () => (
	<div className="container mx-auto p-4">
		<div className="flex items-center">
			<BackButton />
			<h1 className="text-3xl font-bold">Create new wish</h1>
		</div>
		<GiftForm />
	</div>
);

export default Page;
