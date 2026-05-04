"use client";

import { motion } from "framer-motion";
import { PLANETS, type PlanetData } from "@/data/planets";

interface CompareOverlayProps {
  currentPlanet: PlanetData;
  onSelectPlanet: (planet: PlanetData) => void;
  onClose: () => void;
}

export default function CompareOverlay({ currentPlanet, onSelectPlanet, onClose }: CompareOverlayProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-md">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative w-full max-w-4xl bg-[#020617] border border-white/10 rounded-[3rem] overflow-hidden shadow-2xl p-8 lg:p-12"
      >
        <button 
          onClick={onClose}
          className="absolute top-8 right-8 p-3 rounded-full bg-white/5 hover:bg-white/10 text-white/40 hover:text-white transition-all"
        >
          ✕
        </button>

        <div className="text-center mb-12">
          <h2 className="text-4xl font-black text-white mb-4 tracking-tighter">Planet Comparison</h2>
          <p className="text-white/40 font-medium">Compare {currentPlanet.name} with other worlds in our system.</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {PLANETS.map((planet) => (
            <button
              key={planet.slug}
              onClick={() => onSelectPlanet(planet)}
              disabled={planet.slug === currentPlanet.slug}
              className={`p-6 rounded-3xl border transition-all flex flex-col items-center gap-4 group ${
                planet.slug === currentPlanet.slug 
                  ? 'border-white/5 bg-white/5 opacity-40 cursor-not-allowed' 
                  : 'border-white/10 bg-white/5 hover:border-sky-500/50 hover:bg-sky-500/5'
              }`}
            >
              <div className="w-16 h-16 rounded-full overflow-hidden shadow-2xl transition-transform group-hover:scale-110">
                <img src={planet.image || ''} alt={planet.name} className="w-full h-full object-cover" />
              </div>
              <span className="font-bold text-white tracking-tight">{planet.name}</span>
            </button>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
