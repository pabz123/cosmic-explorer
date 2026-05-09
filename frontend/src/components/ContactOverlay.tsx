"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Mail } from "lucide-react";

interface ContactOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactOverlay({ isOpen, onClose }: ContactOverlayProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-2xl"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative w-full max-w-2xl bg-[#050a1a] rounded-[2.5rem] border border-white/10 shadow-2xl p-12 text-center"
          >
            <button
              onClick={onClose}
              className="absolute top-8 right-8 p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-all border border-white/10"
            >
              <X className="w-6 h-6 text-white/50" />
            </button>

            <div className="w-20 h-20 rounded-3xl bg-sky-500/20 flex items-center justify-center mx-auto mb-8">
              <Mail className="w-10 h-10 text-sky-400" />
            </div>

            <h2 className="text-4xl font-black text-white mb-4 tracking-tight">Connect with HQ</h2>
            <p className="text-white/60 text-lg mb-12 max-w-md mx-auto leading-relaxed">
              Have questions about your mission? Our team of astronomical experts is ready to assist you.
            </p>

            <div className="grid grid-cols-1 gap-4 mb-12">
              <a href="mailto:support@cosmicexplorer.pro" className="flex items-center justify-between p-6 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all group">
                <div className="flex items-center gap-4">
                  <Mail className="w-6 h-6 text-sky-400" />
                  <span className="text-white font-bold">Email Support</span>
                </div>
                <ChevronRight className="w-5 h-5 text-white/20 group-hover:text-white transition-colors" />
              </a>
            </div>

            <div className="flex items-center justify-center gap-6">
              {/* Social icons removed to fix build */}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function ChevronRight(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}
