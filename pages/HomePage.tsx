import React from 'react';
import { Link } from 'react-router-dom';
import { 
  YOUTUBE_VIDEO_ID, 
  VHS_SPOTIFY_URL,
  VHS_APPLE_URL,
  VHS_YOUTUBE_URL,
  TOUR_DATES, 
  BIO_SUMMARY,
  INSTAGRAM_HANDLE,
  SOCIAL_LINKS
} from '../constants';
import InstagramEmbed from '../components/InstagramEmbed';

const HomePage: React.FC = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const simplifiedLinks = [
    {
      name: 'Spotify',
      icon: 'https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg',
      url: VHS_SPOTIFY_URL,
    },
    {
      name: 'Apple',
      icon: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg',
      url: VHS_APPLE_URL,
      invert: true
    },
    {
      name: 'YouTube',
      icon: 'https://upload.wikimedia.org/wikipedia/commons/0/09/YouTube_full-color_icon_%282017%29.svg',
      url: VHS_YOUTUBE_URL,
    }
  ];

  return (
    <div className="flex flex-col overflow-x-hidden">
      {/* Hero Section */}
      <header className="relative min-h-[90vh] md:min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            alt="Candelas Artist Portrait" 
            className="w-full h-full object-cover object-center scale-105" 
            src="https://iamcandelas.com/candelas-photo.jpg" 
          />
          <div className="absolute inset-0 bg-black/60"></div>
          <div className="absolute inset-0 hero-gradient"></div>
        </div>
        
        <div className="relative w-full max-w-7xl mx-auto px-6 z-10 pt-20">
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h1 className="font-display fluid-title tracking-tighter text-white uppercase select-none mb-8 md:mb-12">
              CAN<span className="text-primary text-glow">DELAS</span>
            </h1>
            <p className="text-lg md:text-3xl text-slate-300 mb-10 md:mb-12 font-light max-w-2xl leading-tight">
              Mexican-American Alt Rock forged in the neon heart of Las Vegas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 md:gap-6 w-full sm:w-auto">
              <Link 
                to="/vhs" 
                className="bg-primary text-white px-8 md:px-10 py-4 md:py-5 rounded-full font-bold uppercase tracking-widest hover:scale-105 transition-transform flex items-center justify-center gap-3 shadow-lg shadow-primary/20 group"
              >
                <span className="material-symbols-outlined group-hover:rotate-12 transition-transform">play_arrow</span> Latest Single
              </Link>
              <button 
                onClick={() => scrollToSection('live')}
                className="border border-white/30 text-white px-8 md:px-10 py-4 md:py-5 rounded-full font-bold uppercase tracking-widest hover:bg-white/10 transition-colors text-center cursor-pointer"
              >
                Tour Dates
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Simplified New Release Section */}
      <section id="music" className="py-20 md:py-32 bg-[#0A0A0A] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-12 md:gap-24">
            <div className="w-full md:w-5/12 max-w-md md:max-w-none mx-auto">
              <div className="relative group">
                <div className="absolute -inset-8 bg-primary/20 blur-[80px] rounded-full opacity-40 group-hover:opacity-70 transition-opacity duration-1000"></div>
                <div className="aspect-square relative overflow-hidden rounded-2xl shadow-2xl border border-white/10">
                  <img 
                    alt="VHS Artwork" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" 
                    src="https://iamcandelas.com/candelas-vhs.jpg" 
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
                </div>
              </div>
            </div>
            
            <div className="w-full md:w-7/12 text-center md:text-left">
              <span className="text-primary font-bold tracking-[0.4em] uppercase text-xs mb-4 block">Out Now</span>
              <h2 className="font-display text-6xl md:text-8xl lg:text-9xl mb-4 md:mb-6 leading-none uppercase tracking-tighter">VHS</h2>
              <p className="text-lg md:text-xl text-slate-300 font-light mb-12 max-w-xl mx-auto md:mx-0">
                A raw, one-take DIY anthem from the upcoming album <span className="text-white italic">Películas Caseras</span>.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-xl mx-auto md:mx-0">
                {simplifiedLinks.map((link) => (
                  <a 
                    key={link.name}
                    href={link.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex flex-col items-center justify-center p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 hover:border-white/20 transition-all group"
                  >
                     <img 
                        src={link.icon} 
                        className={`h-6 w-6 mb-3 opacity-40 group-hover:opacity-100 transition-all ${link.invert ? 'invert' : ''}`} 
                        alt={link.name} 
                     />
                     <span className="font-bold text-[9px] tracking-[0.3em] uppercase text-slate-500 group-hover:text-white">{link.name}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section id="video" className="py-20 md:py-32 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12 md:mb-16">
            <span className="text-primary font-bold tracking-[0.3em] uppercase mb-4 block text-xs">Music Video</span>
            <h2 className="font-display text-4xl md:text-6xl uppercase tracking-tighter">Latest Premiere</h2>
          </div>
          <div className="max-w-5xl mx-auto">
            <a 
              href={`https://www.youtube.com/watch?v=${YOUTUBE_VIDEO_ID}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="block group relative aspect-video rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl border border-white/5 bg-[#111]"
            >
              <img 
                src={`https://img.youtube.com/vi/${YOUTUBE_VIDEO_ID}/maxresdefault.jpg`} 
                alt="VHS Video Thumbnail"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 md:w-24 md:h-24 bg-primary rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300">
                  <span className="material-symbols-outlined text-white text-3xl md:text-5xl fill-1">play_arrow</span>
                </div>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Story Teaser */}
      <section id="story" className="py-20 md:py-32 bg-[#0A0A0A]">
        <div className="max-w-4xl mx-auto px-5 text-center">
          <span className="text-primary font-bold tracking-[0.3em] uppercase mb-4 block text-xs">The Story</span>
          <h2 className="font-display text-4xl md:text-7xl mb-8 md:mb-12 uppercase leading-none">A Culture <span className="text-primary italic">Collision</span></h2>
          <p className="text-lg md:text-lg text-slate-400 mb-10 md:mb-12 leading-relaxed font-light">
            {BIO_SUMMARY}
          </p>
          <Link 
            to="/story" 
            className="inline-flex items-center gap-3 text-primary font-bold uppercase tracking-widest border-b-2 border-primary pb-2 hover:gap-6 transition-all text-xs"
          >
            Read the full bio <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </Link>
        </div>
      </section>

      {/* Live Dates Section */}
      <section id="live" className="py-20 md:py-32 bg-black">
        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <span className="text-primary font-bold tracking-[0.3em] uppercase mb-4 block text-xs">Live On Stage</span>
            <h2 className="font-display text-4xl md:text-7xl uppercase">Tour Dates</h2>
          </div>
          
          <div className="bg-white/5 border border-white/10 rounded-3xl p-12 md:p-20 text-center backdrop-blur-sm shadow-2xl">
            <h3 className="font-display text-3xl md:text-6xl uppercase tracking-tighter mb-4">
              Don't Miss <br /><span className="text-primary italic">The Next Set</span>
            </h3>
            <p className="text-slate-400 max-w-xl mx-auto mb-10 text-base md:text-lg font-light leading-relaxed">
              Booking 2026 now. Join the collective to get notified about secret pop-up sets in Las Vegas.
            </p>
            <button 
              onClick={() => scrollToSection('newsletter')}
              className="inline-flex items-center gap-3 bg-white text-black px-10 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-primary hover:text-white transition-all text-xs"
            >
              Notify Me <span className="material-symbols-outlined text-sm">notifications</span>
            </button>
          </div>
        </div>
      </section>

      {/* Social Feed */}
      <section className="py-24 md:py-40 bg-[#0A0A0A] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-16 md:gap-20">
            <div className="lg:w-5/12 text-center lg:text-left">
              <span className="text-primary font-bold tracking-[0.4em] uppercase mb-6 block text-xs">Social</span>
              <h2 className="font-display text-4xl md:text-8xl uppercase mb-8 leading-[0.9] tracking-tighter">Live From <br/> <span className="text-primary">The Grid</span></h2>
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-8">
                <a 
                  href={SOCIAL_LINKS.instagram} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group"
                >
                  <span className="text-2xl font-display font-bold text-white group-hover:text-primary transition-colors">
                    {INSTAGRAM_HANDLE}
                  </span>
                </a>
              </div>
            </div>
            <div className="lg:w-7/12 w-full">
              <InstagramEmbed />
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section id="newsletter" className="py-20 md:py-32 bg-primary">
        <div className="max-w-4xl mx-auto px-6 text-center text-white">
          <h2 className="font-display text-4xl md:text-7xl mb-6 uppercase tracking-tighter">Join the Collective</h2>
          <p className="text-base md:text-lg mb-10 md:mb-12 opacity-90 max-w-lg mx-auto font-medium">Early access to tour dates and exclusive unreleased demos.</p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto" onSubmit={(e) => e.preventDefault()}>
            <input 
              className="flex-grow bg-white/20 border border-white/30 focus:ring-2 focus:ring-white placeholder:text-white/60 py-4 px-8 rounded-full text-white backdrop-blur-sm outline-none" 
              placeholder="Your email address" 
              required 
              type="email" 
            />
            <button className="bg-white text-primary font-bold uppercase py-4 px-10 rounded-full hover:bg-black hover:text-white transition-all shadow-xl text-sm" type="submit">Subscribe</button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default HomePage;