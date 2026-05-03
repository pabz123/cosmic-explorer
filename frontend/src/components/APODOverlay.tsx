"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, Calendar, Info, X, ExternalLink, Play } from "lucide-react";

interface APODData {
  title: string;
  date: string;
  explanation: string;
  url: string;
  hdurl?: string;
  media_type: string;
}

interface APODOverlayProps {
  onClose: () => void;
}

export default function APODOverlay({ onClose }: APODOverlayProps) {
  const [data, setData] = useState<APODData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchAPOD() {
      try {
        const response = await fetch('https://api.nasa.gov/planetary/apod?api_key=lIJVHXWftKSzoemGnp5cUDotWv5HInfX0JGOEz1U');
        if (!response.ok) throw new Error('Failed to fetch APOD');
        const json = await response.json();
        setData(json);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchAPOD();
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-md">
      <motion.div 
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        className="relative w-full max-w-5xl bg-[#020617] border border-white/10 rounded-[2.5rem] overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.5)] flex flex-col lg:flex-row max-h-[90vh]"
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-50 p-3 rounded-full bg-black/50 hover:bg-white/10 backdrop-blur-xl border border-white/10 text-white transition-all active:scale-90"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Side: Image/Video */}
        <div className="relative w-full lg:w-3/5 bg-black flex items-center justify-center min-h-[300px] lg:min-h-0 overflow-hidden">
          {loading ? (
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 rounded-full border-2 border-sky-500/20 border-t-sky-500 animate-spin" />
              <span className="text-xs font-bold tracking-widest text-sky-400 uppercase">Scanning Cosmos...</span>
            </div>
          ) : error || !data ? (
            <div className="text-center p-8">
              <Info className="w-12 h-12 text-red-400 mx-auto mb-4" />
              <p className="text-white/60 font-medium">Unable to connect to NASA Deep Space Network.</p>
            </div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="w-full h-full"
              >
                {data.media_type === 'image' ? (
                  <img 
                    src={data.hdurl || data.url} 
                    alt={data.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <iframe 
                    src={data.url}
                    title={data.title}
                    className="w-full h-full border-0"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                  />
                )}
                <div className="absolute bottom-6 left-6 flex gap-2">
                  <span className="px-3 py-1.5 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-black uppercase tracking-widest text-white/80 flex items-center gap-2">
                    {data.media_type === 'image' ? <Camera className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                    NASA {data.media_type}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          )}
        </div>

        {/* Right Side: Content */}
        <div className="w-full lg:w-2/5 p-8 lg:p-12 overflow-y-auto custom-scrollbar flex flex-col">
          {!loading && data && (
            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <Calendar className="w-4 h-4 text-sky-400" />
                <span className="text-xs font-bold tracking-widest text-white/40 uppercase">
                  {new Date(data.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </span>
              </div>

              <h2 className="text-3xl font-black mb-6 tracking-tighter leading-tight">{data.title}</h2>
              
              <div className="space-y-6">
                <p className="text-gray-400 leading-relaxed text-sm font-medium">
                  {data.explanation}
                </p>
                
                <div className="pt-6 border-t border-white/5 flex gap-4">
                  <a 
                    href={data.hdurl || data.url} 
                    target="_blank" 
                    rel="noreferrer"
                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-sky-500 text-white text-xs font-black uppercase tracking-widest hover:bg-sky-400 transition-all shadow-lg"
                  >
                    View Original
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
