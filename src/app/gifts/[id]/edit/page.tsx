import { getGiftById } from '@/modules/gift/server-actions/get';
import { GiftForm } from '@/modules/gift/components/gift-form';

type GiftEditPageProps = {
	params: {
		id: string;
	};
};

const GiftEditPage = async ({ params }: GiftEditPageProps) => {
	const { id } = await params;
	const gift = await getGiftById(Number(id));

	if (!gift) {
		return <div>Gift not found</div>;
	}

	return (
		<div className="container mx-auto p-4">
			<h1 className="mb-4 text-2xl font-bold">Edit Gift Details</h1>
			<GiftForm gift={gift} />
		</div>
	);
};

export default GiftEditPage;
