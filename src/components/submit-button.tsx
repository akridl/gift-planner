'use client';

import React from 'react';

import { Button } from '@/shadcn/ui/button';

export type SubmitButtonProps = React.PropsWithChildren<
	React.ButtonHTMLAttributes<HTMLButtonElement>
>;

export const SubmitButton = ({ children, ...props }: SubmitButtonProps) => (
	<Button {...props}>{children}</Button>
);
