import * as React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import ToggleDarkAndLight from '../../../components/ToggleDarkAndLight/ToggleDarkAndLight';
import { useTheme } from '../../../context/ThemeContext';

// Define the nav item type
type NavItem = {
  label: string;
  href: string;
};

// Nav items array
const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Login', href: '/login' },
  { label: 'Register', href: '/register' },
  { label: 'Contact', href: '/contact' },
];

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme } = useTheme();

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const imagePath =
    theme === 'light-mode'
      ? '/images/black_logo.png'
      : '/images/white_logo.png';

  return (
    <header className='w-full bg-background text-accent shadow-md border-b border-accent'>
      <div className='max-w-[1400px] mx-auto flex items-center justify-between p-6 font-primary'>
        {/* Logo */}
        <Link to='/' className='flex items-center'>
          <img src={imagePath} alt='Theme Image' className='w-32' />
        </Link>

        {/* Desktop Menu */}
        <nav className='hidden md:flex gap-8 text-lg font-medium'>
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className='hover:text-cta transition-colors duration-200'
            >
              {item.label}
            </a>
          ))}
          <ToggleDarkAndLight isOpen={true} />
        </nav>

        {/* Mobile Hamburger Button */}
        <button
          className='md:hidden flex flex-col gap-1.5'
          onClick={toggleMenu}
          aria-label='Toggle Menu'
        >
          <span className='w-6 h-0.5 bg-accent'></span>
          <span className='w-6 h-0.5 bg-accent '></span>
          <span className='w-6 h-0.5 bg-accent'></span>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className='md:hidden z-50 bg-background shadow-md border border-accent/40 rounded-lg p-4 absolute top-28 left-0 right-0 mx-auto max-w-[1400px]'>
          <nav className='flex flex-col items-center py-4 text-lg font-medium'>
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className='hover:text-cta transition-colors duration-200 font-medium border-b border-accent/40 w-full text-center py-3 px-4'
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <div className='px-3 py-4'>
              <ToggleDarkAndLight isOpen={true} />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
