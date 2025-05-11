import * as React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import ToggleDarkAndLight from "../../../components/ToggleDarkAndLight/ToggleDarkAndLight";
import { AuthContext } from "../../../context/AuthProvider";
import { useTheme } from "../../../context/ThemeContext";

// Define the nav item type
type NavItem = {
  label: string;
  href: string;
};

// Nav items array
const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Deshboard", href: "/dashboard/over-view" },
  { label: "Login", href: "/login" },
  { label: "Register", href: "/register" },
  { label: "Contact", href: "/contact" },
];

const Header: React.FC = () => {
  const { user } = React.useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme } = useTheme();

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const imagePath =
    theme === "light-mode"
      ? "/images/black_logo.png"
      : "/images/white_logo.png";

  return (
    <header className="bg-background text-accent border-accent/50 w-full border-b shadow-md">
      <div className="font-primary mx-auto flex max-w-[1400px] items-center justify-between p-6">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img src={imagePath} alt="Theme Image" className="w-32" />
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden gap-8 text-lg font-medium md:flex">
          {NAV_ITEMS.map((item) => {
            const isAuthItem =
              item.label === "Login" || item.label === "Register";

            if ((user && !isAuthItem) || (!user && isAuthItem)) {
              return (
                <a
                  key={item.label}
                  href={item.href}
                  className="hover:text-cta transition-colors duration-200"
                >
                  {item.label}
                </a>
              );
            }

            return null;
          })}
          <ToggleDarkAndLight isOpen={true} />
        </nav>

        {/* Mobile Hamburger Button */}
        <button
          className="flex flex-col gap-1.5 md:hidden"
          onClick={toggleMenu}
          aria-label="Toggle Menu"
        >
          <span className="bg-accent h-0.5 w-6"></span>
          <span className="bg-accent h-0.5 w-6"></span>
          <span className="bg-accent h-0.5 w-6"></span>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="bg-background border-accent/40 absolute top-28 right-0 left-0 z-50 mx-auto max-w-[1400px] rounded-lg border p-4 shadow-md md:hidden">
          <nav className="flex flex-col items-center py-4 text-lg font-medium">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="hover:text-cta border-accent/40 w-full border-b px-4 py-3 text-center font-medium transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <div className="px-3 py-4">
              <ToggleDarkAndLight isOpen={true} />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
