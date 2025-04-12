// import { createContext, useContext, useState } from "react";

// const ThemeContext = createContext();

// export const ThemeProvider = ({ children }) => {
//   const [theme, setTheme] = useState("dark-mode");
//   const toggleTheme = () => {
//     setTheme((prev) => (prev === "light-mode" ? "dark-mode" : "light-mode"));
//   };

//   return (
//     <ThemeContext.Provider value={{ theme, toggleTheme }}>
//       {children}
//     </ThemeContext.Provider>
//   );
// };

// export const useTheme = () => useContext(ThemeContext);

import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("dark-mode");

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light-mode" ? "dark-mode" : "light-mode"));
  };

  // ✅ This applies theme to <html>
  useEffect(() => {
    const root = document.documentElement;

    // Remove previous theme classes
    root.classList.remove("light-mode", "dark-mode");

    // Add current theme
    root.classList.add(theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
