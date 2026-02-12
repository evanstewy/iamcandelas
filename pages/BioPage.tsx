
import React from 'react';
import { FULL_BIO } from '../constants';

const BioPage: React.FC = () => {
  const paragraphs = FULL_BIO.split('\n\n');

  return (
    <div className="pt-32 pb-32 bg-background min-h-screen">
      <div className="max-w-4xl mx-auto px-6">
        <header className="mb-20">
          <span className="text-primary font-bold tracking-[0.3em] uppercase mb-4 block">Biography</span>
          <h1 className="font-display text-5xl md:text-8xl uppercase tracking-tighter leading-none mb-12">
            The <br/>Artist <span className="text-primary">Journey</span>
          </h1>
          <div className="aspect-[16/9] w-full rounded-2xl overflow-hidden mb-12 border border-white/10 shadow-2xl">
            <img 
              src="https://iamcandelas.com/candelas-photo.jpg" 
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000" 
              alt="Candelas Profile" 
            />
          </div>
        </header>

        <div className="space-y-8">
          {paragraphs.map((p, i) => (
            <p key={i} className="text-xl text-slate-300 leading-relaxed font-light">
              {p}
            </p>
          ))}
        </div>

        <div className="mt-20 pt-20 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-center md:text-left">
                <h3 className="font-display text-2xl uppercase mb-2">Socially Rooted</h3>
                <p className="text-slate-500 uppercase tracking-widest text-xs">Aguascalientes &bull; Las Vegas</p>
            </div>
            <div className="flex gap-4">
                <a href="#newsletter" className="bg-primary px-8 py-3 rounded-full text-white font-bold uppercase text-sm tracking-widest">Connect</a>
            </div>
        </div>
      </div>
    </div>
  );
};

export default BioPage;
