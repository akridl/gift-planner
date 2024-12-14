import { getGiftById } from '@/modules/gift/server-actions/get';
import { GiftForm } from '@/modules/gift/components/gift-form/gift-form';
import { BackButton } from '@/components/back-button';

type GiftEditPageProps = {
	params: Promise<{
		id: string;
	}>;
};

const GiftEditPage = async ({ params }: GiftEditPageProps) => {
	const { id } = await params;
	const gift = await getGiftById(Number(id));

	if (!gift) {
		return <div>Gift not found</div>;
	}

	return (
		<div className="container mx-auto p-4">
			<div className="flex items-center">
				<BackButton />
				<h1 className="text-3xl font-bold">Edit Gift Details</h1>
			</div>
			<GiftForm gift={gift} />
		</div>
	);
};

export default GiftEditPage;
