
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ARTIST_NAME, 
  INSTAGRAM_HANDLE, 
  SOCIAL_LINKS 
} from '../constants';

const LinksPage: React.FC = () => {
  const navigate = useNavigate();

  const handleInternalNav = (e: React.MouseEvent, url: string) => {
    e.preventDefault();
    
    if (url.startsWith('#')) {
      const targetId = url.replace('#', '');
      navigate('/');
      // Allow time for HomePage to mount before attempting to scroll to the element
      setTimeout(() => {
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 150);
    } else {
      navigate(url);
    }
  };

  const links = [
    {
      title: 'Latest Single: VHS',
      url: '/vhs',
      isInternal: true,
      highlight: true,
      icon: 'play_circle'
    },
    {
      title: 'Official Website',
      url: '/',
      isInternal: true,
      icon: 'language'
    },
    {
      title: 'Tour Dates',
      url: '#live', 
      isInternal: true,
      icon: 'calendar_month'
    },
    {
      title: 'Spotify',
      url: SOCIAL_LINKS.spotify,
      isInternal: false,
      icon: 'podcasts'
    },
    {
      title: 'Apple Music',
      url: SOCIAL_LINKS.apple,
      isInternal: false,
      icon: 'music_note'
    },
    {
      title: 'YouTube Channel',
      url: SOCIAL_LINKS.youtube,
      isInternal: false,
      icon: 'smart_display'
    },
    {
      title: 'Instagram',
      url: SOCIAL_LINKS.instagram,
      isInternal: false,
      icon: 'photo_camera'
    },
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white relative flex flex-col items-center px-6 py-16 md:py-24">
      {/* Immersive Background Blur */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div 
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[150%] aspect-square bg-primary/20 blur-[120px] rounded-full opacity-30"
          style={{ transform: 'translate(-50%, -30%)' }}
        ></div>
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      <div className="relative z-10 w-full max-w-[480px] flex flex-col items-center">
        {/* Profile Header */}
        <div className="mb-10 text-center flex flex-col items-center">
          <div className="relative mb-6 group">
            <div className="absolute -inset-1 bg-primary rounded-full blur opacity-25 group-hover:opacity-60 transition duration-1000"></div>
            <div className="relative w-28 h-28 rounded-full border-2 border-white/10 p-1 overflow-hidden bg-black">
              <img 
                src="https://iamcandelas.com/candelas-photo.jpg" 
                alt={ARTIST_NAME} 
                className="w-full h-full object-cover rounded-full grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>
          </div>
          <h1 className="font-display text-4xl uppercase tracking-tighter mb-2">{ARTIST_NAME}</h1>
          <p className="text-slate-400 font-bold tracking-[0.2em] uppercase text-[10px]">{INSTAGRAM_HANDLE}</p>
        </div>

        {/* Links List */}
        <div className="w-full space-y-4 mb-16">
          {links.map((link, idx) => {
            if (link.isInternal) {
              return (
                <button 
                  key={idx}
                  onClick={(e) => handleInternalNav(e, link.url)}
                  className={`flex items-center gap-4 w-full p-4 rounded-2xl border transition-all duration-300 group text-left ${
                    link.highlight 
                      ? 'bg-primary border-primary hover:bg-white hover:text-black hover:border-white shadow-xl shadow-primary/20' 
                      : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/30 active:scale-[0.98]'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${link.highlight ? 'bg-black/10' : 'bg-white/5 group-hover:bg-primary/20 transition-colors'}`}>
                    <span className={`material-symbols-outlined ${link.highlight ? 'text-white' : 'text-primary'}`}>
                      {link.icon}
                    </span>
                  </div>
                  <span className="font-bold uppercase tracking-widest text-[11px] flex-grow">
                    {link.title}
                  </span>
                  <span className="material-symbols-outlined opacity-0 group-hover:opacity-40 transition-opacity text-sm">
                    arrow_forward
                  </span>
                </button>
              );
            }

            return (
              <a 
                key={idx}
                href={link.url}
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-4 w-full p-4 rounded-2xl border transition-all duration-300 group bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/30 active:scale-[0.98]"
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-white/5 group-hover:bg-primary/20 transition-colors">
                  <span className="material-symbols-outlined text-primary">
                    {link.icon}
                  </span>
                </div>
                <span className="font-bold uppercase tracking-widest text-[11px] flex-grow">
                  {link.title}
                </span>
                <span className="material-symbols-outlined opacity-0 group-hover:opacity-40 transition-opacity text-sm">
                  arrow_forward
                </span>
              </a>
            );
          })}
        </div>

        {/* Quick Socials */}
        <div className="flex gap-8 mb-12">
          <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-primary transition-colors">
            <span className="material-symbols-outlined text-3xl">photo_camera</span>
          </a>
          <a href={SOCIAL_LINKS.youtube} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-primary transition-colors">
            <span className="material-symbols-outlined text-3xl">smart_display</span>
          </a>
          <a href={SOCIAL_LINKS.spotify} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-primary transition-colors">
            <span className="material-symbols-outlined text-3xl">podcasts</span>
          </a>
        </div>

        {/* Bottom Branding */}
        <Link to="/" className="mb-8 group">
          <img 
            src="https://iamcandelas.com/candelas-logo.png" 
            alt="Logo" 
            className="h-16 w-16 opacity-30 group-hover:opacity-100 group-hover:scale-110 transition-all logo-sharp" 
          />
        </Link>
        <p className="text-[9px] font-bold tracking-[0.4em] uppercase text-slate-700">
          Candelas Music &bull; {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
};

export default LinksPage;
