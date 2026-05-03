"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BrainCircuit, Trophy, RotateCcw, ChevronRight, CheckCircle2, XCircle, X } from "lucide-react";
import { QUIZ_QUESTIONS } from "@/data/quizData";

interface QuizOverlayProps {
  onClose: () => void;
}

export default function QuizOverlay({ onClose }: QuizOverlayProps) {
  const [currentStep, setCurrentStep] = useState<'start' | 'quiz' | 'result'>('start');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const currentQuestion = QUIZ_QUESTIONS[currentQuestionIndex];

  const handleOptionSelect = (index: number) => {
    if (showFeedback) return;
    setSelectedOption(index);
    setShowFeedback(true);
    
    if (index === currentQuestion.correct) {
      setScore(prev => prev + 1);
    }

    setTimeout(() => {
      if (currentQuestionIndex < QUIZ_QUESTIONS.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
        setSelectedOption(null);
        setShowFeedback(false);
      } else {
        setCurrentStep('result');
      }
    }, 1500);
  };

  const resetQuiz = () => {
    setCurrentStep('start');
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedOption(null);
    setShowFeedback(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-md">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative w-full max-w-2xl bg-[#020617] border border-white/10 rounded-[2.5rem] overflow-hidden shadow-[0_0_100px_rgba(56,189,248,0.15)] p-8 lg:p-12"
      >
        <button 
          onClick={onClose}
          className="absolute top-8 right-8 p-3 rounded-full bg-white/5 hover:bg-white/10 text-white/40 hover:text-white transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {currentStep === 'start' && (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-sky-500/10 rounded-3xl flex items-center justify-center mx-auto mb-8 border border-sky-500/20">
              <BrainCircuit className="w-10 h-10 text-sky-400" />
            </div>
            <h2 className="text-4xl font-black text-white mb-4 tracking-tighter">Cosmic Challenge</h2>
            <p className="text-white/40 font-medium mb-10 max-w-sm mx-auto">Test your knowledge of the solar system and earn your title as a Galactic Scholar.</p>
            <button 
              onClick={() => setCurrentStep('quiz')}
              className="px-10 py-5 bg-sky-500 hover:bg-sky-400 text-white rounded-2xl font-black uppercase tracking-widest transition-all hover:scale-105 active:scale-95 shadow-[0_20px_40px_rgba(14,165,233,0.3)]"
            >
              Begin Mission
            </button>
          </div>
        )}

        {currentStep === 'quiz' && (
          <div>
            <div className="flex justify-between items-center mb-12">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-sky-400">Question {currentQuestionIndex + 1} of {QUIZ_QUESTIONS.length}</span>
              <div className="flex gap-1">
                {QUIZ_QUESTIONS.map((_, idx) => (
                  <div key={idx} className={`h-1 w-6 rounded-full transition-all duration-500 ${idx <= currentQuestionIndex ? 'bg-sky-500' : 'bg-white/10'}`} />
                ))}
              </div>
            </div>

            <h3 className="text-3xl font-bold text-white mb-10 leading-tight tracking-tight">{currentQuestion.question}</h3>

            <div className="grid gap-4">
              {currentQuestion.options.map((option, idx) => {
                const isSelected = selectedOption === idx;
                const isCorrect = idx === currentQuestion.correct;
                
                let borderColor = "border-white/10";
                let bgColor = "bg-white/5";
                let textColor = "text-white/60";

                if (showFeedback) {
                  if (isCorrect) {
                    borderColor = "border-emerald-500/50";
                    bgColor = "bg-emerald-500/10";
                    textColor = "text-emerald-400";
                  } else if (isSelected) {
                    borderColor = "border-red-500/50";
                    bgColor = "bg-red-500/10";
                    textColor = "text-red-400";
                  } else {
                    bgColor = "bg-white/5 opacity-40";
                  }
                } else if (isSelected) {
                  borderColor = "border-sky-500/50";
                  bgColor = "bg-sky-500/10";
                  textColor = "text-sky-400";
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleOptionSelect(idx)}
                    disabled={showFeedback}
                    className={`relative w-full p-6 rounded-2xl border ${borderColor} ${bgColor} text-left transition-all group overflow-hidden`}
                  >
                    <div className="flex justify-between items-center relative z-10">
                      <span className={`font-bold transition-colors ${textColor}`}>{option}</span>
                      {showFeedback && isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-500" />}
                      {showFeedback && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-red-500" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {currentStep === 'result' && (
          <div className="text-center py-8">
            <div className="w-24 h-24 bg-yellow-500/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-yellow-500/20">
              <Trophy className="w-12 h-12 text-yellow-500" />
            </div>
            <h2 className="text-4xl font-black text-white mb-2 tracking-tighter">Mission Complete</h2>
            <div className="text-7xl font-black text-sky-400 mb-6 drop-shadow-[0_0_30px_rgba(56,189,248,0.3)]">
              {Math.round((score / QUIZ_QUESTIONS.length) * 100)}%
            </div>
            <p className="text-white/40 font-medium mb-10">You answered {score} out of {QUIZ_QUESTIONS.length} questions correctly.</p>
            <div className="flex gap-4 justify-center">
              <button 
                onClick={resetQuiz}
                className="flex items-center gap-3 px-8 py-4 bg-white/5 hover:bg-white/10 text-white rounded-xl font-bold transition-all border border-white/10"
              >
                <RotateCcw className="w-4 h-4" />
                Retry
              </button>
              <button 
                onClick={onClose}
                className="px-8 py-4 bg-sky-500 hover:bg-sky-400 text-white rounded-xl font-bold transition-all shadow-lg"
              >
                Finish
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
