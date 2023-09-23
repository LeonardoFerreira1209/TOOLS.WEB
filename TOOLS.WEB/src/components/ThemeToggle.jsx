import React from 'react';
import { useThemeProvider } from '../components/store/context/ThemeContext';

export default function ThemeToggle() {
  const { currentTheme, changeCurrentTheme } = useThemeProvider();

  return (
    <div>
      <input
        type="checkbox"
        name="light-switch"
        id="light-switch"
        className="light-switch sr-only"
        checked={currentTheme === 'light'}
        onChange={() => changeCurrentTheme(currentTheme === 'light' ? 'dark' : 'light')}
      />
      <label
        className="flex items-center justify-center cursor-pointer w-8 h-8 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600/80 rounded-full"
        htmlFor="light-switch"
      >
        <div className="dark:hidden">
          <lord-icon
              src="https://cdn.lordicon.com/pzuyobdc.json"
              trigger="loop"
              delay="0"
              colors="outline:#121331,primary:#ffc738"
              >
          </lord-icon>
        </div>
        <div className="hidden dark:block">
          <lord-icon
              src="https://cdn.lordicon.com/immloges.json"
              trigger="loop"
              delay="0"
              colors="primary:#ebe6ef,secondary:#121331"
              state="hover"
              >
          </lord-icon>
        </div>
        <span className="sr-only">Switch to light / dark version</span>
      </label>
    </div>
  );
}
