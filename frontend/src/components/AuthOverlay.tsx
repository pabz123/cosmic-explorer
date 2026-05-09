"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Rocket, Shield, Mail, Lock, User } from "lucide-react";

interface AuthOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: "login" | "register";
}

import { useAuth } from "@/contexts/AuthContext";

export default function AuthOverlay({ isOpen, onClose, initialMode = "login" }: AuthOverlayProps) {
  const { login } = useAuth();
  const [mode, setMode] = useState<"login" | "register">(initialMode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "error" | "success"; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    if (mode === "register") {
      formData.append("username", username);
    }

    try {
      const endpoint = mode === "login" ? "/api/login.php" : "/api/register.php";
      const response = await fetch(endpoint, {
        method: "POST",
        body: formData,
      });
      const data = await response.json();

      if (data.success) {
        setMessage({ type: "success", text: data.message });
        login(data.user);
        setTimeout(() => {
          onClose();
        }, 1500);
      } else {
        setMessage({ type: "error", text: data.message });
      }
    } catch (err) {
      setMessage({ type: "error", text: "Communication failure with HQ." });
    } finally {
      setLoading(false);
    }
  };

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
            className="relative w-full max-w-xl bg-[#050a1a] rounded-[2.5rem] border border-white/10 shadow-2xl overflow-hidden"
          >
            {/* Background Glow */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-sky-500 to-blue-600" />
            
            <div className="p-8 sm:p-12">
              <div className="flex items-center justify-between mb-12">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-sky-500/20 flex items-center justify-center">
                    <Rocket className="w-6 h-6 text-sky-400" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-black text-white tracking-tight">
                      {mode === "login" ? "Welcome Back" : "Join Mission"}
                    </h2>
                    <p className="text-white/40 text-sm font-medium">Authentication Protocol Active</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all border border-white/10"
                >
                  <X className="w-6 h-6 text-white/50" />
                </button>
              </div>

              {message && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 rounded-2xl mb-8 text-sm font-bold border ${
                    message.type === "success" ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" : "bg-red-500/10 border-red-500/20 text-red-400"
                  }`}
                >
                  {message.text}
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {mode === "register" && (
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-sky-400 transition-colors" />
                    <input
                      type="text"
                      required
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Astronaut Name"
                      className="w-full pl-12 pr-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-white/20 focus:outline-none focus:border-sky-500/50 transition-all"
                    />
                  </div>
                )}
                
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-sky-400 transition-colors" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Mission Email"
                    className="w-full pl-12 pr-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-white/20 focus:outline-none focus:border-sky-500/50 transition-all"
                  />
                </div>

                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-sky-400 transition-colors" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Encryption Key (Password)"
                    className="w-full pl-12 pr-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-white/20 focus:outline-none focus:border-sky-500/50 transition-all"
                  />
                </div>

                <button 
                  disabled={loading}
                  className="w-full py-5 rounded-2xl bg-white text-black font-black uppercase tracking-widest transition-all hover:bg-sky-400 hover:text-white active:scale-95 shadow-xl disabled:opacity-50"
                >
                  {loading ? "Processing..." : (mode === "login" ? "Initiate Login" : "Launch Enrollment")}
                </button>
              </form>

              <div className="mt-8 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
                <button
                  onClick={() => setMode(mode === "login" ? "register" : "login")}
                  className="text-white/40 hover:text-white text-sm font-bold transition-colors"
                >
                  {mode === "login" ? "New here? Create an account" : "Already registered? Login here"}
                </button>
                <div className="flex items-center gap-2 text-[10px] font-black text-white/20 uppercase tracking-widest">
                  <Shield className="w-3 h-3" />
                  Secured by Galactic Guard
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
