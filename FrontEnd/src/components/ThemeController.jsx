import { MoonIcon, SunIcon } from 'lucide-react'
import { useEffect, useState } from 'react'

const ThemeController = () => {
  const [theme, setTheme] = useState('coffee')

  // Load theme from localStorage on initial render
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'coffee'
    setTheme(savedTheme)
    document.documentElement.setAttribute('data-theme', savedTheme)
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'coffee' ? 'forest' : 'coffee'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    document.documentElement.setAttribute('data-theme', newTheme)
  }

  return (
    <button 
      onClick={toggleTheme}
      className="btn btn-ghost btn-circle"
      aria-label="Toggle theme"
    >
      {theme === 'coffee' ? (
        <MoonIcon className="size-7" />
      ) : (
        <SunIcon className="size-5" />
      )}
    </button>
  )
}

export default ThemeController