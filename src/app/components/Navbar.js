'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCart } from '../providers';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const { itemCount } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  return (
    <nav className={`fixed w-full top-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/95 backdrop-blur-sm shadow-md' : 'bg-white/80'
    }`}>
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-purple-700">
            Shilajeet Store
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6">
            <NavLink href="/" label="Home" />
            <NavLink href="/product" label="Products" />
            <NavLink href="/about" label="About" />
            <NavLink href="/cart" label="Cart">
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-purple-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </NavLink>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-purple-700 focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
        
        {/* Mobile Navigation */}
        <div
          className={`md:hidden transition-all duration-300 overflow-hidden ${
            isMenuOpen ? 'max-h-60 opacity-100 mt-4' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="flex flex-col space-y-4 py-2">
            <MobileNavLink href="/" label="Home" />
            <MobileNavLink href="/product" label="Products" />
            <MobileNavLink href="/about" label="About" />
            <MobileNavLink href="/cart" label="Cart">
              {itemCount > 0 && (
                <span className="ml-2 bg-purple-600 text-white text-xs rounded-full w-5 h-5 inline-flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </MobileNavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}

// Desktop Navigation Link Component
function NavLink({ href, label, children }) {
  const pathname = usePathname();
  const isActive = pathname === href;
  
  return (
    <Link 
      href={href} 
      className={`relative text-gray-700 hover:text-purple-700 transition-colors ${
        isActive ? 'font-medium text-purple-700' : ''
      }`}
    >
      {label}
      {isActive && (
        <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-purple-700" />
      )}
      {children}
    </Link>
  );
}

// Mobile Navigation Link Component
function MobileNavLink({ href, label, children }) {
  const pathname = usePathname();
  const isActive = pathname === href;
  
  return (
    <Link 
      href={href} 
      className={`block px-4 py-2 rounded-md ${
        isActive 
          ? 'bg-purple-50 text-purple-700 font-medium' 
          : 'text-gray-700 hover:bg-gray-50 hover:text-purple-700'
      }`}
    >
      <div className="flex items-center">
        {label}
        {children}
      </div>
    </Link>
  );
}
