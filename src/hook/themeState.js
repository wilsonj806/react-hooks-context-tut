import { useState } from 'react';
import { lightTheme } from '../contexts/theme-context';

export const useTheme = (initialValue = true) => {
  const [ isLight, toggleTheme ] = useState(initialValue);

  return {
    isLight,
    toggleTheme: () => toggleTheme(!isLight)
  }
}