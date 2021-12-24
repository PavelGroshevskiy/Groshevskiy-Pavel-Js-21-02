import React, { ReactNode, useEffect, useState } from 'react';
import { TRUE_STRING } from '../constants/common';
import { getDarkTheme, setDarkTheme } from '../api/utils';

interface Props {
  children: ReactNode;
}

export interface ThemeContextState {
  darkTheme: boolean;
  toggleTheme: (value: boolean) => void;
  loading: boolean;
  toggleLoading: (value: boolean) => void;
}

const ThemeContext = React.createContext<Partial<ThemeContextState>>({});

const ThemeContextProvider = ({ children }: Props) => {
  const [darkTheme, setTheme] = useState<boolean>(getDarkTheme() === TRUE_STRING);

  const toggleTheme = (value: boolean) => {
    setDarkTheme(value.toString());
    setTheme(value);
    value ? document.body.classList.add('body_theme-dark') : document.body.classList.remove('body_theme-dark');
  };

  useEffect(() => {
    darkTheme ? document.body.classList.add('body_theme-dark') : document.body.classList.remove('body_theme-dark');
  });

  return <ThemeContext.Provider value={{ darkTheme, toggleTheme }}>{children}</ThemeContext.Provider>;
};

export { ThemeContextProvider, ThemeContext };
