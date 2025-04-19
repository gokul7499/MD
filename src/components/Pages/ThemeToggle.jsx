import { FaMoon, FaSun } from 'react-icons/fa';
import { useTheme } from "../ThemeContext";  // Import the hook

const Nav = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="navbar">
      <button onClick={toggleTheme}>
        {theme === 'light' ? <FaMoon /> : <FaSun />} {/* Icon toggles based on the theme */}
      </button>
    </div>
  );
};
