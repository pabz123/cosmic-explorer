"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Rocket, Orbit, Sparkles, ArrowRight, ChevronRight, ChevronLeft, Info, Eye, EyeOff, Maximize2 } from "lucide-react";
import { PlanetScene } from "@/components/PlanetScene";
import Navbar from "@/components/Navbar";
import CompareOverlay from "@/components/CompareOverlay";
import QuizOverlay from "@/components/QuizOverlay";
import APODOverlay from "@/components/APODOverlay";
import { PLANETS } from "@/data/planets";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function CosmicHero() {
  const [currentPlanetIndex, setCurrentPlanetIndex] = useState(2); // Start at Earth
  const [isZenMode, setIsZenMode] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [isAPODOpen, setIsAPODOpen] = useState(false);
  
  const planet = PLANETS[currentPlanetIndex];
  const planetColor = planet.color || "#38bdf8";

  const handleNext = () => {
    setCurrentPlanetIndex((prev) => (prev + 1) % PLANETS.length);
  };

  const handlePrev = () => {
    setCurrentPlanetIndex((prev) => (prev - 1 + PLANETS.length) % PLANETS.length);
  };

  const infoPoint = {
    position: [2.5, 1.5, 2] as [number, number, number],
    title: `${planet.name} Insight`,
    description: planet.funFacts[0] || "A mysterious world waiting to be explored.",
  };

  return (
    <section className="relative w-full h-screen overflow-hidden bg-[#020617] text-white font-sans selection:bg-sky-500/30">
      <Navbar 
        isZenMode={isZenMode} 
        onQuizClick={() => setIsQuizOpen(true)}
        onCompareClick={() => setIsCompareOpen(true)}
        onAPODClick={() => setIsAPODOpen(true)}
      />

      {/* ── 3D Scene Background ── */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div 
            key={planet.slug}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <PlanetScene 
              textureUrl={planet.image || "/images/earth.png"} 
              infoPoint={infoPoint} 
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Dynamic Atmospheric Overlays ── */}
      <div className={`absolute inset-0 pointer-events-none transition-opacity duration-1000 ${isZenMode ? 'opacity-20' : 'opacity-100'}`}>
        <motion.div 
          animate={{ background: `radial-gradient(circle at center, ${planetColor}05 0%, rgba(2,6,23,0.8) 100%)` }}
          className="absolute inset-0 z-0" 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40 z-0" />
      </div>

      {/* ── Zen Mode Toggle ── */}
      <div className="absolute top-24 right-8 z-50 flex flex-col gap-3">
        <button 
          onClick={() => setIsZenMode(!isZenMode)}
          className="p-4 rounded-2xl bg-white/5 hover:bg-white/10 backdrop-blur-xl border border-white/10 transition-all group shadow-2xl"
        >
          {isZenMode ? <Eye className="w-6 h-6 text-sky-400" /> : <EyeOff className="w-6 h-6 text-white/60" />}
        </button>
      </div>

      {/* ── Foreground Content ── */}
      <AnimatePresence>
        {!isZenMode && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="relative z-10 flex h-full flex-col justify-end pb-20 px-10 pointer-events-none"
          >
            <motion.div
              className="w-full max-w-4xl pointer-events-auto"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              key={`content-${planet.slug}`}
            >
              <motion.h1
                variants={itemVariants}
                className="mb-2 text-8xl font-black leading-[0.85] tracking-tighter sm:text-9xl lg:text-[12rem] drop-shadow-[0_0_50px_rgba(56,189,248,0.2)]"
              >
                {planet.name}
              </motion.h1>

              <motion.p variants={itemVariants} className="text-sky-300/60 text-2xl font-medium tracking-tight mt-4">
                {planet.tagline}
              </motion.p>

              <motion.div variants={itemVariants} className="flex gap-8 items-center mt-10">
                <button
                  onClick={() => window.location.href = `/planet.php?planet=${planet.slug}`}
                  style={{ backgroundColor: planetColor }}
                  className="px-10 py-6 rounded-[2rem] text-lg font-black text-black shadow-2xl hover:scale-105 transition-transform flex items-center gap-4"
                >
                  <Rocket className="h-6 w-6" />
                  Initiate Descent
                  <ArrowRight className="h-6 w-6" />
                </button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Overlays ── */}
      <AnimatePresence>
        {isCompareOpen && (
          <CompareOverlay 
            currentPlanet={planet} 
            onSelectPlanet={(p) => {
              const idx = PLANETS.findIndex(pl => pl.slug === p.slug);
              setCurrentPlanetIndex(idx);
              setIsCompareOpen(false);
            }}
            onClose={() => {
              setIsCompareOpen(false);
            }}
          />
        )}
      </AnimatePresence>

      {/* ── Navigation Controls ── */}
      <div className={`absolute bottom-10 right-10 z-20 flex gap-4 transition-transform duration-700 ${isZenMode ? 'translate-y-32' : 'translate-y-0'}`}>
          <button onClick={handlePrev} className="p-6 rounded-[2rem] bg-white/5 border border-white/10 hover:bg-sky-500 transition-all text-white shadow-2xl">
              <ChevronLeft className="w-8 h-8" />
          </button>
          <button onClick={handleNext} className="p-6 rounded-[2rem] bg-white/5 border border-white/10 hover:bg-sky-500 transition-all text-white shadow-2xl">
              <ChevronRight className="w-8 h-8" />
          </button>
      </div>

      {/* ── Bottom Progress Bar ── */}
      <div className="absolute bottom-0 left-0 w-full h-1.5 bg-white/5 z-30">
        <motion.div 
          className="h-full"
          initial={{ width: 0 }}
          animate={{ width: `${((currentPlanetIndex + 1) / PLANETS.length) * 100}%`, backgroundColor: planetColor }}
          transition={{ duration: 1, ease: "circOut" }}
        />
      </div>
    </section>
  );
}
