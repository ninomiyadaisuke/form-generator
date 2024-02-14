import { UserButton } from '@clerk/nextjs';
import { ReactNode } from 'react';

import Logo from './_components/Logo';
import ThemeSwitcher from './_components/ThemeSwitcher';

function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex max-h-screen min-h-screen min-w-full flex-col bg-background">
      <nav className="flex h-[60px] items-center justify-between border-b border-border px-4 py-2">
        <Logo />
        <div className="flex items-center gap-4">
          <ThemeSwitcher />
          <UserButton afterSignOutUrl="/sign-in" />
        </div>
      </nav>
      <main className="flex w-full grow">{children}</main>
    </div>
  );
}

export default Layout;
