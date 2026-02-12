
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  YOUTUBE_VIDEO_ID, 
  SOCIAL_LINKS, 
  VHS_SPOTIFY_URL, 
  VHS_APPLE_URL, 
  VHS_YOUTUBE_MUSIC_URL, 
  VHS_DEEZER_URL, 
  VHS_TIDAL_URL, 
  VHS_PANDORA_URL 
} from '../constants';

const VHSPage: React.FC = () => {
  const streamingPlatforms = [
    {
      name: 'Spotify',
      action: 'Listen',
      url: VHS_SPOTIFY_URL,
      domain: 'spotify.com',
    },
    {
      name: 'Apple Music',
      action: 'Play',
      url: VHS_APPLE_URL,
      domain: 'apple.com',
    },
    {
      name: 'YouTube Music',
      action: 'Play',
      url: VHS_YOUTUBE_MUSIC_URL,
      domain: 'youtube.com',
    },
    {
      name: 'Deezer',
      action: 'Play',
      url: VHS_DEEZER_URL,
      domain: 'deezer.com',
    },
    {
      name: 'Tidal',
      action: 'Play',
      url: VHS_TIDAL_URL,
      domain: 'tidal.com',
    },
    {
      name: 'Pandora',
      action: 'Play',
      url: VHS_PANDORA_URL,
      domain: 'pandora.com',
    }
  ];

  return (
    <div className="min-h-screen bg-background relative overflow-x-hidden flex flex-col items-center px-6 py-12 md:py-24">
      {/* Immersive Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[url('https://iamcandelas.com/candelas-vhs.jpg')] bg-cover bg-center opacity-10 blur-2xl scale-110"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/95 to-black"></div>
      </div>

      <div className="relative w-full max-w-lg mx-auto flex flex-col items-center">
        {/* Release Header */}
        <header className="text-center mb-10 w-full">
          <h2 className="text-primary font-bold tracking-[0.4em] uppercase text-xs mb-4">New Single</h2>
          <h1 className="font-display text-5xl md:text-7xl uppercase tracking-tighter mb-4">VHS</h1>
          <p className="text-slate-400 font-medium tracking-widest text-sm uppercase opacity-80 mb-2">CANDELAS</p>
          <p className="text-slate-500 italic text-sm">Out Now on all platforms</p>
        </header>

        {/* Video Preview Module */}
        <div className="w-full mb-8">
           <a 
              href={`https://www.youtube.com/watch?v=${YOUTUBE_VIDEO_ID}`} 
              target="_blank"
              rel="noopener noreferrer"
              className="group block relative aspect-video w-full rounded-2xl overflow-hidden shadow-xl border border-white/5 bg-zinc-900"
           >
              <img 
                src={`https://img.youtube.com/vi/${YOUTUBE_VIDEO_ID}/maxresdefault.jpg`} 
                alt="Video Thumbnail"
                className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                 <div className="w-14 h-14 bg-red-600 rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-white text-3xl">play_arrow</span>
                 </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                 <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/90">Watch Official Video</p>
              </div>
           </a>
        </div>

        {/* Streaming Link List */}
        <div className="w-full space-y-3 mb-16">
          {streamingPlatforms.map((platform) => (
            <a 
              key={platform.name}
              href={platform.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3 md:p-4 bg-zinc-900/40 hover:bg-zinc-800/60 border border-white/5 rounded-xl transition-all group backdrop-blur-md"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 flex items-center justify-center rounded-full overflow-hidden transition-all duration-300">
                  <img 
                    src={`https://cdn.brandfetch.io/${platform.domain}/w/400/h/400/theme/dark/fallback/lettermark/type/icon?c=1idaRmlEiX_wrtZwlNq`} 
                    alt={`${platform.name} icon`} 
                    className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500" 
                  />
                </div>
                <span className="font-bold text-sm tracking-wide uppercase text-slate-300 group-hover:text-white">{platform.name}</span>
              </div>
              <div className="bg-white/5 px-6 py-2 rounded-lg text-[10px] font-bold tracking-[0.2em] uppercase text-white/40 group-hover:bg-primary group-hover:text-white transition-all">
                {platform.action}
              </div>
            </a>
          ))}
        </div>

        {/* Footer Branding */}
        <footer className="text-center mt-auto">
          <Link to="/" className="inline-block hover:scale-110 transition-transform duration-500 mb-6 group">
            <img 
              src="https://iamcandelas.com/candelas-logo.png" 
              alt="Logo" 
              className="h-16 w-16 mx-auto opacity-50 group-hover:opacity-100 logo-sharp" 
            />
          </Link>
          <div className="flex gap-4 justify-center mb-6">
             <a href={SOCIAL_LINKS.instagram} className="text-slate-600 hover:text-primary transition-colors" target="_blank" rel="noopener noreferrer">
               <span className="material-symbols-outlined text-2xl">photo_camera</span>
             </a>
             <a href={SOCIAL_LINKS.youtube} className="text-slate-600 hover:text-primary transition-colors" target="_blank" rel="noopener noreferrer">
               <span className="material-symbols-outlined text-2xl">smart_display</span>
             </a>
          </div>
          <p className="text-slate-600 text-[10px] tracking-[0.3em] uppercase mb-12">© 2024 Candelas Music</p>
        </footer>
      </div>
    </div>
  );
};

export default VHSPage;