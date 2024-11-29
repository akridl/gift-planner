'use client';

import { toast } from 'sonner';

import { SubmitButton } from '@/components/submit-button';

export const CreateGiftButton = () => (
	<SubmitButton
		onClick={() => {
			console.log('You clicked me');
			toast('Yeah, I am lazy, I did not create any gift');
		}}
	>
		Create gift
	</SubmitButton>
);
