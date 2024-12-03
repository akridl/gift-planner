'use client';

import { useRouter } from 'next/navigation';
import { SubmitButton } from '@/components/submit-button';
import { logout } from '@/server-actions/authenticate';

const SignOutButton = () => {
  const router = useRouter();

  const handleSignOutAction = async () => {
    const response = await logout();

    if (response.redirectUrl) {
      router.push(response.redirectUrl);
    }
  };

  return (
    <SubmitButton
      onClick={handleSignOutAction}
      className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"
    >
      <div className="hidden md:block">Sign Out</div>
    </SubmitButton>
  );
};

export default SignOutButton;