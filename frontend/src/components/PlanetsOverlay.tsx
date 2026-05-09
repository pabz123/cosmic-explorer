"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Globe, ChevronRight } from "lucide-react";
import { PLANETS } from "@/data/planets";

interface PlanetsOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPlanet: (index: number) => void;
}

export default function PlanetsOverlay({ isOpen, onClose, onSelectPlanet }: PlanetsOverlayProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8 bg-black/90 backdrop-blur-2xl"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-6xl h-full max-h-[85vh] bg-[#050a1a] rounded-[2.5rem] border border-white/10 shadow-[0_0_100px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col"
          >
            <div className="flex items-center justify-between p-8 border-b border-white/5">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-sky-500/20 flex items-center justify-center">
                  <Globe className="w-6 h-6 text-sky-400" />
                </div>
                <div>
                  <h2 className="text-3xl font-black text-white tracking-tight">Planetary Systems</h2>
                  <p className="text-white/40 text-sm font-medium">Select a destination to explore</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-all border border-white/10 group"
              >
                <X className="w-6 h-6 text-white/50 group-hover:text-white transition-colors" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {PLANETS.map((planet, index) => (
                  <button
                    key={planet.slug}
                    onClick={() => {
                      onSelectPlanet(index);
                      onClose();
                    }}
                    className="group relative h-48 rounded-3xl overflow-hidden border border-white/5 hover:border-white/20 transition-all hover:shadow-2xl hover:shadow-sky-500/10"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent z-10" />
                    <div className="absolute inset-0 flex flex-col justify-end p-6 z-20">
                      <span className="text-xs font-bold tracking-[0.2em] text-sky-400 uppercase mb-1">{planet.type}</span>
                      <h3 className="text-2xl font-black text-white leading-none mb-2">{planet.name}</h3>
                      <div className="flex items-center gap-2 text-white/40 group-hover:text-white/80 transition-colors">
                        <span className="text-xs font-bold uppercase tracking-widest">Explore</span>
                        <ChevronRight className="w-4 h-4" />
                      </div>
                    </div>
                    {/* Visual hint of the planet color */}
                    <div 
                      className="absolute top-[-20%] right-[-20%] w-48 h-48 rounded-full blur-[60px] opacity-20 transition-opacity group-hover:opacity-40"
                      style={{ backgroundColor: planet.color }}
                    />
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
