"use client";

import { motion } from "framer-motion";
import { X, ArrowLeftRight } from "lucide-react";
import { PLANETS, PlanetData } from "@/data/planets";

interface CompareOverlayProps {
  currentPlanet: PlanetData;
  onSelectPlanet: (planet: PlanetData) => void;
  onClose: () => void;
}

export default function CompareOverlay({ currentPlanet, onSelectPlanet, onClose }: CompareOverlayProps) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 p-10 bg-gradient-to-t from-black via-black/90 to-transparent">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-4xl font-black tracking-tighter text-white mb-2 flex items-center gap-4">
              <ArrowLeftRight className="w-8 h-8 text-sky-400" />
              Comparative Analysis
            </h2>
            <p className="text-white/40 font-medium">Select a celestial body to compare with <span className="text-sky-400">{currentPlanet.name}</span></p>
          </div>
          <button 
            onClick={onClose}
            className="p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-all"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
          {PLANETS.map((planet) => (
            <button
              key={planet.slug}
              onClick={() => onSelectPlanet(planet)}
              disabled={planet.slug === currentPlanet.slug}
              className={`group relative flex flex-col items-center p-4 rounded-2xl border transition-all ${planet.slug === currentPlanet.slug ? 'opacity-20 cursor-not-allowed' : 'bg-white/5 border-white/10 hover:border-sky-500/50 hover:bg-white/10'}`}
            >
              <div className="w-12 h-12 rounded-full mb-3 overflow-hidden shadow-lg group-hover:scale-110 transition-transform">
                <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url(${planet.image || '/images/earth.png'})`, backgroundColor: planet.color }} />
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-white/60 group-hover:text-white">{planet.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
