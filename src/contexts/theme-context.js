import { createContext } from 'react';

/**
 * Context notes
 * ==============================================
 * - note that the input for createContext is for setting a default value for the context
 *
 */
/*
 * Defining root styles
 * - said style overrides Material UI's defaults
*/
const lightStyles = {};

const darkStyles = {
  backgroundColor: 'indigo',
};

const lightTheme = {
  color: 'primary',
  styles: lightStyles
};

const darkTheme = {
  color: 'secondary',
  styles: darkStyles
}

const ThemeContext = createContext(lightTheme);

export { ThemeContext, lightTheme, darkTheme };
