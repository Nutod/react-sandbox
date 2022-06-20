import React from 'react'
import constate from 'constate'

const { Consumer, Provider } = React.createContext({})

export const ThemeConsumer = Consumer
export const ThemeProvider = Provider

type ThemeContextProps = {
  theme: 'light' | 'dark'
  toggleTheme: () => void
}

const ThemeContext = React.createContext({} as ThemeContextProps)

function useTheme() {
  const [theme, setTheme] = React.useState<'light' | 'dark'>('light')

  const toggleTheme = React.useCallback(() => {
    setTheme(theme => (theme === 'light' ? 'dark' : 'light'))
  }, [])

  return {
    theme,
    toggleTheme,
  }
}

export const [ThemeContextProvider, useThemeContext] = constate(useTheme)
