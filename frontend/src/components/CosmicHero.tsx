"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Rocket, Orbit, Sparkles, Globe, ArrowRight, ChevronRight, ChevronLeft, Info } from "lucide-react";
import { PlanetScene } from "@/components/PlanetScene";
import { PLANETS } from "@/data/planets";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const glowPulse = {
  animate: {
    boxShadow: [
      "0 0 20px rgba(56,189,248,0.3)",
      "0 0 40px rgba(56,189,248,0.6)",
      "0 0 20px rgba(56,189,248,0.3)",
    ],
    transition: { duration: 3, repeat: Infinity, ease: "easeInOut" },
  },
};

export default function CosmicHero() {
  const [currentPlanetIndex, setCurrentPlanetIndex] = useState(2); // Start at Earth
  const planet = PLANETS[currentPlanetIndex];

  const handleNext = () => {
    setCurrentPlanetIndex((prev) => (prev + 1) % PLANETS.length);
  };

  const handlePrev = () => {
    setCurrentPlanetIndex((prev) => (prev - 1 + PLANETS.length) % PLANETS.length);
  };

  const infoPoint = {
    position: [1.5, 1.2, 1.6] as [number, number, number],
    title: `${planet.name} Fact`,
    description: planet.funFacts[0] || "A fascinating world in our solar system.",
  };

  return (
    <section className="relative w-full h-screen overflow-hidden bg-black text-white font-sans">
      {/* ── 3D Scene Background ── */}
      <AnimatePresence mode="wait">
        <motion.div 
          key={planet.slug}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 z-0"
        >
          <PlanetScene textureUrl={planet.image || "/images/earth.png"} infoPoint={infoPoint} />
        </motion.div>
      </AnimatePresence>

      {/* ── Gradient Overlays for better text readability ── */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent z-0 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-0 pointer-events-none" />

      {/* ── Foreground Content ── */}
      <div className="relative z-10 flex h-full flex-col justify-center px-6 sm:px-10 lg:px-20 pointer-events-none">
        
        {/* Left Column Text Overlay */}
        <motion.div
          className="w-full max-w-2xl pointer-events-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          key={`content-${planet.slug}`}
        >
          {/* Badge */}
          <motion.div variants={itemVariants} className="mb-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-500/10 px-4 py-1.5 text-sm font-medium text-sky-300 backdrop-blur-md">
              <Sparkles className="h-4 w-4" />
              {planet.tagline}
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={itemVariants}
            className="mb-4 text-6xl font-bold leading-tight tracking-tighter sm:text-7xl lg:text-8xl"
          >
            {planet.name}
          </motion.h1>

          <motion.div variants={itemVariants} className="mb-8">
            <span className="bg-gradient-to-r from-sky-400 via-cyan-300 to-teal-300 bg-clip-text text-transparent text-2xl sm:text-3xl font-light tracking-wide">
              {planet.type}
            </span>
          </motion.div>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="mb-10 text-lg leading-relaxed text-gray-300/90 max-w-xl backdrop-blur-sm bg-black/30 p-6 rounded-2xl border border-white/5 shadow-2xl"
          >
            {planet.description}
          </motion.p>

          {/* Action Buttons & Stats */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
            <motion.button
              onClick={() => window.location.href = `/planets.php?planet=${planet.slug}`}
              className="group relative inline-flex items-center gap-3 rounded-full bg-sky-600 px-8 py-4 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:bg-sky-500 hover:shadow-sky-500/40 active:scale-[0.98]"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              {...glowPulse}
            >
              <Rocket className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-1 group-hover:rotate-12" />
              Explore Details
              <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1.5" />
            </motion.button>

            <div className="flex gap-4">
              <div className="flex flex-col justify-center px-4 py-2 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md">
                <span className="text-2xl font-bold text-white flex items-center gap-2">
                  <Orbit className="h-5 w-5 text-sky-400" />
                  {planet.moons}
                </span>
                <span className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Moons</span>
              </div>
              <div className="flex flex-col justify-center px-4 py-2 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md">
                <span className="text-2xl font-bold text-white flex items-center gap-2">
                  <Info className="h-5 w-5 text-sky-400" />
                  {planet.gravity}
                </span>
                <span className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Gravity (m/s²)</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* ── Navigation Controls ── */}
      <div className="absolute bottom-10 right-10 z-20 flex gap-4 pointer-events-auto">
          <button 
            onClick={handlePrev} 
            className="p-4 rounded-full bg-black/50 hover:bg-sky-900/60 backdrop-blur-xl border border-white/20 transition-all text-white shadow-2xl hover:scale-110 active:scale-95 group"
            aria-label="Previous Planet"
          >
              <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
          </button>
          <button 
            onClick={handleNext} 
            className="p-4 rounded-full bg-black/50 hover:bg-sky-900/60 backdrop-blur-xl border border-white/20 transition-all text-white shadow-2xl hover:scale-110 active:scale-95 group"
            aria-label="Next Planet"
          >
              <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </button>
      </div>
    </section>
  );
}
