import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";



const ThemeContext =
  createContext();



export const ThemeProvider = ({
  children,
}) => {

  const [darkMode, setDarkMode] =
    useState(true);



  useEffect(() => {

    const savedTheme =
      localStorage.getItem("theme");

    if (savedTheme === "light") {
      setDarkMode(false);
    }

  }, []);



  useEffect(() => {

    if (darkMode) {

      document.documentElement.classList.add(
        "dark"
      );

      document.documentElement.classList.remove(
        "light"
      );

      localStorage.setItem(
        "theme",
        "dark"
      );

    } else {

      document.documentElement.classList.add(
        "light"
      );

      document.documentElement.classList.remove(
        "dark"
      );

      localStorage.setItem(
        "theme",
        "light"
      );

    }

  }, [darkMode]);



  const toggleTheme = () => {

    setDarkMode(!darkMode);

  };



  return (

    <ThemeContext.Provider
      value={{
        darkMode,
        toggleTheme,
      }}
    >

      {children}

    </ThemeContext.Provider>

  );

};



export const useTheme = () => {

  return useContext(
    ThemeContext
  );

};