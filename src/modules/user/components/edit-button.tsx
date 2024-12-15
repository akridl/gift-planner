import { PencilSquareIcon } from '@heroicons/react/24/outline';

type EditButtonProps = {
	onEdit: () => void;
};

export const EditButton = ({ onEdit }: EditButtonProps) => (
	<button
		onClick={onEdit}
		className="flex items-center gap-2 self-start rounded-full border border-neutral-300 bg-white px-3 py-1 text-sm font-semibold text-neutral-700 shadow-md transition-colors hover:bg-gray-300 hover:bg-neutral-100 hover:text-neutral-900 md:px-4 md:py-2"
	>
		Edit
		<PencilSquareIcon className="h-4 w-4 text-gray-500" />
	</button>
);
