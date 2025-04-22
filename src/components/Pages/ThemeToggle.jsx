import { FaMoon, FaSun } from 'react-icons/fa';
import { useTheme } from "../ThemeContext";
const Nav = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <div className="navbar">
      <button onClick={toggleTheme}>
        {theme === 'light' ? <FaMoon /> : <FaSun />}
      </button>
    </div>
  );
};
