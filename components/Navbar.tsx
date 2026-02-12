
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { SOCIAL_LINKS } from '../constants';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('/#', '').replace('#', '');
    
    if (pathname === '/') {
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        setIsMenuOpen(false);
      }
    } else {
      navigate('/');
      // Small timeout to allow the homepage to mount before scrolling
      setTimeout(() => {
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 150);
    }
  };

  const navLinks = [
    { name: 'Music', href: '#music', type: 'anchor' },
    { name: 'Video', href: '#video', type: 'anchor' },
    { name: 'Story', href: '/story', type: 'link' },
    { name: 'Live', href: '#live', type: 'anchor' },
  ];

  return (
    <>
      <nav className={`fixed top-0 w-full z-[100] transition-all duration-500 ${isScrolled || isMenuOpen ? 'bg-black py-4 border-b border-white/10 shadow-xl' : 'bg-transparent py-8'}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group relative z-[102]">
            <img 
              alt="Candelas Logo" 
              className="h-16 w-16 md:h-20 md:w-20 object-contain logo-sharp group-hover:rotate-12 transition-transform duration-500" 
              src="https://iamcandelas.com/candelas-logo.png" 
            />
            <span className="font-display text-lg md:text-2xl tracking-tighter uppercase hidden xs:block antialiased">iamcandelas</span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              link.type === 'anchor' ? (
                <button 
                  key={link.name} 
                  onClick={(e) => handleAnchorClick(e, link.href)}
                  className="text-[10px] font-bold tracking-[0.3em] uppercase hover:text-primary transition-colors cursor-pointer"
                >
                  {link.name}
                </button>
              ) : (
                <Link 
                  key={link.name} 
                  to={link.href}
                  className="text-[10px] font-bold tracking-[0.3em] uppercase hover:text-primary transition-colors"
                >
                  {link.name}
                </Link>
              )
            ))}
            <a 
              href="#newsletter" 
              onClick={(e) => handleAnchorClick(e, '#newsletter')}
              className="bg-primary px-6 py-2 rounded-full text-white text-[10px] font-bold tracking-widest uppercase hover:scale-105 transition-transform"
            >
              Join
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white relative z-[102] p-2 flex items-center"
            aria-label="Toggle Menu"
          >
            <span className="material-symbols-outlined text-3xl">
              {isMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>

        {/* Mobile Navigation Overlay - Solid black to hide background content */}
        <div className={`fixed inset-0 bg-black transition-all duration-500 md:hidden z-[101] flex flex-col items-center justify-center ${isMenuOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-full pointer-events-none'}`}>
          <div className="flex flex-col items-center gap-10">
            {navLinks.map((link) => (
              link.type === 'anchor' ? (
                <button 
                  key={link.name} 
                  onClick={(e) => handleAnchorClick(e, link.href)}
                  className="text-4xl font-display font-bold tracking-[0.1em] uppercase hover:text-primary transition-all active:scale-95"
                >
                  {link.name}
                </button>
              ) : (
                <Link 
                  key={link.name} 
                  to={link.href}
                  className="text-4xl font-display font-bold tracking-[0.1em] uppercase hover:text-primary transition-all active:scale-95"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              )
            ))}
            <button 
              onClick={(e) => handleAnchorClick(e, '#newsletter')}
              className="mt-6 bg-primary px-12 py-5 rounded-full text-white text-sm font-bold tracking-[0.2em] uppercase shadow-2xl shadow-primary/40 active:scale-95 transition-transform"
            >
              Join the Collective
            </button>
          </div>
          
          {/* Mobile Social Icons - Linked and active */}
          <div className="absolute bottom-16 flex gap-10 opacity-60">
             <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
               <span className="material-symbols-outlined text-white text-2xl hover:text-primary">photo_camera</span>
             </a>
             <a href={SOCIAL_LINKS.youtube} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
               <span className="material-symbols-outlined text-white text-2xl hover:text-primary">smart_display</span>
             </a>
             <a href={SOCIAL_LINKS.spotify} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
               <span className="material-symbols-outlined text-white text-2xl hover:text-primary">podcasts</span>
             </a>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
