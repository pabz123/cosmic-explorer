"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface APODOverlayProps {
  onClose: () => void;
}

interface APODData {
  title: string;
  explanation: string;
  url: string;
  hdurl?: string;
  media_type: string;
  date: string;
  copyright?: string;
}

const NASA_API_KEY = "lIJVHXWftKSzoemGnp5cUDotWv5HInfX0JGOEz1U";

export default function APODOverlay({ onClose }: APODOverlayProps) {
  const [data, setData] = useState<APODData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAPOD = async () => {
      try {
        const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}`);
        if (!response.ok) throw new Error('Failed to fetch from NASA');
        const json = await response.json();
        setData(json);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Unknown NASA API error");
      } finally {
        setLoading(false);
      }
    };

    fetchAPOD();
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/90 backdrop-blur-xl overflow-y-auto">
      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative w-full max-w-5xl bg-[#020617] border border-white/10 rounded-[3rem] overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.5)] flex flex-col lg:flex-row min-h-[60vh]"
      >
        <button 
          onClick={onClose}
          className="absolute top-8 right-8 z-10 p-3 rounded-full bg-black/40 hover:bg-black/60 text-white/60 hover:text-white transition-all backdrop-blur-md border border-white/10"
        >
          ✕
        </button>

        {loading ? (
          <div className="flex-1 flex flex-col items-center justify-center p-20 text-center">
            <div className="w-16 h-16 border-4 border-sky-500/20 border-t-sky-500 rounded-full animate-spin mb-6" />
            <p className="text-white/40 font-bold uppercase tracking-widest">Scanning Deep Space...</p>
          </div>
        ) : error ? (
          <div className="flex-1 flex flex-col items-center justify-center p-20 text-center">
            <h3 className="text-2xl font-bold text-red-400 mb-4">Signal Lost</h3>
            <p className="text-white/40 mb-8">{error}</p>
            <button onClick={onClose} className="px-8 py-4 bg-white/5 rounded-2xl text-white font-bold border border-white/10">Abort Mission</button>
          </div>
        ) : data && (
          <>
            <div className="lg:w-1/2 relative bg-black flex items-center justify-center p-4">
              {data.media_type === 'video' ? (
                <div className="relative aspect-video w-full rounded-2xl overflow-hidden shadow-2xl">
                  <iframe 
                    src={data.url}
                    className="absolute inset-0 w-full h-full border-0"
                    allowFullScreen
                  />
                </div>
              ) : (
                <img 
                  src={data.url} 
                  alt={data.title} 
                  className="max-h-[70vh] w-full object-contain rounded-2xl shadow-2xl"
                />
              )}
            </div>

            <div className="lg:w-1/2 p-8 lg:p-16 flex flex-col justify-center bg-gradient-to-br from-transparent to-sky-500/5">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-sky-400 mb-4 block">NASA Picture of the Day</span>
              <h2 className="text-4xl font-black text-white mb-6 leading-tight tracking-tighter">{data.title}</h2>
              <div className="h-px w-20 bg-sky-500/30 mb-8" />
              <p className="text-white/60 text-sm leading-relaxed mb-10 max-h-[30vh] overflow-y-auto pr-4 custom-scrollbar">
                {data.explanation}
              </p>
              
              <div className="flex flex-wrap gap-6 items-center">
                <div className="flex flex-col">
                  <span className="text-[10px] text-white/30 uppercase font-black tracking-widest mb-1">Observation Date</span>
                  <span className="text-white font-bold">{data.date}</span>
                </div>
                {data.copyright && (
                  <div className="flex flex-col">
                    <span className="text-[10px] text-white/30 uppercase font-black tracking-widest mb-1">Copyright</span>
                    <span className="text-white font-bold">{data.copyright}</span>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
}
