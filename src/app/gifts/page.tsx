import { readGifts } from '@/modules/gift/server-actions';

const Page = async () => {
	const gifts = await readGifts();
};

export default Page;
