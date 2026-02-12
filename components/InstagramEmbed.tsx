
import React, { useEffect, useState } from 'react';

const InstagramEmbed: React.FC = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const handleScriptLoad = () => {
      if ((window as any).instgrm) {
        (window as any).instgrm.Embeds.process();
        setLoaded(true);
      }
    };

    const existingScript = document.getElementById('instagram-embed-script');
    if (!existingScript) {
      const script = document.createElement('script');
      script.id = 'instagram-embed-script';
      script.src = "https://www.instagram.com/embed.js";
      script.async = true;
      script.onload = handleScriptLoad;
      document.body.appendChild(script);
    } else {
      handleScriptLoad();
    }
  }, []);

  return (
    <div className="relative w-full max-w-[540px] mx-auto group">
      {/* Decorative Neon Frame */}
      <div className="absolute -inset-1 bg-gradient-to-r from-primary/50 to-purple-600/50 rounded-[20px] blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
      
      <div className="relative bg-zinc-900 border border-white/10 rounded-[18px] overflow-hidden shadow-2xl">
        <blockquote 
          className="instagram-media w-full !bg-transparent !border-0 !m-0 !shadow-none" 
          data-instgrm-permalink="https://www.instagram.com/iamcandelas/?utm_source=ig_embed&amp;utm_campaign=loading" 
          data-instgrm-version="14"
        >
          {/* Custom Dark Placeholder while IG loads */}
          {!loaded && (
            <div className="p-8 min-h-[400px] flex flex-col items-center justify-center text-center space-y-6">
              <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center animate-pulse">
                <span className="material-symbols-outlined text-3xl text-primary/50">photo_camera</span>
              </div>
              <div className="space-y-2">
                <div className="h-4 w-32 bg-white/5 rounded mx-auto animate-pulse"></div>
                <div className="h-3 w-24 bg-white/5 rounded mx-auto animate-pulse"></div>
              </div>
              <a 
                href="https://www.instagram.com/iamcandelas/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-xs font-bold tracking-widest uppercase text-primary"
              >
                Loading Feed...
              </a>
            </div>
          )}
        </blockquote>
      </div>
    </div>
  );
};

export default InstagramEmbed;
