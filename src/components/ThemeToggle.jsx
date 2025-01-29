import { useEffect } from 'react';

const ThemeToggle = () => {
  const toggleTheme = () => {
    const newTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const isDarkMode = document.documentElement.getAttribute('data-theme') === 'dark';
  const icon = isDarkMode ? 'light_mode': 'dark_mode' ;

  return (
    <button 
      className="theme-toggle" 
      onClick={toggleTheme}
      aria-label="Toggle theme"
    >
      <span className="material-icons">
        dark_mode
      </span>
    </button>
  );
};

export default ThemeToggle;
