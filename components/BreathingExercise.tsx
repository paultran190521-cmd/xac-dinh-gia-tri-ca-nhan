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
    <div className="fixed inset-0 z-20 pointer-events-auto flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm sm:bg-transparent sm:backdrop-blur-none">
      <div className="absolute top-[15%] sm:top-[20%] w-full px-6 flex flex-col items-center">
        <h2 className="text-4xl font-sans font-bold uppercase tracking-widest text-[#DF9317] mb-6 text-center drop-shadow-md">
          Dừng lại một chút
        </h2>
        <p className="text-white/90 text-center max-w-md font-sans text-lg leading-relaxed text-shadow">
          Hãy để tâm trí bạn tĩnh lặng. Dành phút giây này để quay về với nhịp thở của chính mình.
        </p>
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-56 h-56">
        <motion.div
          animate={{ scale: circleScale }}
          transition={{ duration: phase === 'exhale' ? 6 : 4, ease: "easeInOut" }}
          className="absolute w-40 h-40 rounded-full bg-[#1992B0]/10 border border-[#DF9317] shadow-[0_0_30px_rgba(223,147,23,0.3)]"
        />
        <motion.div
          animate={{ scale: circleScale * 0.8 }}
          transition={{ duration: phase === 'exhale' ? 6 : 4, ease: "easeInOut" }}
          className="absolute w-40 h-40 rounded-full bg-[#1992B0]/30 blur-2xl"
        />
        <div className="z-10 text-[#DF9317] font-bold text-lg uppercase tracking-widest font-sans drop-shadow-[0_0_10px_rgba(223,147,23,1)] text-center whitespace-nowrap">
          {instruction}
        </div>
      </div>

      <div className="absolute bottom-[15%] sm:bottom-[20%] flex flex-col items-center gap-6 w-full">
        <div className="text-[#1992B0] font-bold text-sm tracking-widest uppercase bg-[#1992B0]/10 px-6 py-2 rounded-full border border-[#1992B0]/30 shadow-[0_0_15px_rgba(25,146,176,0.2)] backdrop-blur-md">
          Còn lại {timeLeft} giây
        </div>
        <button
          onClick={onComplete}
          className="text-xs uppercase tracking-widest text-white/50 hover:text-white transition-all hover:scale-105"
        >
          Bỏ qua
        </button>
      </div>
    </div>
  );
}
