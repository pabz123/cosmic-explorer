"use client";

import { Component, type ReactNode, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Rocket, Orbit, ChevronRight, Activity, Zap, X, Globe, History, Radio, Eye, EyeOff, Stars } from "lucide-react";
import { PlanetScene } from "@/components/PlanetScene";
import CompareOverlay from "@/components/CompareOverlay";
import QuizOverlay from "@/components/QuizOverlay";
import APODOverlay from "@/components/APODOverlay";
import Navbar from "@/components/Navbar";
import { PLANETS } from "@/data/planets";


class SceneErrorBoundary extends Component<{ children: ReactNode; fallback: ReactNode }, { hasError: boolean }> {
  constructor(props: { children: ReactNode; fallback: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  override render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}

export default function CosmicHero() {
  const [currentPlanetIndex, setCurrentPlanetIndex] = useState(2);
  const [isZenMode, setIsZenMode] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isApodOpen, setIsApodOpen] = useState(false);

  const planet = PLANETS[currentPlanetIndex];

  const handleNext = () => {
    setCurrentPlanetIndex((prev) => (prev + 1) % PLANETS.length);
    setIsSidebarOpen(false);
  };

  return (
    <section className="relative min-h-screen bg-[#000103] text-white font-sans overflow-x-hidden">
      <Navbar
        isZenMode={isZenMode}
        onQuizClick={() => setIsQuizOpen(true)}
        onCompareClick={() => setIsCompareOpen(true)}
        onAPODClick={() => setIsApodOpen(true)}
      />

      <div className="relative h-screen overflow-hidden">
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={planet.slug}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2 }}
              className="absolute inset-0"
            >
              <div className={`absolute inset-0 transition-all duration-[2s] ${isSidebarOpen ? "translate-x-[-20%] scale-90" : "translate-x-[12%] scale-100"}`}>
                <SceneErrorBoundary
                  fallback={<div className="w-full h-full bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.2),transparent_55%)]" />}
                >
                  <PlanetScene textureUrl={planet.image} name={planet.name} normalMapUrl={planet.normalMap} roughnessMapUrl={planet.roughnessMap} />
                </SceneErrorBoundary>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_20%_25%,rgba(56,189,248,0.15),transparent_35%),radial-gradient(circle_at_80%_80%,rgba(236,72,153,0.1),transparent_30%)]" />
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-black/85 via-black/20 to-transparent" />

        <AnimatePresence>
          {!isZenMode && !isSidebarOpen && (
            <div className="relative z-10 flex h-full items-center px-8 lg:px-24">
              <motion.div
                initial={{ opacity: 0, x: -60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -60 }}
                className="w-full max-w-2xl"
                key={`main-ui-${planet.slug}`}
              >
                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-sky-300">Orbital Experience</span>
                <h1 className="text-7xl lg:text-[10rem] font-black tracking-tighter leading-[0.85] mt-3 mb-6">{planet.name}</h1>
                <p className="text-sky-100/80 text-xl lg:text-2xl mb-10 max-w-xl">{planet.tagline}</p>

                <div className="flex gap-4">
                  <button onClick={() => setIsSidebarOpen(true)} className="group flex items-center gap-3 px-8 py-4 rounded-2xl bg-white text-black font-bold uppercase tracking-wider hover:scale-[1.02] transition-all">
                    <Rocket className="w-5 h-5" /> Technical Readout
                  </button>
                  <button onClick={handleNext} className="p-4 rounded-2xl bg-white/10 border border-white/20 hover:bg-white/20 transition-all">
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        <div className={`absolute bottom-8 inset-x-0 z-20 flex justify-center transition-all ${isZenMode || isSidebarOpen ? "opacity-0 translate-y-16" : "opacity-100"}`}>
          <div className="flex gap-2 px-6 py-3 rounded-full bg-black/50 backdrop-blur-xl border border-white/10">
            {PLANETS.map((p, idx) => (
              <button key={p.slug} onClick={() => setCurrentPlanetIndex(idx)} className={`h-1.5 rounded-full transition-all ${idx === currentPlanetIndex ? "bg-sky-400 w-8" : "bg-white/30 w-2"}`} />
            ))}
          </div>
        </div>

        <div className="absolute top-24 right-8 z-50">
          <button onClick={() => setIsZenMode(!isZenMode)} className="p-3 rounded-xl bg-black/50 border border-white/10 hover:bg-white/10 transition-all">
            {isZenMode ? <Eye className="w-5 h-5 text-sky-400" /> : <EyeOff className="w-5 h-5 text-white/60" />}
          </button>
        </div>
      </div>

      <section className="relative z-10 px-6 lg:px-20 py-20 border-t border-white/10 bg-black/40">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 text-sky-300 mb-10"><Stars className="w-5 h-5" /><span className="uppercase text-xs tracking-[0.35em]">Mission Control</span></div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "Immersive Orbit", text: "Smooth camera motion and realistic lighting for a cinematic, Google-Earth-style explore mode." },
              { title: "Planet Intelligence", text: "Detailed planet metrics, discovery notes, and mission timeline in a side-command panel." },
              { title: "Space Atmosphere", text: "Nebula overlays, dense starfield, and atmospheric glow to make scenes feel alive." },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl p-6 bg-white/5 border border-white/10">
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-white/70 text-sm leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>



      <section className="relative z-10 px-6 lg:px-20 pb-16 bg-black/40">
        <div className="max-w-6xl mx-auto border border-white/10 rounded-2xl p-6 bg-white/5 text-sm text-white/70">
          <p className="font-bold text-white mb-2">Texture & Data Credits</p>
          <ul className="list-disc pl-5 space-y-1">
            <li><a className="text-sky-300 hover:text-sky-200" href="https://threejs.org/examples/#webgl_shaders_ocean" target="_blank" rel="noreferrer">Three.js example planet textures</a></li>
            <li><a className="text-sky-300 hover:text-sky-200" href="https://www.solarsystemscope.com/textures/" target="_blank" rel="noreferrer">Solar System Scope textures</a></li>
            <li><a className="text-sky-300 hover:text-sky-200" href="https://svs.gsfc.nasa.gov/2915" target="_blank" rel="noreferrer">NASA Blue Marble references</a></li>
          </ul>
        </div>
      </section>

      {isCompareOpen && (
        <CompareOverlay
          currentPlanet={planet}
          onSelectPlanet={(planetSelection) => {
            const selectedIndex = PLANETS.findIndex((p) => p.slug === planetSelection.slug);
            if (selectedIndex >= 0) setCurrentPlanetIndex(selectedIndex);
            setIsCompareOpen(false);
          }}
          onClose={() => setIsCompareOpen(false)}
        />
      )}

      {isQuizOpen && <QuizOverlay onClose={() => setIsQuizOpen(false)} />}
      {isApodOpen && <APODOverlay onClose={() => setIsApodOpen(false)} />}

      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 24, stiffness: 180 }} className="fixed top-0 right-0 w-full max-w-xl h-full z-[60] bg-[#02030a]/95 backdrop-blur-2xl border-l border-white/10 p-8 lg:p-12 overflow-y-auto">
            <button onClick={() => setIsSidebarOpen(false)} className="absolute top-8 right-8 p-3 rounded-xl bg-white/10 hover:bg-white/20">
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-5xl font-black mb-3">{planet.name}</h2>
            <p className="text-white/60 mb-10">{planet.tagline}</p>

            <div className="grid grid-cols-2 gap-4 mb-12">
              {[
                { label: "Gravity", value: `${planet.gravity} G`, icon: <Activity /> },
                { label: "Orbit", value: `${planet.orbitalPeriod} D`, icon: <Orbit /> },
                { label: "Diameter", value: `${planet.diameter} KM`, icon: <Globe /> },
                { label: "Moons", value: planet.moons, icon: <Rocket /> },
              ].map((stat) => (
                <div key={stat.label} className="p-5 rounded-xl bg-white/5 border border-white/10">
                  <div className="flex items-center gap-2 text-white/40 mb-2 text-xs uppercase">{stat.icon}{stat.label}</div>
                  <div className="text-2xl font-black">{stat.value}</div>
                </div>
              ))}
            </div>

            <div className="space-y-8 text-sm">
              <div><h3 className="mb-2 font-bold flex items-center gap-2"><History className="w-4 h-4 text-sky-300" /> Historical Data</h3><p className="text-white/70">{planet.discovery}</p></div>
              <div><h3 className="mb-2 font-bold flex items-center gap-2"><Zap className="w-4 h-4 text-sky-300" /> Geology</h3><p className="text-white/70">{planet.geology}</p></div>
              <div><h3 className="mb-3 font-bold flex items-center gap-2"><Radio className="w-4 h-4 text-sky-300" /> Missions</h3><div className="flex flex-wrap gap-2">{planet.missions.map((m) => <span key={m} className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs">{m}</span>)}</div></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
