"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface NavbarProps {
  isZenMode?: boolean;
  onQuizClick?: () => void;
  onCompareClick?: () => void;
  onAPODClick?: () => void;
}

const LEGACY_BASE_URL = import.meta.env.VITE_LEGACY_BASE_URL?.trim() ?? "";

const toLegacyUrl = (path: string) => (LEGACY_BASE_URL ? `${LEGACY_BASE_URL}${path}` : path);

export default function Navbar({ isZenMode, onQuizClick, onCompareClick, onAPODClick }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navItems = [
    { name: "Home", href: toLegacyUrl("/index.php") },
    { name: "Planets", href: toLegacyUrl("/planets.php") },
    { name: "Compare", href: "#", isAction: true, onClick: onCompareClick },
    { name: "Quiz", href: "#", isAction: true, onClick: onQuizClick },
    { name: "NASA APOD", href: "#", isAction: true, onClick: onAPODClick },
    { name: "Contact", href: toLegacyUrl("/contact.php") },
  ];

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{
        y: isZenMode ? -100 : 0,
        opacity: isZenMode ? 0 : 1,
      }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 w-full z-50 px-8 py-8 pointer-events-none"
    >
      <nav className="max-w-[1600px] mx-auto flex items-center justify-between pointer-events-auto">
        <a href={toLegacyUrl("/index.php")} className="flex items-center gap-4 group transition-transform hover:scale-105">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center shadow-2xl text-2xl">🪐</div>
          <div className="flex flex-col">
            <span className="text-2xl font-black tracking-tighter text-white uppercase italic leading-none">Cosmic <span className="text-sky-400">Pro</span></span>
            <span className="text-[10px] font-bold tracking-[0.4em] text-white/40 uppercase">Explorer Mission</span>
          </div>
        </a>

        <div className="hidden lg:flex items-center gap-2 px-3 py-2 rounded-2xl bg-white/5 backdrop-blur-3xl border border-white/10 shadow-2xl">
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={(e) => {
                if (item.isAction && item.onClick) {
                  e.preventDefault();
                  item.onClick();
                } else {
                  window.location.href = item.href;
                }
              }}
              className="px-6 py-2.5 rounded-xl text-sm font-bold text-white/60 hover:text-white hover:bg-white/10 transition-all active:scale-95"
            >
              {item.name}
            </button>
          ))}
        </div>

        <button
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          className="lg:hidden px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white"
        >
          Menu
        </button>

        <div className="flex items-center gap-4">
          <a href={toLegacyUrl("/login.php")} className="hidden sm:flex px-6 py-3 rounded-xl text-sm font-bold text-white/80 hover:text-white hover:bg-white/5 transition-all border border-white/5">
            Login
          </a>
          <a href={toLegacyUrl("/register.php")} className="px-8 py-3 rounded-xl bg-white text-sm font-black text-black transition-all hover:scale-105 active:scale-95 shadow-2xl">
            Join Mission
          </a>
        </div>
      </nav>
      {isMobileMenuOpen && (
        <div className="lg:hidden mt-4 mx-auto max-w-[1600px] rounded-2xl bg-black/80 border border-white/10 p-3 backdrop-blur-xl pointer-events-auto">
          <div className="grid grid-cols-2 gap-2">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={(e) => {
                  setIsMobileMenuOpen(false);
                  if (item.isAction && item.onClick) {
                    e.preventDefault();
                    item.onClick();
                  } else {
                    window.location.href = item.href;
                  }
                }}
                className="px-3 py-2 rounded-lg text-xs font-bold text-white/70 hover:text-white hover:bg-white/10 transition-all"
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </motion.header>
  );
}
