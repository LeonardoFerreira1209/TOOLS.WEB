import { createContext } from "react";

const ThemeContext = createContext({
    currentTheme: 'light',
    changeCurrentTheme: () => {},
  });

  export default ThemeContext;