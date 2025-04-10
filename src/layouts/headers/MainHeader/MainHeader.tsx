import * as React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

// Define the nav item type
type NavItem = {
  label: string;
  href: string;
};

// Nav items array
const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '#' },
  { label: 'Login', href: '/login' },
  { label: 'Register', href: '/register' },
  { label: 'Contact', href: '/contact' },
];

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
<<<<<<< HEAD
    <header className='w-full bg-background text-white border-b border-gray-200'>
=======
    <header className='w-full bg-background text-accent shadow-md'>
>>>>>>> 5c1f4e13d190922b8dbf15e96c9806ff2d2b2ec8
      <div className='max-w-[1400px] mx-auto flex items-center justify-between p-4 font-rubik'>
        {/* Logo */}
        <Link to='/' className='flex items-center'>
          <img className='w-32' src='/images/logo.png' alt='Logo' />
        </Link>

        {/* Desktop Menu */}
        <nav className='hidden md:flex gap-8 text-lg font-medium'>
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className='hover:text-primary transition-colors duration-200'
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Mobile Hamburger Button */}
        <button
          className='md:hidden flex flex-col gap-1.5'
          onClick={toggleMenu}
          aria-label='Toggle Menu'
        >
          <span className='w-6 h-0.5 bg-gray-200'></span>
          <span className='w-6 h-0.5 bg-gray-200 '></span>
          <span className='w-6 h-0.5 bg-gray-200'></span>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className='md:hidden bg-black shadow-md bor border-width: 1px rounded-lg p-4 absolute top-25 left-0 right-0 mx-auto max-w-[1400px]'>
          <nav className='flex flex-col items-center gap-6 py-6 text-lg font-medium'>
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className='hover:text-blue-500 transition-colors duration-200'
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
