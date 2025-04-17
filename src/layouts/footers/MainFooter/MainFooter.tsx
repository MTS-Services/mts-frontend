import * as React from 'react';
import {
  FaFacebookF,
  FaTwitter,
  FaYoutube,
  FaEnvelope,
  FaPhoneAlt,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { SiFiverr, SiUpwork, SiFreelancer, SiGooglemaps } from 'react-icons/si';
import { FaRegFaceMehBlank } from 'react-icons/fa6';
import { useTheme } from '../../../context/ThemeContext';

// Interfaces
interface SocialLink {
  icon: React.ReactNode;
  href: string;
  label: string;
}

interface Marketplace {
  label: string;
  href: string;
  icon: React.ReactNode;
}

// Social links and Marketplace data
const socialLinks: SocialLink[] = [
  {
    icon: <FaFacebookF size={20} />,
    href: 'https://www.facebook.com/MakTechSolution/',
    label: 'Facebook',
  },
  {
    icon: <FaTwitter size={20} />,
    href: 'https://x.com/MakTechSolution',
    label: 'Twitter',
  },
  {
    icon: <FaYoutube size={20} />,
    href: 'https://www.youtube.com/@MakTechSolution',
    label: 'YouTube',
  },
];

const marketplaces: Marketplace[] = [
  { label: 'Fiverr', href: 'https://fiverr.com', icon: <SiFiverr size={18} /> },
  { label: 'Upwork', href: 'https://upwork.com', icon: <SiUpwork size={18} /> },
  {
    label: 'Freelancer',
    href: 'https://freelancer.com',
    icon: <SiFreelancer size={18} />,
  },
  {
    label: 'Peopleperhour',
    href: 'https://peopleperhour.com',
    icon: <FaRegFaceMehBlank size={18} />,
  },
];

// Logo Section Component
const LogoSection = ({ imagePath }) => (
  <div className='relative md:right-[-50] flex flex-col md:items-center lg:items-start sm:w-[300px] text-center md:text-left w-full mx-w-[300px]'>
    {/* Logo */}
    <Link to='/' className='flex items-center justify-center'>
      <img src={imagePath} alt='Theme Image' className='w-32' />
    </Link>
    <p className='flex items-center pt-4 justify-center md:justify-start font-secondary '>
      MAK Tech Solution offers IT services, specializing in WordPress &
      development with 60+ experts, turning visions into reality.
    </p>
  </div>
);

// Branches Section Component
const Branches = () => (
  <div className='text-center md:text-left sm:w-[300px] text-accent font-primary'>
    <h3 className='text-xl font-semibold mb-3 leading-normal text-accent'>
      Branches
    </h3>
    <ul className='text-center md:text-left'>
      <li className='flex items-start gap-4 justify-center md:justify-start font-secondary'>
        <SiGooglemaps size={50} className='text-cta' />
        MAK Tech Solution (Jamuna): 6th Floor, A Majid Tower, Ka-24 Progati
        Sarani Rd, Dhaka 1229
      </li>
      <li className='flex items-center gap-4 mt-4 justify-center md:justify-start font-secondary'>
        <SiGooglemaps size={50} className='text-cta' />
        MAK Tech Solution (Banasree): Abdullah Park, House 180/6/23/CAD,
        Road-14, Block-C, Banasree, Dhaka 1219 (above PizzaBurg).
      </li>
    </ul>
  </div>
);

// Marketplaces Section Component
const MarketplacesList = () => (
  <div className='justify-center text-center md:text-left sm:w-[200px] mx-auto'>
    <h3 className='text-xl font-semibold mb-3 leading-normal font-primary text-accent'>
      Marketplaces
    </h3>
    <ul className='space-y-4 text-accent text-base leading-normal'>
      {marketplaces.map((marketplace, idx) => (
        <li key={idx}>
          <a
            href={marketplace.href}
            target='_blank'
            rel='noopener noreferrer'
            className='flex items-center gap-2 justify-center md:justify-start hover:text-cta transition-all'
            aria-label={`Visit ${marketplace.label}`}
          >
            {marketplace.icon}
            {marketplace.label}
          </a>
        </li>
      ))}
    </ul>
  </div>
);

// Contact Section Component
const Contact = () => (
  <div className='text-center md:text-left sm:w-[400px] text-accent font-primary'>
    <h3 className='text-xl font-semibold mb-3 leading-normal text-accent'>
      Contact Us
    </h3>
    <ul className='text-center md:text-left font-secondary'>
      <li className='flex items-center gap-2 justify-center md:justify-start mb-4'>
        <FaEnvelope size={16} className='text-cta' />
        contact@maktechsolution.com
      </li>
      <li className='flex items-center gap-2 justify-center md:justify-start'>
        <FaPhoneAlt size={16} className='text-cta' />
        Phone: 01886-159495
      </li>
    </ul>
    <FollowUs />
  </div>
);

// Follow Us Section Component
const FollowUs = () => (
  <div className='flex flex-col items-center md:items-start mt-4'>
    <h3 className='text-xl font-light mb-3 leading-normal text-accent font-primary'>
      Follow Us
    </h3>
    <div className='flex gap-5'>
      {socialLinks.map((social, idx) => (
        <a
          key={idx}
          href={social.href}
          target='_blank'
          rel='noopener noreferrer'
          className='text-accent hover:text-cta transition-colors'
          aria-label={social.label}
        >
          {social.icon}
        </a>
      ))}
    </div>
  </div>
);

// Footer Component
const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const { theme } = useTheme();

  const imagePath =
    theme === 'light-mode'
      ? '/images/black_logo.png'
      : '/images/white_logo.png';

  return (
    <footer className='w-full bg-background text-accent font-primary border-t border-accent/50'>
      <div className='max-w-[1400px] mx-auto px-4 py-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-8 mt-6'>
        <div className='col-span-1 text-center md:text-left'>
          <LogoSection imagePath={imagePath} />
        </div>

        <div className='col-span-1 text-center md:text-left'>
          <Branches />
        </div>

        <div className='col-span-1 text-center md:text-left'>
          <MarketplacesList />
        </div>

        <div className='col-span-1 text-center md:text-left'>
          <Contact />
        </div>
      </div>

      <div className='w-full border-t border-accent/50 mt-8'></div>

      {/* Footer Bottom */}
      <div className='max-w-[1400px] mx-auto px-4 py-4 text-center font-secondary'>
        <p className='text-sm text-accent leading-normal'>
          &copy; {currentYear} MAK-Tech Solution. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
