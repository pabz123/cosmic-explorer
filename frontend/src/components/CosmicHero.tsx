"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Rocket, Orbit, Sparkles, ArrowRight, ChevronRight, ChevronLeft, Info, Eye, EyeOff, Maximize2, Shield, Activity, Zap, X, Globe, History, Radio } from "lucide-react";
import { PlanetScene } from "@/components/PlanetScene";
import Navbar from "@/components/Navbar";
import { PLANETS } from "@/data/planets";

export default function CosmicHero() {
  const [currentPlanetIndex, setCurrentPlanetIndex] = useState(2); // Earth
  const [isZenMode, setIsZenMode] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const planet = PLANETS[currentPlanetIndex];
  const planetColor = planet.color || "#38bdf8";

  const handleNext = () => {
    setCurrentPlanetIndex((prev) => (prev + 1) % PLANETS.length);
    setIsSidebarOpen(false);
  };

  const handlePrev = () => {
    setCurrentPlanetIndex((prev) => (prev - 1 + PLANETS.length) % PLANETS.length);
    setIsSidebarOpen(false);
  };

  return (
    <section className="relative w-full h-screen overflow-hidden bg-[#000103] text-white font-sans">
      <Navbar 
        isZenMode={isZenMode} 
        onQuizClick={() => {}} 
        onCompareClick={() => {}}
        onAPODClick={() => {}}
      />

      {/* ── Hyper-Realistic 3D Scene ── */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div 
            key={planet.slug}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0"
          >
            <div className={`absolute inset-0 transition-all duration-[2s] cubic-bezier(0.2, 0, 0.2, 1) ${isSidebarOpen ? 'translate-x-[-20%] scale-90' : 'translate-x-[15%] scale-100'}`}>
                <PlanetScene textureUrl={planet.image} name={planet.name} />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Cinematic HUD Overlay ── */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-black/80 via-transparent to-transparent opacity-90" />

      {/* ── Main Minimal UI ── */}
      <AnimatePresence>
        {!isZenMode && !isSidebarOpen && (
          <div className="relative z-10 flex h-full items-center px-10 lg:px-32 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              className="w-full max-w-2xl pointer-events-auto"
              key={`main-ui-${planet.slug}`}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-px bg-sky-500/50" />
                <span className="text-[10px] font-black uppercase tracking-[0.6em] text-sky-400">Mission Target // {planet.slug}</span>
              </div>

              <h1 className="text-8xl lg:text-[11rem] font-black tracking-tighter leading-[0.8] mb-8 drop-shadow-[0_0_80px_rgba(56,189,248,0.2)]">
                {planet.name}
              </h1>

              <p className="text-sky-200/60 text-2xl font-medium tracking-tight mb-12 max-w-lg leading-tight">
                {planet.tagline}
              </p>

              <div className="flex gap-6">
                <button
                  onClick={() => setIsSidebarOpen(true)}
                  className="group flex items-center gap-6 px-10 py-6 rounded-2xl bg-white text-black font-black uppercase tracking-widest transition-all hover:scale-105 active:scale-95"
                >
                  <Rocket className="w-6 h-6" />
                  Technical Readout
                </button>
                <button
                  onClick={handleNext}
                  className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-white active:scale-90"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── Navigation Hud (Bottom) ── */}
      <div className={`absolute bottom-10 inset-x-0 z-20 flex justify-center items-center gap-6 transition-all duration-1000 ${isZenMode || isSidebarOpen ? 'translate-y-40 opacity-0' : 'translate-y-0 opacity-100'}`}>
          <div className="flex gap-2 px-6 py-3 rounded-full bg-black/40 backdrop-blur-3xl border border-white/5 shadow-2xl">
            {PLANETS.map((p, idx) => (
                <button 
                  key={p.slug}
                  onClick={() => setCurrentPlanetIndex(idx)}
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${idx === currentPlanetIndex ? 'bg-sky-400 w-6' : 'bg-white/20'}`} 
                />
            ))}
          </div>
      </div>

      {/* ── Advanced Side Panel (Detailed Info) ── */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="absolute top-0 right-0 w-full max-w-xl h-full z-50 bg-[#000103]/90 backdrop-blur-3xl border-l border-white/10 p-10 lg:p-16 overflow-y-auto"
          >
            <button 
              onClick={() => setIsSidebarOpen(false)}
              className="absolute top-10 right-10 p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-all"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="mb-16">
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-sky-400 mb-4 block">Planetary Intelligence</span>
              <h2 className="text-6xl font-black tracking-tighter mb-4">{planet.name}</h2>
              <p className="text-white/40 font-medium italic">{planet.tagline}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-16">
                 {[
                   { label: 'Gravity', value: `${planet.gravity} G`, icon: <Activity /> },
                   { label: 'Orbit', value: `${planet.orbitalPeriod} D`, icon: <Orbit /> },
                   { label: 'Diameter', value: `${planet.diameter} KM`, icon: <Globe /> },
                   { label: 'Moons', value: planet.moons, icon: <Shield /> }
                 ].map((stat) => (
                   <div key={stat.label} className="p-6 rounded-2xl bg-white/5 border border-white/5">
                      <div className="flex items-center gap-3 opacity-30 mb-2">
                        {stat.icon}
                        <span className="text-[8px] font-bold uppercase tracking-widest">{stat.label}</span>
                      </div>
                      <span className="text-2xl font-black">{stat.value}</span>
                   </div>
                 ))}
            </div>

            <div className="space-y-12">
               <div>
                  <div className="flex items-center gap-4 mb-4">
                     <History className="w-5 h-5 text-sky-400" />
                     <h3 className="text-sm font-black uppercase tracking-widest">Historical Data</h3>
                  </div>
                  <p className="text-white/60 leading-relaxed text-sm">{planet.discovery}</p>
               </div>

               <div>
                  <div className="flex items-center gap-4 mb-4">
                     <Zap className="w-5 h-5 text-sky-400" />
                     <h3 className="text-sm font-black uppercase tracking-widest">Geology & Composition</h3>
                  </div>
                  <p className="text-white/60 leading-relaxed text-sm">{planet.geology}</p>
               </div>

               <div>
                  <div className="flex items-center gap-4 mb-4">
                     <Radio className="w-5 h-5 text-sky-400" />
                     <h3 className="text-sm font-black uppercase tracking-widest">Notable Missions</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                     {planet.missions.map(m => (
                       <span key={m} className="px-4 py-2 rounded-lg bg-white/5 border border-white/5 text-[10px] font-bold">{m}</span>
                     ))}
                  </div>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Controls ── */}
      <div className="absolute top-24 right-10 z-50 flex flex-col gap-4">
        <button 
          onClick={() => setIsZenMode(!isZenMode)}
          className="p-4 rounded-2xl bg-black/40 backdrop-blur-3xl border border-white/10 hover:bg-white/10 transition-all"
        >
          {isZenMode ? <Eye className="w-6 h-6 text-sky-400" /> : <EyeOff className="w-6 h-6 text-white/40" />}
        </button>
      </div>
    </section>
  );
}
