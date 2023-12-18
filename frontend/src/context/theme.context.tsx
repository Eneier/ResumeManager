import {createContext, ReactNode, useState} from "react";

interface ITheme {
    darkMode: boolean;
    toggleTheme: () => void;
}
export const ThemeContext = createContext<ITheme>({
    darkMode: false,
    toggleTheme: () => {
    },
})
interface IThemeContextProviderProps {
    children: ReactNode
}
const ThemeContextProvider = ({children}: IThemeContextProviderProps) => {
    const [darkMode, setDarkMode] = useState<boolean>(true)

    const toggleTheme = (): void => {
        setDarkMode(prev => !prev)
    }

    return <ThemeContext.Provider value={{darkMode, toggleTheme}}>
        {children}
    </ThemeContext.Provider>
}

export default ThemeContextProvider