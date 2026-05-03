"use client";

import { motion } from "framer-motion";
import { Sparkles, BarChart3, BrainCircuit, MessageSquare, User, LogIn, Menu, Camera } from "lucide-react";

interface NavbarProps {
  isZenMode?: boolean;
  onQuizClick?: () => void;
  onCompareClick?: () => void;
  onAPODClick?: () => void;
}

export default function Navbar({ isZenMode, onQuizClick, onCompareClick, onAPODClick }: NavbarProps) {
  const navItems = [
    { name: "Home", href: "/index.php", icon: <Sparkles className="w-4 h-4" /> },
    { name: "Planets", href: "/planets.php", icon: <Sparkles className="w-4 h-4" /> },
    { name: "Compare", href: "/compare.php", icon: <BarChart3 className="w-4 h-4" /> },
    { name: "Quiz", href: "/quiz.php", icon: <BrainCircuit className="w-4 h-4" /> },
    { name: "NASA APOD", href: "#", icon: <Camera className="w-4 h-4" /> },
    { name: "Contact", href: "/contact.php", icon: <MessageSquare className="w-4 h-4" /> },
  ];

  return (
    <motion.header 
      initial={{ y: -100, opacity: 0 }}
      animate={{ 
        y: isZenMode ? -100 : 0, 
        opacity: isZenMode ? 0 : 1 
      }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 w-full z-50 px-6 py-6 pointer-events-none group/nav"
    >
      {/* Invisible hover area to reveal nav in Zen mode if user moves mouse to top */}
      <div className="absolute inset-x-0 top-0 h-24 pointer-events-auto z-[-1]" />

      <nav className="max-w-7xl mx-auto flex items-center justify-between pointer-events-auto">
        {/* Logo */}
        <a href="/index.php" className="flex items-center gap-3 group transition-transform hover:scale-105">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center shadow-[0_0_20px_rgba(56,189,248,0.4)]">
            <span className="text-xl">🪐</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-black tracking-tighter text-white uppercase italic leading-none">Cosmic <span className="text-sky-400">Pro</span></span>
            <span className="text-[8px] font-bold tracking-[0.3em] text-white/40 uppercase">Explorer Mission</span>
          </div>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1 px-2 py-1.5 rounded-2xl bg-black/40 backdrop-blur-3xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
          {navItems.map((item) => {
            const isQuiz = item.name === "Quiz";
            const isCompare = item.name === "Compare";
            const isAPOD = item.name === "NASA APOD";
            
            return (
              <button
                key={item.name}
                onClick={(e) => {
                  if (isQuiz && onQuizClick) {
                    e.preventDefault();
                    onQuizClick();
                  } else if (isCompare && onCompareClick) {
                    e.preventDefault();
                    onCompareClick();
                  } else if (isAPOD && onAPODClick) {
                    e.preventDefault();
                    onAPODClick();
                  } else {
                    window.location.href = item.href;
                  }
                }}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold text-white/60 hover:text-white hover:bg-white/10 transition-all active:scale-95"
              >
                {item.name}
              </button>
            );
          })}
        </div>

        {/* Auth Actions */}
        <div className="flex items-center gap-3">
          <a 
            href="/login.php"
            className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white/80 hover:text-white hover:bg-white/5 transition-all border border-white/5"
          >
            <User className="w-4 h-4 text-sky-400" />
            Login
          </a>
          <a 
            href="/register.php"
            className="group relative overflow-hidden flex items-center gap-2 px-6 py-2.5 rounded-xl bg-white text-sm font-black text-black transition-all hover:scale-105 active:scale-95 shadow-[0_10px_20px_rgba(255,255,255,0.1)]"
          >
            <LogIn className="w-4 h-4" />
            Join Mission
          </a>
        </div>
      </nav>
    </motion.header>
  );
}

