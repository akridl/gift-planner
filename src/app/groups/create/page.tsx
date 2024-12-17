import { BackButton } from '@/components/back-button';
import { GroupForm } from '@/modules/groups/components/group-form/group-form';

const Page = async () => (
	<div className="container mx-auto p-4">
		<div className="flex items-center">
			<BackButton />
			<h1 className="text-3xl font-bold">Create new group</h1>
		</div>
		<GroupForm />
	</div>
);

export default Page;
