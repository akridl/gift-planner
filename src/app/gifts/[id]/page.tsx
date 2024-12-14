import { getGiftById } from '@/modules/gift/server-actions/get';
import { GiftDetail } from '@/modules/gift/components/gift-detail';
import { BackButton } from '@/components/back-button';

type GiftDetailPageProps = {
	params: Promise<{
		id: string;
	}>;
};

const GiftDetailPage = async ({ params }: GiftDetailPageProps) => {
	const { id } = await params;
	const gift = await getGiftById(Number(id));

	if (!gift) {
		return <div>Gift not found</div>;
	}

	return (
		<div className="container mx-auto p-4">
			<div className="flex items-center">
				<BackButton />
				<h1 className="text-3xl font-bold">Gift Details</h1>
			</div>
			<GiftDetail gift={gift} />
		</div>
	);
};

export default GiftDetailPage;
