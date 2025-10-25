import * as Switch from '@radix-ui/react-switch';
import { useEffect, useState } from 'react';

function getSystemPrefersDark() {
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches;
}

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved ? saved === 'dark' : getSystemPrefersDark();
  });

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('dark', isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  return (
    <label className='flex items-center gap-2 cursor-pointer select-none'>
      <span className='sr-only'>Toggle color theme</span>
      <Switch.Root
        checked={isDark}
        onCheckedChange={setIsDark}
        aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        className='
          relative h-6 w-11 rounded-full border
          bg-gray-400 data-[state=checked]:bg-gray-900
          dark:bg-gray-700 dark:data-[state=checked]:bg-white
          transition-colors
        '
      >
        <Switch.Thumb
          className='
            block h-5 w-5 rounded-full bg-white dark:bg-gray-900
            shadow transition-transform translate-x-0.5
            data-[state=checked]:translate-x-[22px]
          '
        />
      </Switch.Root>
    </label>
  );
}
