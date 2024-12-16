import { Menu, X } from 'lucide-react';
import { useState } from 'react';

import NavLinks from './navigation-links';

export const MobileMenu = () => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<>
			<button
				onClick={() => setIsOpen(!isOpen)}
				className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-300 bg-white shadow-md transition-all hover:shadow-lg"
			>
				{isOpen ? <X /> : <Menu />}
			</button>
			{isOpen && (
				<div className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden">
					<div className="fixed left-0 top-0 z-30 h-full w-3/4 bg-white shadow-lg">
						<div className="flex items-center justify-between border-b p-4">
							<h2 className="text-lg font-semibold">Menu</h2>
							<button
								onClick={() => setIsOpen(!isOpen)}
								aria-label="Close menu"
							>
								<X className="h-6 w-6" />
							</button>
						</div>
						<nav aria-label="Mobile navigation" className="p-4">
							<NavLinks
								className="space-y-4"
								linkClassName="block rounded-md px-4 py-2"
								isOpen={isOpen}
								setIsOpen={setIsOpen}
							/>
						</nav>
						<div className="border-t p-4" />
					</div>
				</div>
			)}
		</>
	);
};
