'use client';

import { DesktopIcon, MoonIcon, SunIcon } from '@radix-ui/react-icons';
import { useTheme } from 'next-themes';
import React, { useEffect, useState } from 'react';

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';


const data = [
  {
    value: 'light',
    icon: <SunIcon className="size-[1.2rem]" />,
  },
  {
    value: 'dark',
    icon: <MoonIcon className="size-[1.2rem] rotate-90 transition-all dark:rotate-0" />,
  },
  {
    value: 'system',
    icon: <DesktopIcon className="size-[1.2rem]" />,
  },
];

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Tabs defaultValue={theme}>
      <TabsList className="border">
        {data.map((d) => (
          <TabsTrigger key={d.value} onClick={() => setTheme(d.value)} value={d.value}>
            {d.icon}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
};

export default ThemeSwitcher;
