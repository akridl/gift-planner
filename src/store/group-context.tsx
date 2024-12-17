'use client';

import {
	createContext,
	type PropsWithChildren,
	useContext,
	useState
} from 'react';

import { type Group } from '@/db/schema/group';

type GroupContextType = {
	group: Group | null;
	setGroup: (group: Group) => void;
};

const GroupContext = createContext<GroupContextType | null>(null);

export const GroupProvider = ({ children }: PropsWithChildren) => {
	const [group, setGroup] = useState<Group | null>(null);

	return (
		<GroupContext.Provider value={{ group, setGroup }}>
			{children}
		</GroupContext.Provider>
	);
};

export const useGroupContext = () => {
	const context = useContext(GroupContext);

	if (!context) {
		throw new Error('useGroupContext must be used within a GroupProvider');
	}

	return context;
};
