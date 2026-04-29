'use client';

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';

export default function BreathingExercise({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [timeLeft, setTimeLeft] = useState(60);

  useEffect(() => {
    if (timeLeft <= 0) {
      onComplete();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onComplete]);

  useEffect(() => {
    // Scroll to top and disable scrolling globally during breathing exercise
    window.scrollTo(0, 0);
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    
    if (phase === 'inhale') {
      timeout = setTimeout(() => setPhase('hold'), 4000); // Inhale for 4s
    } else if (phase === 'hold') {
      timeout = setTimeout(() => setPhase('exhale'), 4000); // Hold for 4s
    } else if (phase === 'exhale') {
      timeout = setTimeout(() => setPhase('inhale'), 6000); // Exhale for 6s
    }

    return () => clearTimeout(timeout);
  }, [phase]);

  const circleScale = phase === 'inhale' ? 1.5 : phase === 'hold' ? 1.5 : 1;
  const instruction = phase === 'inhale' ? 'Hít vào thật sâu...' : phase === 'hold' ? 'Giữ hơi thở...' : 'Từ từ thở ra...';

  return (
    <div className="flex flex-col items-center justify-between h-[100dvh] w-full py-8 sm:py-12 text-center pointer-events-none relative">
      {/* Title section - at top */}
      <div className="w-full max-w-2xl mx-auto space-y-4 pt-16 sm:pt-24 px-4 pointer-events-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-sans font-bold uppercase tracking-[0.2em] sm:tracking-[0.3em] text-[#DF9317] drop-shadow-md whitespace-nowrap">
          DỪNG LẠI MỘT CHÚT
        </h2>
        <p className="text-white/90 font-sans text-base sm:text-lg leading-relaxed text-shadow max-w-md mx-auto">
          Hãy để tâm trí bạn tĩnh lặng. Dành phút giây này để quay về với nhịp thở của chính mình.
        </p>
      </div>

      {/* Circle - fixed precisely to match mandala */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 w-full h-full">
        <motion.div
          animate={{ scale: circleScale }}
          transition={{ duration: phase === 'exhale' ? 6 : 4, ease: "easeInOut" }}
          className="absolute inset-0 m-auto w-48 h-48 rounded-full bg-[#1992B0]/10 border border-[#DF9317] shadow-[0_0_30px_rgba(223,147,23,0.3)] origin-center"
        />
        <motion.div
          animate={{ scale: circleScale * 0.8 }}
          transition={{ duration: phase === 'exhale' ? 6 : 4, ease: "easeInOut" }}
          className="absolute inset-0 m-auto w-48 h-48 rounded-full bg-[#1992B0]/30 blur-2xl origin-center"
        />
        <div className="z-10 relative text-[#DF9317] font-bold text-sm sm:text-lg uppercase tracking-widest font-sans drop-shadow-[0_0_15px_rgba(223,147,23,1)] text-center whitespace-nowrap px-4">
          {instruction}
        </div>
      </div>

      {/* Time and Skip button - at bottom */}
      <div className="flex flex-col items-center gap-6 z-30 pointer-events-auto pb-10">
        <div className="text-[#1992B0] font-bold text-sm tracking-widest uppercase bg-[#1992B0]/10 px-6 py-2 rounded-full border border-[#1992B0]/30 shadow-[0_0_15px_rgba(25,146,176,0.2)] backdrop-blur-md">
          Còn lại {timeLeft} giây
        </div>
        <button
          onClick={onComplete}
          className="text-xs uppercase tracking-widest text-white/50 hover:text-[#DF9317] transition-all hover:scale-105 px-6 py-4"
        >
          Bỏ qua
        </button>
      </div>
    </div>
  );
}
