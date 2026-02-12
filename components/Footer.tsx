import React from 'react';
import { ARTIST_NAME, SOCIAL_LINKS } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer className="py-20 border-t border-white/5 bg-black">
      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">
        <img 
          alt="Candelas Logo" 
          className="h-24 w-24 object-contain mb-8 opacity-80 logo-sharp" 
          src="https://iamcandelas.com/candelas-logo.png" 
        />
        
        <div className="flex flex-wrap justify-center gap-12 mb-12 text-sm font-bold tracking-widest uppercase text-slate-500">
          <a href={SOCIAL_LINKS.spotify} className="hover:text-primary transition-colors">Spotify</a>
          <a href={SOCIAL_LINKS.apple} className="hover:text-primary transition-colors">Apple Music</a>
          <a href={SOCIAL_LINKS.youtube} className="hover:text-primary transition-colors">YouTube</a>
          <a href={SOCIAL_LINKS.instagram} className="hover:text-primary transition-colors">Instagram</a>
        </div>

        <div className="text-center">
          <p className="text-slate-600 text-sm mb-4">© {new Date().getFullYear()} {ARTIST_NAME} MUSIC. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-6 justify-center text-xs text-slate-700 uppercase font-bold tracking-widest">
            <a href="#" className="hover:text-slate-300">Privacy</a>
            <a href="#" className="hover:text-slate-300">Terms</a>
            <a href="#" className="hover:text-slate-300">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;