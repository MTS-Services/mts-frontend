import React from 'react';
import {
  FaFacebookF,
  FaTwitter,
  FaYoutube,
  FaEnvelope,
  FaPhoneAlt,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { SiFiverr, SiUpwork, SiFreelancer, SiGooglemaps } from 'react-icons/si'; // Marketplaces icons
import { FaRegFaceMehBlank } from 'react-icons/fa6';



const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  // Marketplaces and Social Links

  const marketplaces = [
    {
      label: 'Fiverr',
      href: 'https://fiverr.com',
      icon: <SiFiverr size={18} />,
    },
    {
      label: 'Upwork',
      href: 'https://upwork.com',
      icon: <SiUpwork size={18} />,
    },
    {
      label: 'Freelancer',
      href: 'https://freelancer.com',
      icon: <SiFreelancer size={18} />,
    },
    {
      label: 'peopleperhour',
      href: 'https://peopleperhour.com',
      icon: <FaRegFaceMehBlank size={18} />,
    },
  ];

  const socialLinks = [
    {
      icon: <FaFacebookF size={20} />,
      href: 'https://www.facebook.com/MakTechSolution/',
    },
    {
      icon: <FaTwitter size={20} />,
      href: 'href="https://x.com/MakTechSolution"',
    },
    {
      icon: <FaYoutube size={20} />,
      href: 'https://www.youtube.com/@MakTechSolution',
    },
  ];

  return (
    <footer className='w-full bg-background text-white font-[Rubik]'>
      <div className='max-w-[1400px] mx-auto px-4 py-8 grid grid-cols-4 md:grid-cols-6 gap-8  font-size-sm'>
        {/* Logo Section */}
        <div className='text-center md:text-left col-start-1 col-end-3'>
          <Link to='/' className='flex items-center'>
            <img className='w-48' src='/images/logo.png' alt='Logo' />
          </Link>
          <p className='text-gray-400 text-base leading-normal pt-4'>
            MAK Tech Solution offers IT services, specializing in WordPress &
            development with 60+ experts, turning visions into reality.
          </p>
        </div>

        {/* Branches */}
        <div className='text-center md:text-left col-start-3 col-end-5'>
          <h3 className='text-lg font-semibold mb-3 leading-normal'>
            Branches
          </h3>
          <ul className='space-y-2 text-gray-400 leading-normal text-base'>
            <li className='flex items-start gap-2 justify-center md:justify-start'>
              <SiGooglemaps size={50} className='text-primary' />
              MAK Tech Solution (Jamuna): 6th Floor, A Majid Tower, Ka-24
              Progati Sarani Rd,Dhaka 1229
            </li>
            <li className='flex items-center gap-2 mt-4 justify-center md:justify-start'>
              <SiGooglemaps size={50} className='text-primary' />
              MAK Tech Solution (Banasree): Abdullah Park, House 180/6/23/CAD,
              Road-14, Block-C, Banasree, Dhaka 1219 (above PizzaBurg).
            </li>
          </ul>
        </div>

        {/* Marketplaces */}
        <div className='text-center md:text-left'>
          <h3 className='text-lg font-semibold mb-3 leading-normal'>
            Market Places
          </h3>
          <ul className='space-y-2 text-gray-400 text-base leading-normal'>
            {marketplaces.map((marketplace, idx) => (
              <li key={idx}>
                <a
                  href={marketplace.href}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='flex items-center gap-2 justify-center md:justify-start hover-cursor-pointer hover:text-primary'
                >
                  {marketplace.icon}
                  {marketplace.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div className='text-center md:text-left'>
          <h3 className='text-lg font-semibold mb-3 leading-normal'>
            Contact Us
          </h3>
          <ul className='space-y-2 text-gray-400 text-base leading-normal'>
            <li className='flex items-center gap-2 justify-center md:justify-start'>
              <FaEnvelope size={2} className='text-primary' />
              contact@maktechsolution.com
            </li>
            <li className='flex items-center gap-2 justify-center md:justify-start'>
              <FaPhoneAlt size={14} className='text-primary' />
              Phone: 01886-159495
            </li>
          </ul>
          {/* Follow us on: */}
          <div className='flex flex-col items-center md:items-start mt-1.5'>
            <h3 className='text-lg font-light mb-3 leading-normal'>
              Follow Us
            </h3>
            <div className='flex gap-5'>
              {socialLinks.map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-gray-300 hover:text-primary transition-colors'
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className='w-full border-t border-gray-300 mt-8'></div>

      {/* Footer Bottom */}
      <div className='max-w-[14000px] mx-auto px-4 py-4 text-center'>
        <p className='text-sm text-gray-400 leading-normal'>
          &copy; {currentYear} MAK Tech Solution. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
