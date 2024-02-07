import { ReactNode } from 'react';

import Logo from './_components/Logo';

function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex max-h-screen min-h-screen min-w-full flex-col bg-background">
      <nav className="flex h-[60px] items-center justify-between border-b border-border px-4 py-2">
        <Logo />
      </nav>
      <main>{children}</main>
    </div>
  );
}

export default Layout;
