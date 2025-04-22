
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { isAuthenticated } from '@/lib/data';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const authenticated = isAuthenticated();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm px-4 py-3">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="font-bold text-2xl text-mijob-blue">
            MiJob
          </Link>
        </div>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex md:items-center md:space-x-6">
          <Link to="/" className="font-medium text-gray-700 hover:text-mijob-blue transition-colors">
            Home
          </Link>
          <Link to="/jobs" className="font-medium text-gray-700 hover:text-mijob-blue transition-colors">
            Offerte di lavoro
          </Link>
          <Link to="/calendar" className="font-medium text-gray-700 hover:text-mijob-blue transition-colors">
            Crea calendario
          </Link>
          {authenticated ? (
            <Link to="/profile" className="font-medium text-gray-700 hover:text-mijob-blue transition-colors">
              Il mio profilo
            </Link>
          ) : null}
          <Link to="/about" className="font-medium text-gray-700 hover:text-mijob-blue transition-colors">
            Chi siamo
          </Link>
          <Link to="/contact" className="font-medium text-gray-700 hover:text-mijob-blue transition-colors">
            Contattaci
          </Link>
        </div>
        
        <div className="hidden md:block">
          {authenticated ? (
            <Link to="/profile">
              <Button variant="outline" className="mr-2">
                Il mio profilo
              </Button>
            </Link>
          ) : (
            <Link to="/auth">
              <Button variant="outline" className="mr-2">
                Accedi
              </Button>
            </Link>
          )}
          <Link to="/calendar">
            <Button className="bg-mijob-orange hover:bg-mijob-orange/90">
              Inizia ora
            </Button>
          </Link>
        </div>
        
        {/* Mobile menu button */}
        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu} className="text-gray-600 focus:outline-none">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden pt-2 pb-4 px-4 space-y-3 animate-fade-in">
          <Link 
            to="/" 
            className="block font-medium text-gray-700 hover:text-mijob-blue transition-colors py-2"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link 
            to="/jobs" 
            className="block font-medium text-gray-700 hover:text-mijob-blue transition-colors py-2"
            onClick={() => setIsMenuOpen(false)}
          >
            Offerte di lavoro
          </Link>
          <Link 
            to="/calendar" 
            className="block font-medium text-gray-700 hover:text-mijob-blue transition-colors py-2"
            onClick={() => setIsMenuOpen(false)}
          >
            Crea calendario
          </Link>
          {authenticated && (
            <Link 
              to="/profile" 
              className="block font-medium text-gray-700 hover:text-mijob-blue transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Il mio profilo
            </Link>
          )}
          <Link 
            to="/about" 
            className="block font-medium text-gray-700 hover:text-mijob-blue transition-colors py-2"
            onClick={() => setIsMenuOpen(false)}
          >
            Chi siamo
          </Link>
          <Link 
            to="/contact" 
            className="block font-medium text-gray-700 hover:text-mijob-blue transition-colors py-2"
            onClick={() => setIsMenuOpen(false)}
          >
            Contattaci
          </Link>
          <div className="pt-2 flex flex-col space-y-2">
            {authenticated ? (
              <Link to="/profile" onClick={() => setIsMenuOpen(false)}>
                <Button variant="outline" className="w-full">
                  Il mio profilo
                </Button>
              </Link>
            ) : (
              <Link to="/auth" onClick={() => setIsMenuOpen(false)}>
                <Button variant="outline" className="w-full">
                  Accedi
                </Button>
              </Link>
            )}
            <Link to="/calendar" onClick={() => setIsMenuOpen(false)}>
              <Button className="w-full bg-mijob-orange hover:bg-mijob-orange/90">
                Inizia ora
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
