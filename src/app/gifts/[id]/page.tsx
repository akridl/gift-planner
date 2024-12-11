import { getGiftById } from '@/modules/gift/server-actions/get';
import { GiftDetail } from '@/modules/gift/components/gift-detail';

const GiftDetailPage = async ({ params }: { params: { id: string } }) => {
	const { id } = await params;
	const gift = await getGiftById(Number(id));

	if (!gift) {
		return <div>Gift not found</div>;
	}

	return (
		<div className="container mx-auto p-4">
			<h1 className="mb-4 text-2xl font-bold">Gift Details</h1>
			<GiftDetail gift={gift} />
		</div>
	);
};

export default GiftDetailPage;
